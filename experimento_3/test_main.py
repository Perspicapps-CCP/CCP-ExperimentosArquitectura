import socketio
import time
import random
from locust import HttpUser, task, constant_throughput, events
import logging

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger('socketio_client')

# Locust Performance Tests
class SocketIOClient:
    def __init__(self):
        self.sio = socketio.Client(
            reconnection=True,
            reconnection_attempts=3,
            reconnection_delay=1,
            logger=logger
        )
        self.connected = False
        self.connection_attempts = 0
        self.max_connection_attempts = 5

        # Add event handlers for debugging
        @self.sio.event
        def connect():
            logger.info("Connected!")
            self.connected = True
            self.connection_attempts = 0
            
        @self.sio.event
        def disconnect():
            logger.info("Disconnected!")
            self.connected = False
            
        @self.sio.event
        def connect_error(data):
            logger.error(f"Connection error: {data}")
            self.connected = False
            self.connection_attempts += 1

    def connect(self, host):
        try:
            if self.connection_attempts >= self.max_connection_attempts:
                logger.error("Exceeded maximum connection attempts. Giving up.")
                return False
                
            if self.connected:
                logger.info("Already connected")
                return True
                
            self.sio.connect(
                host, 
                socketio_path="inventario/socket.io", 
                wait=True,
                transports=['websocket'])
            
            self.connected = True
            logger.info(f"Successfully connected to {host}")
            return True
        except Exception as e:
            logger.error(f"Connection failed: {e}")
            self.connected = False
            self.connection_attempts += 1
            return False

    def disconnect(self):
        if self.connected:
            try:
                self.sio.disconnect()
                logger.info("Disconnected from server")
            except Exception as e:
                logger.error(f"Error disconnecting: {e}")
            finally:
                self.connected = False

    def emit(self, event, data=None):
        if not self.connected:
            logger.warning(f"Cannot emit {event}: not connected")
            return False
            
        try:
            self.sio.emit(event, data)
            return True
        except Exception as e:
            logger.error(f"Error emitting {event}: {e}")
            # Check if we need to reconnect
            if "not a connected namespace" in str(e):
                logger.info("Attempting to reconnect due to namespace error")
                self.connected = False
                return False
            return False


class InventoryUser(HttpUser):
    wait_time = constant_throughput(0.02)   # Increased wait time to reduce connection pressure

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.client = SocketIOClient()
        self.connected = False
        self.connection_attempt_count = 0
        self.event_count = 0

    def on_start(self):
        self.connected = self.client.connect("http://34.111.148.70")
        
        # Retry connection if needed
        if not self.connected and self.connection_attempt_count < 3:
            logger.info("Retrying connection...")
            time.sleep(2)  # Wait before retry
            self.connection_attempt_count += 1
            self.connected = self.client.connect("http://34.111.148.70")

    def on_stop(self):
        self.client.disconnect()

    def _check_connection_before_task(self):
        # Check connection status and reconnect if needed
        if not self.client.connected and self.connection_attempt_count < 5:
            logger.info("Reconnecting before task...")
            time.sleep(1)
            self.connection_attempt_count += 1
            self.connected = self.client.connect("http://34.111.148.70")
        return self.client.connected

    @task(1)  # Reduced frequency
    def subscribe_to_inventory(self):
        if not self._check_connection_before_task():
            return
            
        start_time = time.time()
        try:
            result = self.client.emit("inventory_subscribe")
            if not result:
                return
                
            self.event_count += 1
            total_time = int((time.time() - start_time) * 1000)
            events.request.fire(
                request_type="websocket",
                name="inventory_subscribe",
                response_time=total_time,
                response_length=0,
                exception=None,
            )
            
            # Periodically reset connection to prevent issues
            if self.event_count > 30:
                logger.info("Performing preventative reconnection")
                self.client.disconnect()
                time.sleep(1)
                self.client.connect("http://34.111.148.70")
                self.event_count = 0
                
        except Exception as e:
            logger.error(f"Error subscribe_to_inventory: {e}")
            events.request.fire(
                request_type="websocket",
                name="inventory_subscribe",
                response_time=0,
                response_length=0,
                exception=e,
            )

    @task(1)  # Reduced frequency
    def add_product(self):
        if not self._check_connection_before_task():
            return
            
        start_time = time.time()
        result_received = False
        product_id = "8187dbd5-34e1-4452-8a02-bd050b2a6f8f"
        quantity = random.randint(5, 10)
                
        # Define event handlers to capture response
        def on_inventory_update(data):
            nonlocal result_received
            end_time = time.time()
            total_time = int((end_time - start_time) * 1000)
            
            # Verify if this is the response for our request
            result_received = True
                
            events.request.fire(
                request_type="websocket",
                name="update_product-add",
                response_time=total_time,
                response_length=len(str(data)),
                exception=None
            )
            logger.info(f"Received update response in {total_time}ms")
        
        def on_error(data):
            nonlocal result_received
            end_time = time.time()
            total_time = int((end_time - start_time) * 1000)
            
            result_received = True
            logger.error(f"Received error: {data}")
            events.request.fire(
                request_type="websocket",
                name="update_product-error",
                response_time=total_time,
                response_length=len(str(data)),
                exception=Exception(data)
            )
        
        # Register handlers
        self.client.sio.on('inventory_update', on_inventory_update)
        self.client.sio.on('error', on_error)
        
        try:
            result = self.client.emit(
                "update_product", {"id": product_id, "quantity": quantity}
            )
    
            if not result:
                return
                            
            self.event_count += 1
            
            # Wait for response for up to 2 seconds
            wait_start = time.time()
            while not result_received and (time.time() - wait_start) < 2:
                time.sleep(0.1)
            
            # If no response was received, record a timeout
            if not result_received:
                total_time = int((time.time() - start_time) * 1000)
                events.request.fire(
                    request_type="websocket",
                    name="update_product-timeout",
                    response_time=total_time,
                    response_length=0,
                    exception=Exception("Response timeout")
                )

            # Periodically reset connection to prevent issues
            if self.event_count > 30:
                logger.info("Performing preventative reconnection")
                self.client.disconnect()
                time.sleep(1)
                self.client.connect("http://34.111.148.70")
                self.event_count = 0
                
        except Exception as e:
            logger.error(f"Error add_product: {e}")
            events.request.fire(
                request_type="websocket",
                name="update_product-exception",
                response_time=int((time.time() - start_time) * 1000),
                response_length=0,
                exception=e
            )
        finally:
            # Unregister the handlers using a different approach
            # This accesses the internal handlers dictionary directly
            try:
                if hasattr(self.client.sio, 'handlers'):
                    # Modern python-socketio versions store handlers differently
                    if 'inventory_update' in self.client.sio.handlers:
                        handlers = self.client.sio.handlers['inventory_update']
                        if on_inventory_update in handlers:
                            handlers.remove(on_inventory_update)
                    
                    if 'error' in self.client.sio.handlers:
                        handlers = self.client.sio.handlers['error']
                        if on_error in handlers:
                            handlers.remove(on_error)
                
            except Exception as e:
                logger.warning(f"Could not properly remove handlers: {e}")
                self.client.sio.handlers = {}

# To run the Locust tests:
# locust -f test_main.py --headless -u 10 -r 1 -t 1m  # For 10 users
# locust -f test_main.py --headless -u 100 -r 10 -t 1m  # For 100 users

# Open Locust Web UI:
# locust -f test_main.py -u 10 -r 1 -t 1m --host http://localhost:8000  # For 10 users
# locust -f test_main.py -u 100 -r 10 -t 1m --host http://localhost:8000 # For 100 users

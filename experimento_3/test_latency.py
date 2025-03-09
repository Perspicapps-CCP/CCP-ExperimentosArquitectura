import socketio
import logging
import time
import random
from locust import User, task, constant_throughput, events

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger('socketio_client')


class QuickstartUser(User):
    socket_host = "http://34.111.148.70"
    path = "inventario/socket.io"
    #wait_time = constant_pacing(9)
    wait_time = constant_throughput(0.01) 
    # Define multiple valid product IDs to distribute load and avoid contention
    product_ids = [
        "8187dbd5-34e1-4452-8a02-bd050b2a6f8f",
        "b83f190b-3a0a-4d4b-8ce0-4fe74fc6e311",
        "a3b16abb-2952-4a8d-ab55-e4f99a5859ee",
        "49cbce10-0479-4b86-a27e-712fa044df7a",
        "a3a4fae2-0b86-47e8-b9b6-ced9b5d82b37"
    ]

    # Pick a random product ID from the list
    product_id = random.choice(product_ids)
    quantity = random.randint(5, 10)

    @task
    def test_latency(self):
        
        sio = socketio.SimpleClient(logger=True)
        start_time = time.time()
        try:    
            sio.connect(self.socket_host, 
                socketio_path=self.path, 
                transports=['websocket'],
                wait_timeout=10)
            start_time = time.time()

            try:    
                sio.emit(
                    "update_product", {"id": self.product_id, "quantity": self.quantity}
                )    
                logger.info('update_product sent')
                event = sio.receive(timeout=1)
                total_time = int((time.time() - start_time) * 1000)

                events.request.fire(
                    request_type="websocket",
                    name="update_product-add",
                    response_time=total_time,
                    response_length=len(str(event)),
                    exception=None)

                logger.info(f"Received update response in {total_time}ms")
            except Exception as e:
                logger.error(f'Error: {e}')
                total_time = int((time.time() - start_time) * 1000)
                events.request.fire(
                    request_type="websocket",
                    name="update_product-emmit-error",
                    response_time=total_time,
                    response_length=0,
                    exception=Exception("Response error")
                )
        except Exception as e:
                logger.error(f'Error: {e}')
                total_time = int((time.time() - start_time) * 1000)
                events.request.fire(
                    request_type="websocket",
                    name="update_product-connect-error",
                    response_time=total_time,
                    response_length=0,
                    exception=Exception("Response error")
                )
        finally:
            sio.disconnect()
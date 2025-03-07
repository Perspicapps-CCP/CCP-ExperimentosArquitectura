import socketio
import time
import random
from locust import HttpUser, task, between, events


# Locust Performance Tests
class SocketIOClient:
    def __init__(self):
        self.sio = socketio.Client(reconnection=False)
        self.connected = False

    def connect(self, host):
        try:
            self.sio.connect(host)
            self.connected = True
        except Exception as e:
            print(f"Connection failed: {e}")

    def disconnect(self):
        if self.connected:
            self.sio.disconnect()
            self.connected = False

    def emit(self, event, data=None):
        if self.connected:
            self.sio.emit(event, data)


class InventoryUser(HttpUser):
    wait_time = between(1, 3)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.client = SocketIOClient()

    def on_start(self):
        self.client.connect("http://localhost:8000")

    def on_stop(self):
        self.client.disconnect()

    @task(2)
    def subscribe_to_inventory(self):
        start_time = time.time()
        try:
            self.client.emit("inventory_subscribe")
            total_time = int((time.time() - start_time) * 1000)
            events.request.fire(
                request_type="websocket",
                name="inventory_subscribe",
                response_time=total_time,
                response_length=0,
                exception=None,
            )
        except Exception as e:
            events.request.fire(
                request_type="websocket",
                name="inventory_subscribe",
                response_time=0,
                response_length=0,
                exception=e,
            )

    @task(2)
    def add_product(self):
        start_time = time.time()
        try:
            self.client.emit(
                "update_product", {"id": 1, "quantity": random.randint(5, 10)}
            )
            total_time = int((time.time() - start_time) * 1000)
            events.request.fire(
                request_type="websocket",
                name="update_product-add",
                response_time=total_time,
                response_length=0,
                exception=None,
            )
        except Exception as e:
            events.request.fire(
                request_type="websocket",
                name="update_product",
                response_time=0,
                response_length=0,
                exception=e,
            )

    @task(4)
    def reduce_product(self):
        start_time = time.time()
        try:
            self.client.emit(
                "update_product", {"id": 1, "quantity": -random.randint(1, 5)}
            )
            total_time = int((time.time() - start_time) * 1000)
            events.request.fire(
                request_type="websocket",
                name="update_product-reduce",
                response_time=total_time,
                response_length=0,
                exception=None,
            )
        except Exception as e:
            events.request.fire(
                request_type="websocket",
                name="update_product",
                response_time=0,
                response_length=0,
                exception=e,
            )


# To run the Locust tests:
# locust -f test_main.py --headless -u 10 -r 1 -t 1m  # For 10 users
# locust -f test_main.py --headless -u 100 -r 10 -t 1m  # For 100 users

# Open Locust Web UI:
# locust -f test_main.py -u 10 -r 1 -t 1m --host http://localhost:8000  # For 10 users
# locust -f test_main.py -u 100 -r 10 -t 1m --host http://localhost:8000 # For 100 users

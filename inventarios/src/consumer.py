import pika
import threading
import json

from .services import reserve_items, InventoryReserveItem


class RabbitMQConsumer:
    def __init__(self, host, queue_name):
        self.host = host
        self.queue_name = queue_name
        self.connection = None
        self.channel = None
        self.thread = None
        self.is_running = False

    def connect(self):
        """Establish connection to RabbitMQ"""
        if self.connection is None or not self.connection.is_open:
            self.connection = pika.BlockingConnection(
                pika.ConnectionParameters(host=self.host)
            )
            self.channel = self.connection.channel()
            self.channel.queue_declare(queue=self.queue_name)

    def on_request(self, ch, method, props, body):
        """Handle incoming message"""
        payload = json.loads(body)
        print(f" [.] payload: {payload}")

        # EJECUTAR LOGICA DE INVENTARIO
        reserve_items(
            [
                InventoryReserveItem(
                    product_id=item["product_id"], quantity=item["quantity"]
                )
                for item in payload
            ]
        )
        # Responde la misma respuesta que recibe
        self.response_callback(ch, method, props, body)

    def response_callback(self, ch, method, props, message):
        """Send response back to sender"""
        ch.basic_publish(
            exchange="",
            routing_key=props.reply_to,
            properties=pika.BasicProperties(correlation_id=props.correlation_id),
            body=message,
        )
        ch.basic_ack(delivery_tag=method.delivery_tag)

    def consume(self):
        """Start consuming messages"""
        try:
            self.connect()
            self.channel.basic_qos(prefetch_count=1)
            self.channel.basic_consume(
                queue=self.queue_name, on_message_callback=self.on_request
            )
            print(f" [x] Consumer started, awaiting RPC requests on {self.queue_name}")
            self.channel.start_consuming()
        except Exception as e:
            print(f"Consumer error: {e}")
        finally:
            self.cleanup()
            print(" [x] Consumer stopped")

    def cleanup(self):
        """Clean up resources"""
        try:
            if self.channel and self.channel.is_open:
                self.channel.stop_consuming()
            if self.connection and self.connection.is_open:
                self.connection.close()
            self.channel = None
            self.connection = None
        except Exception as e:
            print(f"Error during cleanup: {e}")

    def start(self):
        """Start consumer in a separate thread"""
        if self.is_running:
            print("Consumer is already running")
            return

        self.is_running = True
        self.thread = threading.Thread(target=self.consume)
        self.thread.daemon = True
        self.thread.start()
        print(" [x] Consumer thread started")

    def stop(self):
        """Stop consumer gracefully"""
        if not self.is_running:
            print("Consumer is not running")
            return

        print(" [x] Stopping consumer...")
        self.is_running = False

        try:
            if self.channel and self.channel.is_open:
                self.channel.stop_consuming()

            if self.thread and self.thread.is_alive():
                self.thread.join(timeout=5.0)
                if self.thread.is_alive():
                    print("Warning: Consumer thread did not shut down gracefully")

            self.cleanup()
            print(" [x] Consumer stopped successfully")
        except Exception as e:
            print(f"Error stopping consumer: {e}")

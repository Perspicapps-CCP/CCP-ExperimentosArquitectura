from typing import Dict, List
import pika
import uuid
import json
from config import BROKER_HOST


class BaseRPCClient:

    def __init__(self, routing_key: str):
        self.connection = pika.BlockingConnection(
            pika.ConnectionParameters(host=BROKER_HOST)
        )
        self.routing_key = routing_key
        self.channel = self.connection.channel()
        result = self.channel.queue_declare(queue="", exclusive=True)
        self.callback_queue = result.method.queue
        self.channel.basic_consume(
            queue=self.callback_queue,
            on_message_callback=self.on_response,
            auto_ack=True,
        )
        self.response = None
        self.corr_id = None

    def on_response(
        self,
        _ch: pika.channel.Channel,
        method: pika.spec.Basic.Deliver,
        props: pika.BasicProperties,
        body: bytes,
    ):
        if self.corr_id == props.correlation_id:
            self.response = body

    def call_broker(self, payload: Dict | List) -> Dict:
        self.corr_id = str(uuid.uuid4())
        self.channel.basic_publish(
            exchange="",
            routing_key=self.routing_key,
            properties=pika.BasicProperties(
                reply_to=self.callback_queue,
                correlation_id=self.corr_id,
            ),
            body=json.dumps(payload),
        )
        while self.response is None:
            self.connection.process_data_events(time_limit=None)
        return json.loads(self.response)

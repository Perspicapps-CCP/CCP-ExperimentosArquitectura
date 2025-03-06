#!/usr/bin/env python
import pika
import uuid
import json
from typing import List
from .entities import InventoryReserverdItem
from .base_client import InventoryClient
from config import BROKER_HOST, RESERVE_ITEMS_TOPIC


class InventoryRpcClient(InventoryClient):

    def __init__(self):
        self.connection = pika.BlockingConnection(
            pika.ConnectionParameters(host=BROKER_HOST))

        self.channel = self.connection.channel()

        result = self.channel.queue_declare(queue='', exclusive=True)
        self.callback_queue = result.method.queue

        self.channel.basic_consume(
            queue=self.callback_queue,
            on_message_callback=self.on_response,
            auto_ack=True)

        self.response = None
        self.corr_id = None

    def on_response(self, ch, method, props, body):
        if self.corr_id == props.correlation_id:
            self.response = body

    def reserve_items(
        self, _order_id: uuid.UUID, items: List[InventoryReserverdItem]
    ) -> List[InventoryReserverdItem]:
        self.response = None
        self.corr_id = str(uuid.uuid4())
        json_payload = json.dumps([item.dict() for item in items])
        self.channel.basic_publish(
            exchange='',
            routing_key=RESERVE_ITEMS_TOPIC,
            properties=pika.BasicProperties(
                reply_to=self.callback_queue,
                correlation_id=self.corr_id,
            ),
            body=json_payload)
        
        while self.response is None:
            self.connection.process_data_events(time_limit=None)
        
        print(f" [.] Got {self.response}")
        reserved_items = InventoryReserverdItem.from_json_list(self.response)        
        return reserved_items

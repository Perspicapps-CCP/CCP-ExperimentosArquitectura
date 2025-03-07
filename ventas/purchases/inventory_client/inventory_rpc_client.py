#!/usr/bin/env python
import uuid
from typing import List
from .entities import InventoryReserverdItem
from .base_client import InventoryClient
from config import BROKER_HOST, RESERVE_ITEMS_TOPIC
from seedwork.base_RPCClient import BaseRPCClient


class InventoryRpcClient(BaseRPCClient, InventoryClient):

    def __init__(self):
        super().__init__(RESERVE_ITEMS_TOPIC)

    def reserve_items(
        self, _order_id: uuid.UUID, items: List[InventoryReserverdItem]
    ) -> List[InventoryReserverdItem]:
        json_payload = [item.dict() for item in items]

        result = self.call_broker(json_payload)
        print(f" [.] Got {result}")
        reserved_items = InventoryReserverdItem.from_list(result)
        return reserved_items

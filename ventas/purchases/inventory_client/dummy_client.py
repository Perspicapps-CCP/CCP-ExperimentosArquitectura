import uuid
import time
from typing import List
import random

from .entities import InventoryReserverdItem
from .base_client import InventoryClient


class DummyInventoryClient(InventoryClient):

    def reserve_items(
        self, _order_id: uuid.UUID, items: List[InventoryReserverdItem]
    ) -> List[InventoryReserverdItem]:
        # Mock the reservation of items, always avalaible
        time.sleep(random.randint(1, 5) / 10)
        return [
            InventoryReserverdItem(
                product_id=item.product_id,
                quantity=item.quantity,
                price=random.randint(500, 600),
            )
            for item in items
        ]

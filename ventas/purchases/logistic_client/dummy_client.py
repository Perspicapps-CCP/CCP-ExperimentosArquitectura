from datetime import datetime, timedelta
import uuid
import time
import random

from .base_client import LogisticClient
from .entities import CreatedDeliveryOrder


class DummyLogisticClient(LogisticClient):
    def create_delivery_order(self, purchase) -> CreatedDeliveryOrder:
        # Mock the creation of a delivery order
        time.sleep(random.randint(1, 5) / 10)
        return CreatedDeliveryOrder(
            order_id=uuid.uuid4(),
            address_id=purchase.address_id,
            delivery_date=datetime.now() + timedelta(days=2),
        )

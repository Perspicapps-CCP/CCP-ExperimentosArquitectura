import uuid
from datetime import datetime

from config import CREATE_DELIVERY_TOPIC
from seedwork.base_RPCClient import BaseRPCClient
from purchases.models import Purchase
from .entities import CreatedDeliveryOrder
from .base_client import LogisticClient


class LogisticRpcClient(BaseRPCClient, LogisticClient):

    def __init__(self):
        super().__init__(CREATE_DELIVERY_TOPIC)

    def create_delivery_order(self, purchase: Purchase) -> CreatedDeliveryOrder:
        json_body = {
            "purchase_id": str(purchase.id),
            "address_id": str(purchase.address_id),
            "user_id": str(purchase.user_id),
            "items": [
                {"product_id": str(item.product_id), "quantity": item.quantity}
                for item in purchase.items
            ],
        }
        result = self.call_broker(json_body)
        print(f" [.] Got {result}")
        return CreatedDeliveryOrder(
            order_id=uuid.UUID(result["id"]),
            delivery_date=datetime.fromisoformat(result["delivery_date"]),
            address_id=uuid.UUID(result["address_id"]),
        )

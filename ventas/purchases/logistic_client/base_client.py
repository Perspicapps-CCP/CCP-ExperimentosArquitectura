from abc import ABC, abstractmethod
import uuid
from typing import List

from purchases.models import Purchase
from .entities import CreatedDeliveryOrder


class LogisticClient(ABC):
    @abstractmethod
    def create_delivery_order(self, purchase: Purchase) -> CreatedDeliveryOrder: ...

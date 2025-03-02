from abc import ABC, abstractmethod
import uuid
from typing import List

from purchases.schemas import PurchaseItemCreate
from .entities import InventoryReserverdItem


class InventoryClient(ABC):
    @abstractmethod
    def reserve_items(
        self, order_id: uuid.UUID, items: List[PurchaseItemCreate]
    ) -> List[InventoryReserverdItem]: ...

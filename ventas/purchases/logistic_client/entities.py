from dataclasses import dataclass
from datetime import datetime
from uuid import UUID


@dataclass
class CreatedDeliveryOrder:
    order_id: UUID
    address_id: UUID
    delivery_date: datetime

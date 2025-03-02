from dataclasses import dataclass


@dataclass
class InventoryReserverdItem:
    product_id: str
    quantity: int
    price: float

from dataclasses import dataclass
from typing import List

from .database import SessionLocal
from . import crud


@dataclass
class InventoryReserveItem:
    product_id: str
    quantity: int


def reserve_items(items: List[InventoryReserveItem]) -> List[InventoryReserveItem]:
    # Just reduces the amount in database without any checks
    db = SessionLocal()
    try:
        products_to_reserve = {item.product_id: item for item in items}
        inventory_by_product_id_dict = {
            item.product_id: item
            for item in crud.get_inventory_by_products_id(
                db, [item.product_id for item in items]
            )
        }
        for product_id, item in products_to_reserve.items():
            inventory_item = inventory_by_product_id_dict.get(product_id)
            if not inventory_item:
                continue
            inventory_item.quantity -= item.quantity

        db.commit()
        result = [
            InventoryReserveItem(product_id=item.product_id, quantity=item.quantity)
            for item in inventory_by_product_id_dict.values()
        ]
    finally:
        db.close()

    return result

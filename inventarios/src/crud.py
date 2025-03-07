from typing import List

from sqlalchemy.orm import Session, joinedload
from src.models import Inventory, Product
from src.database import Base
from datetime import datetime


def get_inventory(db: Session):
    return (
        db.query(Product)
        .options(joinedload(Product.inventories))
        .order_by(Product.name.asc())
        .all()
    )


def get_inventory_item(db: Session, product_id: str):
    return (
        db.query(Product)
        .options(joinedload(Product.inventories))
        .filter(Product.id == product_id)
        .first()
    )


def update_inventory_item(
    db: Session, product_id: str, location: str, new_quantity: int
):
    item = (
        db.query(Inventory)
        .options(joinedload(Inventory.product))
        .filter(Inventory.product_id == product_id)
        .filter(Inventory.location == location)
        .first()
    )

    item.quantity = new_quantity
    item.last_updated = datetime.now()
    db.commit()
    db.refresh(item)
    return item


def reset_db(db: Session) -> None:
    Base.metadata.drop_all(bind=db.get_bind())
    Base.metadata.create_all(bind=db.get_bind())


def get_inventory_by_products_id(db: Session, product_ids: List[str]):
    return (
        db.query(Inventory)
        .options(joinedload(Inventory.product))
        .filter(Inventory.product_id.in_(product_ids))
        .all()
    )

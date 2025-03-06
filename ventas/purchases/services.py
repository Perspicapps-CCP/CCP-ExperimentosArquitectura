from sqlalchemy.orm import Session
from uuid import UUID, uuid4
from typing import List, Optional

from . import models, schemas
from .inventory_client.inventory_rpc_client import InventoryRpcClient
from .inventory_client.entities import InventoryReserverdItem
from .logistic_client.dummy_client import DummyLogisticClient
from .exceptions import CanotReserveAllProducts


def _save_items_to_databse(
    db: Session,
    purchase_id: UUID,
    purchase: schemas.PurchaseCreate,
    items: List[InventoryReserverdItem],
) -> models.Purchase:
    with db.begin():
        db_purchase = models.Purchase(
            id=purchase_id,
            status=models.PurchaseStatus.PENDING,
            user_id=purchase.user_id,
            address_id=purchase.address_id,
            total_amount=sum([item.price for item in items]),
        )
        db.add(db_purchase)
        db.flush()
        for item in items:
            db_item = models.PurchaseItem(
                purchase_id=purchase_id,
                product_id=item.product_id,
                quantity=item.quantity,
                price=item.price,
            )
            db.add(db_item)
    db.refresh(db_purchase)
    return db_purchase


def create_purchase(db: Session, purchase: schemas.PurchaseCreate) -> models.Purchase:
    """
    Create a new purchase along with its items.

    Args:
        db (Session): The database session.
        purchase (schemas.PurchaseCreate): The purchase data.

    Returns:
        models.Purchase: The created purchase.
    """
    logistic_client = InventoryRpcClient()
    order_id = uuid4()
    reserved_itmes = logistic_client.reserve_items(
        order_id,
        [
            InventoryReserverdItem(
                product_id=item.product_id, quantity=item.quantity, price=0
            )
            for item in purchase.items
        ],
    )
    # Validate item counts match
    desired_quantity = {item.product_id: item.quantity for item in purchase.items}
    reserved_quantity = {item.product_id: item.quantity for item in reserved_itmes}
    if desired_quantity != reserved_quantity:
        errors = []
        for product_id, quantity in desired_quantity.items():
            if quantity != reserved_quantity.get(product_id, 0):
                errors.append(
                    {
                        "product_id": product_id,
                        "quantity": quantity,
                        "reserved_quantity": reserved_quantity.get(product_id, 0),
                    }
                )
        raise CanotReserveAllProducts(errors)
    purchase = _save_items_to_databse(db, order_id, purchase, reserved_itmes)
    # Trigger purchase order creation
    deliver = DummyLogisticClient().create_delivery_order(purchase)
    # Change status to IN_PROGRESS
    purchase.status = models.PurchaseStatus.IN_PROGRESS
    purchase.delivery_order_id = deliver.order_id
    db.commit()
    return purchase


def get_purchase(db: Session, purchase_id: UUID) -> Optional[models.Purchase]:
    """
    Retrieve a purchase by its ID.

    Args:
        db (Session): The database session.
        purchase_id (UUID): The ID of the purchase.

    Returns:
        Optional[models.Purchase]: The purchase if found, otherwise None.
    """
    return db.query(models.Purchase).filter(models.Purchase.id == purchase_id).first()


def get_purchases(db: Session, skip: int = 0, limit: int = 10) -> List[models.Purchase]:
    """
    Retrieve a list of purchases, ordered by the updated_at field in descending order.

    Args:
        db (Session): The database session.
        skip (int): The number of records to skip.
        limit (int): The maximum number of records to return.

    Returns:
        List[models.Purchase]: A list of purchases.
    """
    return (
        db.query(models.Purchase)
        .order_by(models.Purchase.updated_at.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )


def update_purchase_status(
    db: Session, purchase_id: UUID, status: models.PurchaseStatus
) -> Optional[models.Purchase]:
    """
    Update the status of a purchase.

    Args:
        db (Session): The database session.
        purchase_id (UUID): The ID of the purchase.
        status (models.PurchaseStatus): The new status of the purchase.

    Returns:
        Optional[models.Purchase]: The updated purchase if found, otherwise None.
    """
    db_purchase = (
        db.query(models.Purchase).filter(models.Purchase.id == purchase_id).first()
    )
    if db_purchase:
        db_purchase.status = status
        db.commit()
        db.refresh(db_purchase)
    return db_purchase


def delete_purchase(db: Session, purchase_id: UUID) -> Optional[models.Purchase]:
    """
    Delete a purchase by its ID.

    Args:
        db (Session): The database session.
        purchase_id (UUID): The ID of the purchase.

    Returns:
        Optional[models.Purchase]: The deleted purchase if found, otherwise None.
    """
    db_purchase = (
        db.query(models.Purchase).filter(models.Purchase.id == purchase_id).first()
    )
    if db_purchase:
        db.delete(db_purchase)
        db.commit()
    return db_purchase

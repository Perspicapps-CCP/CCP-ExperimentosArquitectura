from sqlalchemy.orm import Session
from uuid import UUID
from typing import List, Optional, Dict

from . import models, schemas


def create_product(db: Session, product: schemas.ProductCreate) -> models.Product:
    """
    Create a new product.

    Args:
        db (Session): The database session.
        product (schemas.ProductCreate): The product data.

    Returns:
        models.Product: The created product.
    """
    db_product = models.Product(
        price=product.price,
        name=product.name,
        description=product.description,
        sku=product.sku,
    )
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product


def get_product(db: Session, product_id: UUID) -> Optional[models.Product]:
    """
    Retrieve a product by its ID.

    Args:
        db (Session): The database session.
        product_id (UUID): The ID of the product.

    Returns:
        Optional[models.Product]: The product if found, otherwise None.
    """
    return db.query(models.Product).filter(models.Product.id == product_id).first()


def get_products(db: Session, skip: int = 0, limit: int = 10) -> List[models.Product]:
    """
    Retrieve a list of products.

    Args:
        db (Session): The database session.
        skip (int): The number of records to skip.
        limit (int): The maximum number of records to return.

    Returns:
        List[models.Product]: A list of products.
    """
    return (
        db.query(models.Product)
        .order_by(models.Product.updated_at)
        .offset(skip)
        .limit(limit)
        .all()
    )


def delete_product(db: Session, product_id: UUID) -> Optional[models.Product]:
    """
    Delete a product by its ID.

    Args:
        db (Session): The database session.
        product_id (UUID): The ID of the product.

    Returns:
        Optional[models.Product]: The deleted product if found, otherwise None.
    """
    db_product = (
        db.query(models.Product).filter(models.Product.id == product_id).first()
    )
    if db_product:
        db.delete(db_product)
        db.commit()
    return db_product


def get_products_with_ids(
    db: Session, product_ids: List[UUID]
) -> Dict[UUID, models.Product]:
    """
    Retrieve a list of products by their IDs.

    Args:
        db (Session): The database session.
        product_ids (List[UUID]): The IDs of the products.

    Returns:
        List[models.Product]: A list of products.
    """
    return {
        p.id: p
        for p in db.query(models.Product)
        .filter(models.Product.id.in_(product_ids))
        .all()
    }

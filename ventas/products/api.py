from uuid import UUID
from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from . import services, schemas
from db_dependency import get_db


products_router = APIRouter(prefix="/productos")


@products_router.post("/", response_model=schemas.ProductResponse)
def create_product(product: schemas.ProductCreate, db: Session = Depends(get_db)):
    product = services.create_product(db=db, product=product)
    return product


@products_router.get("/{product_id}", response_model=schemas.ProductResponse)
def product_detail(product_id: UUID, db: Session = Depends(get_db)):
    db_product = services.get_product(db, product_id=product_id)
    if db_product is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Product not found"
        )
    return db_product


@products_router.get("/", response_model=List[schemas.ProductResponse])
def list_all_products(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    products = services.get_products(db, skip=skip, limit=limit)
    return products


@products_router.delete("/{product_id}", response_model=schemas.DeleteResponse)
def delete_product(product_id: UUID, db: Session = Depends(get_db)):
    db_product = services.delete_product(db, product_id=product_id)
    if db_product is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Product not found"
        )
    return schemas.DeleteResponse()

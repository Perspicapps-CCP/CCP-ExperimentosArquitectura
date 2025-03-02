from uuid import UUID
from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from . import services, schemas, mappers
from db_dependency import get_db


purchases_router = APIRouter(prefix="/compras")


@purchases_router.post("/", response_model=schemas.PurchaseResponse)
def create_purchase(purchase: schemas.PurchaseCreate, db: Session = Depends(get_db)):
    purchase = services.create_purchase(db=db, purchase=purchase)
    return mappers.purchase_to_schema(purchase)


@purchases_router.get("/{purchase_id}", response_model=schemas.PurchaseResponse)
def purchase_detail(purchase_id: UUID, db: Session = Depends(get_db)):
    db_purchase = services.get_purchase(db, purchase_id=purchase_id)
    if db_purchase is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Purchase not found"
        )
    return mappers.purchase_to_schema(db_purchase)


@purchases_router.get("/", response_model=List[schemas.PurchaseResponse])
def list_all_purchases(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    purchases = services.get_purchases(db, skip=skip, limit=limit)
    return [mappers.purchase_to_schema(purchase) for purchase in purchases]


@purchases_router.delete("/{purchase_id}", response_model=schemas.DeleteResponse)
def delete_purchase(purchase_id: UUID, db: Session = Depends(get_db)):
    db_purchase = services.delete_purchase(db, purchase_id=purchase_id)
    if db_purchase is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Purchase not found"
        )
    return schemas.DeleteResponse()

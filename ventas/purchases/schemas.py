# Fite to validate the data that is being sent and recieved to the API
import datetime, uuid
from typing import List, Optional

from pydantic import BaseModel, Field


class DeleteResponse(BaseModel):
    msg: str = "Todos los datos fueron eliminados"


class PurchaseItemCreate(BaseModel):
    product_id: uuid.UUID
    quantity: int


class PurchaseItemResponse(PurchaseItemCreate):
    price: float
    created_at: datetime.datetime
    updated_at: Optional[datetime.datetime]

    class Config:
        orm_mode = True


class PurchaseCreate(BaseModel):
    user_id: uuid.UUID
    address_id: uuid.UUID
    items: List[PurchaseItemCreate]


class PurchaseResponse(PurchaseCreate):
    id: uuid.UUID
    user_id: uuid.UUID
    total_amount: float
    status: str
    created_at: datetime.datetime
    updated_at: Optional[datetime.datetime]
    items: List[PurchaseItemResponse]

    class Config:
        orm_mode = True

# File to validate the data that is being sent and received to the API
import datetime
import uuid
from typing import List, Optional

from pydantic import BaseModel


class ProductCreate(BaseModel):
    price: float
    name: str
    description: str
    sku: str


class ProductResponse(BaseModel):
    id: uuid.UUID
    price: float
    name: str
    description: str
    sku: str
    created_at: datetime.datetime
    updated_at: Optional[datetime.datetime]

    class Config:
        orm_mode = True


class DeleteResponse(BaseModel):
    msg: str = "Porducto eliminado"

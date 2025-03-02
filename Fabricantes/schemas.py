from datetime import datetime
from typing import Optional

from pydantic import BaseModel

class ManufacturerCreateBase(BaseModel):
    code: str
    name: str
    address: str
    description: str
    phone: str
    web_site: str
    country: str


class ManufacturerCreate(ManufacturerCreateBase):
    name: Optional[str] = None
    code: Optional[str] = None
    address: Optional[str] = None
    description: Optional[str] = None
    phone: Optional[str] = None
    web_site: Optional[str] = None
    country: Optional[str] = None


class ManufacturerResponse(ManufacturerCreateBase):
    id: str
    createdAt: datetime


class ManufacturerBatchResponse(BaseModel):
    total_records: int
    message: str



class DeleteManufacturerResponse(BaseModel):
    msg: str = "el fabricante fue eliminado"

class DeleteResponse(BaseModel):
        msg: str = "Todos los datos fueron eliminados"

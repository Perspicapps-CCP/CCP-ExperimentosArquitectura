import uuid
import enum

from sqlalchemy import Column, UUID, String, DateTime, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from database import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    price = Column(Float, nullable=False)
    name = Column(String, nullable=False)
    description = Column(String, nullable=False)
    sku = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    purchases = relationship("PurchaseItem", back_populates="product")

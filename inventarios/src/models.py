import uuid
from sqlalchemy import Column, String, Integer, DateTime, Float, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from src.database import Base
from datetime import datetime, timezone


class Product(Base):
    __tablename__ = "products"

    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, index=True)
    description = Column(String)
    price = Column(Float)
    inventories = relationship("Inventory", back_populates="product", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<Product(id={self.id}, name='{self.name}', price={self.price})>"

class Inventory(Base):
    __tablename__ = "inventories"
    __table_args__ = (
        UniqueConstraint("product_id", "location", name="unique_product_location"),
    )
    product_id = Column(String, ForeignKey("products.id"), primary_key=True)
    location = Column(String, nullable=False, default="Unknown", primary_key=True)
    quantity = Column(Integer, nullable=False, default=0)
    last_updated = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    product = relationship("Product", back_populates="inventories")
    
    def __repr__(self):
        return f"<Inventory(id={self.id}, product_id={self.product_id}, quantity={self.quantity}, location='{self.location}')>"
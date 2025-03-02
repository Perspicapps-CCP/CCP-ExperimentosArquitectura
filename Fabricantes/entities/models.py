from database import Base
from sqlalchemy import Column, String, DateTime
from datetime import datetime
import uuid


class Manufacturer(Base):
    __tablename__ = "manufacturer"

    id = Column(
        String,
        primary_key=True,
        unique=True,
        nullable=False,
        default=lambda: str(uuid.uuid4())
    )
    code = Column(String)
    name = Column(String)
    address = Column(String)
    description = Column(String)
    phone = Column(String)
    web_site = Column(String)
    country = Column(String)
    updateAt = Column(DateTime)
    createdAt = Column(DateTime, default=datetime.utcnow)

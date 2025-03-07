from sqlalchemy.orm import Session
import schemas
from entities.models import Manufacturer
from database import Base


def get_all(db: Session):
    query = db.query(Manufacturer)
    return query.all()


def create_manufacturer(
    db: Session, manufacturer: schemas.ManufacturerCreate
) -> schemas.ManufacturerResponse:
    db_manufacturer = Manufacturer(
        code=manufacturer.code,
        name=manufacturer.name,
        address=manufacturer.address,
        description=manufacturer.description,
        phone=manufacturer.phone,
        web_site=manufacturer.web_site,
        country=manufacturer.country,
    )
    db.add(db_manufacturer)
    db.commit()
    db.refresh(db_manufacturer)
    return schemas.ManufacturerResponse(
        id=db_manufacturer.id, createdAt=db_manufacturer.createdAt
    )


def reset(db: Session):
    Base.metadata.drop_all(bind=db.get_bind())
    Base.metadata.create_all(bind=db.get_bind())

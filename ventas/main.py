# Main application
import sys
from contextlib import asynccontextmanager

from fastapi import Depends, FastAPI, APIRouter
from sqlalchemy.orm import Session

import schemas
from database import engine, Base
from db_dependency import get_db
from purchases.api import purchases_router
from products.api import products_router
from seed_databse import seed


prefix_router = APIRouter(prefix="/ventas")

prefix_router.include_router(purchases_router)
prefix_router.include_router(products_router)

if "pytest" not in sys.modules:
    Base.metadata.create_all(bind=engine)


@asynccontextmanager
async def lifespan(app: FastAPI):
    seed()
    yield


# Rest the database
@prefix_router.post("/reset-db", response_model=schemas.DeleteResponse)
def reset(db: Session = Depends(get_db)):
    Base.metadata.drop_all(bind=db.get_bind())
    Base.metadata.create_all(bind=db.get_bind())
    seed(db)
    return schemas.DeleteResponse()


# health
@prefix_router.get("/health")
def ping():
    return "pong"


app = FastAPI(lifespan=lifespan)
app.include_router(prefix_router)

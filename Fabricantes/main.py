from fastapi import FastAPI, Depends, status, UploadFile, File
import csv
import repository
import schemas
from database import SessionLocal, engine
from sqlalchemy.orm import Session
import sys
import io
from repository import crud

from entities import models

if "pytest" not in sys.modules:
  models.Base.metadata.create_all(bind=engine)

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/manufacturer/ping")
def ping():
    return 'pong'

@app.get("/manufacturer")
def get_all_manufacturer(db: Session = Depends(get_db)):
    return crud.get_all(db)


@app.post("/manufacturer", response_model=schemas.ManufacturerResponse, status_code=status.HTTP_201_CREATED)
def create_single_manufacturer(manufacturer: schemas.ManufacturerCreate, db: Session = Depends(get_db)):
    return crud.create_manufacturer(db=db, manufacturer=manufacturer)

@app.post("/manufacturer/reset", response_model=schemas.DeleteResponse)
def reset(db: Session = Depends(get_db)):
    repository.crud.reset(db)
    return schemas.DeleteResponse

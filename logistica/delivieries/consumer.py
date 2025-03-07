from typing import Dict
from seedwork.base_consumer import BaseConsumer

from config import CREATE_DELIVERY_TOPIC
from database import SessionLocal
from .services import create_delivery
from .schemas import DeliveryCreateSchema
from .mappers import delivery_to_schema


class CreateDeliveryConsumer(BaseConsumer):
    def __init__(self):
        super().__init__(queue=CREATE_DELIVERY_TOPIC)

    def process_payload(self, payload: Dict) -> Dict:
        db = SessionLocal()
        try:
            delivery_schema = DeliveryCreateSchema(**payload)
            delivery = create_delivery(db, delivery_schema)
            return delivery_to_schema(delivery).model_dump_json()
        except Exception as e:
            return {"error": str(e)}
        finally:
            db.close()

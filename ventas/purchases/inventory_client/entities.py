import uuid
import json
from dataclasses import dataclass, asdict
from typing import Dict, Any, List, TypeVar, Type

T = TypeVar("T", bound="InventoryReserverdItem")


@dataclass
class InventoryReserverdItem:
    product_id: uuid.UUID
    quantity: int
    price: float

    def dict(self) -> Dict[str, Any]:
        """Convert dataclass to dictionary with UUID handling."""
        data = asdict(self)
        # Convert any UUID objects to strings
        for key, value in data.items():
            if isinstance(value, uuid.UUID):
                data[key] = str(value)
        return data

    @classmethod
    def from_dict(cls: Type[T], data: Dict[str, Any]) -> T:
        # Convert string UUID back to UUID object
        if "product_id" in data and isinstance(data["product_id"], str):
            data["product_id"] = uuid.UUID(data["product_id"])

        return cls(**data)

    @classmethod
    def from_list(cls: Type[T], json: Dict) -> List[T]:
        return [cls.from_dict(item_data) for item_data in json]

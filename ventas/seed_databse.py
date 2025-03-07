import uuid
from products.models import Product
from database import SessionLocal


def seed():
    db = SessionLocal()
    if db.query(Product).count() > 0:
        return
    print("Seeding database")
    products = [
        Product(
            id=uuid.UUID("22b98234-2a0c-42db-a77f-ffc5c784b76f"),
            price=15000.0,
            name="Café Colombiano",
            description="Café de alta calidad cultivado en las montañas de Colombia.",
            sku="CAF-001",
        ),
        Product(
            id=uuid.UUID("67f69461-14e6-4d4c-809d-37128b9926a2"),
            price=20000.0,
            name="Chocolate Santafereño",
            description="Delicioso chocolate tradicional de Bogotá.",
            sku="CHO-002",
        ),
        Product(
            id=uuid.UUID("b83f190b-3a0a-4d4b-8ce0-4fe74fc6e311"),
            price=12000.0,
            name="Arequipe",
            description="Dulce de leche cremoso y delicioso.",
            sku="ARE-003",
        ),
        Product(
            id=uuid.UUID("3eff8696-211a-4b7a-9e45-ba16f2ed1d5b"),
            price=18000.0,
            name="Panela",
            description="Panela orgánica producida en el Valle del Cauca.",
            sku="PAN-004",
        ),
        Product(
            id=uuid.UUID("e1a64880-1e54-45a3-aed3-bd7b2ed89532"),
            price=25000.0,
            name="Queso Costeño",
            description="Queso fresco y salado típico de la costa Caribe.",
            sku="QUE-005",
        ),
        Product(
            id=uuid.UUID("8187dbd5-34e1-4452-8a02-bd050b2a6f8f"),
            price=30000.0,
            name="Aguardiente Antioqueño",
            description="Licor tradicional de Antioquia.",
            sku="AGU-006",
        ),
        Product(
            id=uuid.UUID("a3a4fae2-0b86-47e8-b9b6-ced9b5d82b37"),
            price=22000.0,
            name="Empanadas Vallunas",
            description="Empanadas tradicionales del Valle del Cauca.",
            sku="EMP-007",
        ),
        Product(
            id=uuid.UUID("a3b16abb-2952-4a8d-ab55-e4f99a5859ee"),
            price=17000.0,
            name="Bocadillo Veleño",
            description="Dulce de guayaba típico de Vélez, Santander.",
            sku="BOC-008",
        ),
        Product(
            id=uuid.UUID("49cbce10-0479-4b86-a27e-712fa044df7a"),
            price=14000.0,
            name="Chorizo Santarrosano",
            description="Chorizo artesanal de Santa Rosa de Cabal.",
            sku="CHO-009",
        ),
        Product(
            id=uuid.UUID("6abca9fa-3ca2-49b6-bfec-ec758bb4ec80"),
            price=16000.0,
            name="Tamales Tolimenses",
            description="Tamales tradicionales del Tolima.",
            sku="TAM-010",
        ),
    ]

    for product in products:
        db.add(product)
    db.commit()
    db.close()

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
from src.config import DATABASE_URL


engine = create_engine(DATABASE_URL, pool_size=30, max_overflow=30, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Initialize with default data
def init_db_with_defaults(db: SessionLocal = None):
    from src.models import Product, Inventory

    db = db or SessionLocal()
    # Create tables if they don't exist
    Base.metadata.create_all(bind=db.get_bind())

    try:
        # Check if we already have data
        if db.query(Product).count() == 0:
            # Add default products
            default_products = [
                Product(
                    id="22b98234-2a0c-42db-a77f-ffc5c784b76f",
                    name="Café Colombiano",
                    description="Café de alta calidad cultivado en las montañas de Colombia.",
                    price=15000.0,
                ),
                Product(
                    id="67f69461-14e6-4d4c-809d-37128b9926a2",
                    name="Chocolate Santafereño",
                    description="Delicioso chocolate tradicional de Bogotá.",
                    price=20000.0,
                ),
                Product(
                    id="b83f190b-3a0a-4d4b-8ce0-4fe74fc6e311",
                    name="Arequipe",
                    description="Dulce de leche cremoso y delicioso.",
                    price=12000.0,
                ),
                Product(
                    id="3eff8696-211a-4b7a-9e45-ba16f2ed1d5b",
                    name="Panela",
                    description="Panela orgánica producida en el Valle del Cauca.",
                    price=18000.0,
                ),
                Product(
                    id="e1a64880-1e54-45a3-aed3-bd7b2ed89532",
                    name="Queso Costeño",
                    description="Queso fresco y salado típico de la costa Caribe.",
                    price=25000.0,
                ),
                Product(
                    id="8187dbd5-34e1-4452-8a02-bd050b2a6f8f",
                    name="Aguardiente Antioqueño",
                    description="Licor tradicional de Antioquia.",
                    price=30000.0,
                ),
                Product(
                    id="a3a4fae2-0b86-47e8-b9b6-ced9b5d82b37",
                    name="Empanadas Vallunas",
                    description="Empanadas tradicionales del Valle del Cauca.",
                    price=22000.0,
                ),
                Product(
                    id="a3b16abb-2952-4a8d-ab55-e4f99a5859ee",
                    name="Bocadillo Veleño",
                    description="Dulce de guayaba típico de Vélez, Santander.",
                    price=17000.0,
                ),
                Product(
                    id="49cbce10-0479-4b86-a27e-712fa044df7a",
                    name="Chorizo Santarrosano",
                    description="Chorizo artesanal de Santa Rosa de Cabal.",
                    price=14000.0,
                ),
                Product(
                    id="6abca9fa-3ca2-49b6-bfec-ec758bb4ec80",
                    name="Tamales Tolimenses",
                    description="Tamales tradicionales del Tolima.",
                    price=16000.0,
                ),
            ]
            db.add_all(default_products)
            db.commit()

            # Need to refresh to get the IDs
            for product in default_products:
                db.refresh(product)

            # Add default inventory entries
            default_inventory = [
                Inventory(
                    product_id=default_products[0].id,
                    quantity=10,
                    location="Warehouse A",
                ),
                Inventory(
                    product_id=default_products[1].id,
                    quantity=20,
                    location="Warehouse A",
                ),
                Inventory(
                    product_id=default_products[2].id,
                    quantity=15,
                    location="Warehouse B",
                ),
                Inventory(
                    product_id=default_products[3].id,
                    quantity=30,
                    location="Warehouse B",
                ),
                Inventory(
                    product_id=default_products[4].id,
                    quantity=30,
                    location="Warehouse C",
                ),
                Inventory(
                    product_id=default_products[5].id,
                    quantity=60,
                    location="Warehouse C",
                ),
                Inventory(
                    product_id=default_products[6].id,
                    quantity=50,
                    location="Warehouse D",
                ),
                Inventory(
                    product_id=default_products[7].id,
                    quantity=90,
                    location="Warehouse D",
                ),
                Inventory(
                    product_id=default_products[8].id,
                    quantity=20,
                    location="Warehouse A",
                ),
                Inventory(
                    product_id=default_products[9].id,
                    quantity=10,
                    location="Warehouse A",
                ),
            ]
            db.add_all(default_inventory)
            db.commit()

            print("Database initialized with default values")
        else:
            print("Database already contains data, skipping initialization")
    except Exception as e:
        db.rollback()
        print(f"Error initializing database: {e}")
    finally:
        db.close()

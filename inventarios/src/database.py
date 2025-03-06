from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
from src.config import DATABASE_URL


engine = create_engine(DATABASE_URL)
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
def init_db_with_defaults():
    from src.models import Product, Inventory
    
    # Create tables if they don't exist
    Base.metadata.create_all(bind=engine)    
    db = SessionLocal()
    try:
        # Check if we already have data
        if db.query(Product).count() == 0:
            # Add default products
            default_products = [
                Product(name="Laptop", description="High-performance laptop", price=1200.00),
                Product(name="Smartphone", description="Latest model smartphone", price=800.00),
                Product(name="Tablet", description="10-inch tablet", price=350.00),
                Product(name="Headphones", description="Noise-cancelling headphones", price=150.00),
                Product(name="Monitor", description="27-inch 4K monitor", price=300.00)
            ]
            db.add_all(default_products)
            db.commit()
            
            # Need to refresh to get the IDs
            for product in default_products:
                db.refresh(product)
            
            # Add default inventory entries
            default_inventory = [
                Inventory(product_id=default_products[0].id, quantity=10, location="Warehouse A"),
                Inventory(product_id=default_products[1].id, quantity=20, location="Warehouse A"),
                Inventory(product_id=default_products[2].id, quantity=15, location="Warehouse B"),
                Inventory(product_id=default_products[3].id, quantity=30, location="Warehouse B"),
                Inventory(product_id=default_products[4].id, quantity=8, location="Warehouse C")
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
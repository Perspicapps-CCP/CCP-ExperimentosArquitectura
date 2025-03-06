import socketio
from sqlalchemy.orm import Session
from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from src import crud
from src.consumer import RabbitMQConsumer
from src.config import BROKER_HOST, CONSUMER_TOPIC
from src.database import init_db_with_defaults, get_db


# Create a global consumer instance
_consumer = RabbitMQConsumer(BROKER_HOST, CONSUMER_TOPIC)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Load
    init_db_with_defaults()
    _consumer.start()
    yield
    # Clean up
    _consumer.stop()


app = FastAPI(lifespan=lifespan)
app.mount("/static", StaticFiles(directory="src/static"), name="static")

sio = socketio.AsyncServer(cors_allowed_origins='*', async_mode='asgi', transports=["websocket", "polling"])
socket_app = socketio.ASGIApp(sio, app)


@app.get("/ping")
def healthcheck():
    return "pong"

@app.post("/reset")
def reset(db: Session = Depends(get_db)):
    crud.reset_db(db)
    return {"message": "Database reset"}

@app.get("/inventory")
def get_inventory(db: Session = Depends(get_db)):
    return crud.get_inventory(db)

@app.get("/socket-test")
async def socket_test():
    return FileResponse("src/static/index.html")


@sio.event
async def connect(sid, environ):
    print(f"Client connected: {sid}")

@sio.event
async def disconnect(sid):
    print(f"Client disconnected: {sid}")

@sio.event
async def message(sid, data):
    print(f"Message received: {data}, from: {sid}")
    await sio.emit('message', f"Server received: {data}, from {sid}") #broadcast to all clients

@sio.event
async def inventory_subscribe(sid):
    """Client subscribes to inventory updates"""
    db_generator = get_db()
    try:
        db = next(db_generator)
        inventory_data = crud.get_inventory(db)
        inventory_dto = [{'id': product.id, 
                          'name': product.name, 
                          'quantity': product.inventories[0].quantity, 
                          'last_updated': product.inventories[0].last_updated.isoformat()
                          } for product in inventory_data]
        # Broadcast update to all connected clients
        await sio.emit('inventory_update', inventory_dto)
        print(f"Client {sid} subscribed to inventory updates")
    finally:
        db_generator.close()

@sio.event
async def update_product(sid, data):
    """Handle product updates"""
    db_generator = get_db()
    try:
        product_id = data.get('id')
        new_quantity = int(data.get('quantity'))
        
        if not isinstance(new_quantity, int):
            await sio.emit('error', "Quantity must be an integer", room=sid)
            return
        
        db = next(db_generator)
        product = crud.get_inventory_item(db, product_id)
        if not product:
            await sio.emit('error', f"Product {product_id} not found", room=sid)
            return
        
        quantity_change = product.inventories[0].quantity + new_quantity
        if quantity_change <= 0:
            await sio.emit('error', "We do not have more units than those available.", room=sid)
            return
        
        inventory_updated = crud.update_inventory_item(db, product.id, product.inventories[0].location, quantity_change)
        product_data = {
            'id': inventory_updated.product_id,
            'name': inventory_updated.product.name,
            'quantity': inventory_updated.quantity,
            'last_updated': inventory_updated.last_updated.isoformat()
        }

        # Broadcast update to all connected clients
        await sio.emit('inventory_update', product_data)
        print(f"Product {product_id} updated by {sid}. Quantity changed by {quantity_change} units")
    except Exception as e:
        await sio.emit('error', str(e), room=sid)
    finally:
        db_generator.close()

app = socket_app
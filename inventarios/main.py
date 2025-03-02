from typing import Dict
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import socketio
from pydantic import BaseModel
from datetime import datetime

# Product model
class Product(BaseModel):
    id: int
    name: str
    quantity: int
    last_updated: datetime = datetime.now()

# In-memory inventory (in production, use a database)
inventory: Dict[int, Product] = {
    1: Product(id=1, name="Laptop", quantity=10),
    2: Product(id=2, name="Mouse", quantity=20),
    3: Product(id=3, name="Keyboard", quantity=15)
}


app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

sio = socketio.AsyncServer(cors_allowed_origins='*', async_mode='asgi', transports=["websocket", "polling"])
socket_app = socketio.ASGIApp(sio, app)


@app.get("/ping")
def healthcheck():
    return "pong"

@app.get("/inventory")
def get_inventory():
    return inventory

@app.get("/socket-test")
async def socket_test():
    return FileResponse("static/index.html")

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
    # Convert inventory items to JSON-serializable format
    inventory_data = [{'id': product.id, 'name': product.name, 'quantity': product.quantity, 'last_updated': product.last_updated.isoformat()} for pid, product in inventory.items()]
    await sio.emit('inventory_update', inventory_data, room=sid)
    print(f"Client {sid} subscribed to inventory updates")

@sio.event
async def update_product(sid, data):
    """Handle product updates"""
    try:
        product_id = data.get('id')
        new_quantity = data.get('quantity')
        
        if not isinstance(new_quantity, int):
            await sio.emit('error', "Quantity must be an integer", room=sid)
            return
    
        if product_id in inventory:
            product = inventory[product_id]
            quantity_change = product.quantity + new_quantity

            if quantity_change <= 0:
                await sio.emit('error', "We do not have more units than those available.", room=sid)
                return

            product.quantity = product.quantity + new_quantity
            product.last_updated = datetime.now()
            # Send only the updated product
            product_data = {
                'id': product.id,
                'name': product.name,
                'quantity': product.quantity,
                'last_updated': product.last_updated.isoformat()
            }
            # Broadcast update to all connected clients
            await sio.emit('inventory_update', product_data)
            print(f"Product {product_id} updated by {sid}. Quantity changed by {quantity_change} units")
        else:
            await sio.emit('error', f"Product {product_id} not found", room=sid)
    except Exception as e:
        await sio.emit('error', str(e), room=sid)

app = socket_app
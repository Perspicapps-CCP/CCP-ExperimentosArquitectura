from . import schemas, models


def purchase_to_schema(purchase: models.Purchase) -> schemas.PurchaseResponse:
    return schemas.PurchaseResponse(
        id=purchase.id,
        user_id=purchase.user_id,
        address_id=purchase.address_id,
        total_amount=purchase.total_amount,
        status=purchase.status,
        created_at=purchase.created_at,
        updated_at=purchase.updated_at,
        delivery_order_id=purchase.delivery_order_id,
        items=[
            schemas.PurchaseItemResponse(
                id=item.id,
                product_id=item.product_id,
                quantity=item.quantity,
                price=item.price,
                created_at=item.created_at,
                updated_at=item.updated_at,
            )
            for item in purchase.items
        ],
    )

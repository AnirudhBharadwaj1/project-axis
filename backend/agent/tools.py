from langchain.tools import tool

# ///////////////////////////// TESTING TOOLS /////////////////////////////
@tool
def add(a: int, b: int) -> int:
    """
    Basic test to make sure the setup is working
    """
    return a + b
# ///////////////////////////// TESTING TOOLS /////////////////////////////

@tool
def search_products(query: str) -> list:
    """
    A list of products that can be recommended to users
    """
    # Fake data for now
    products = [
        {"id": 1, "name": "Trap Essentials Kit", "genre": "trap", "price": 30},
        {"id": 2, "name": "Boom Bap Drums", "genre": "boom bap", "price": 25},
        {"id": 3, "name": "Hyperpop FX Pack", "genre": "hyperpop", "price": 35},
        {"id": 4, "name": "808 Warfare Pack", "genre": "trap", "price": 40},
    ]

    q = query.lower()
    return [p for p in products if q in p["genre"] or q in p["name"].lower()]

@tool
def add_to_cart(product_id: str) -> str:
    """
    Add a product to the user's cart
    """
    return "The below product was added to your cart:\n", product_id

@tool
def navigate_to(product_id: str) -> str:
    """
    Navigate the user to a product's page so they can get more information
    """
    return f"/product/:{product_id}"
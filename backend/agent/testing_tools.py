# from langchain.tools import tool

# @tool
# def search_products(query: str) -> list:
#     """
#     Search for products in the store. If query is empty (""), the function returns all products
#     available in the store.
#     This mimics GET /products?search=<query>.
#     Use this tool whenever the user asks about:
#     - available products
#     - what products exist
#     - categories or genres
#     - "what do you have"
#     - "show me kits"
#     - "do you have ___"
#     Or something along these lines.

#     Product format:
#     id: This id should be kept internally and should NOT be given to the user.
#     name: The name of this product. These names are unique to each product.
#     genre: The music genres that suit this product.
#     price: The price in CAD of this product.
#     """
#     products = [
#         {"id": 1, "name": "Trap Essentials Kit", "genre": "trap", "price": 10},
#         {"id": 2, "name": "Boom Bap Drums", "genre": "boom bap", "price": 25},
#         {"id": 3, "name": "Hyperpop FX Pack", "genre": "hyperpop", "price": 5},
#         {"id": 4, "name": "808 Warfare Pack", "genre": "trap", "price": 40},
#     ]

#     q = query.lower().strip()

#     if q == "":
#         return products

#     return [p for p in products if q in p["genre"] or q in p["name"].lower()]

# # TODO: Change this to str when implementing with actual database values
# @tool
# def add_to_cart(product_id: int) -> str:
#     """
#     This method adds a product to the user's cart. product_id is the id of the product that should
#     be added to the user's cart.
#     Use this tool whenever the user expresses clear intent to purchase, add, buy, get, or put a
#     product in their cart.
#     """
#     # DO NOT call this unless the user has confirmed that they want to add the product to their cart
#     return f"Product {product_id} added to cart."

# # TODO: Change this to str when implementing with actual database values
# @tool
# def navigate_to(product_id: int) -> str:
#     """
#     Navigate the user to a product's page so they can get more information. product_id is the product
#     that will be showcased on the product page.
#      Use this tool whenever the user asks to:
#     - view a product
#     - see a product
#     - go to a product
#     - open a product page
#     - learn more about a product
#     - "take me to" a product
#     Or something along these lines.
#     """
#     # DO NOT call this unless the user has confirmed that they wish to be redirected (ex. to see more
#     # information about a product, etc.)
#     return f"/product/:{product_id}"
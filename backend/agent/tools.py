from langchain.tools import tool
import requests

@tool
def search_products(query: str, type: str) -> list:
    """
    Retrieve products from the store and optionally filter by genre or name.
    Parameters:
        - query: A genre/name filter. If empty (""), return all products from the given type.
        - type: One of "paid", "free", or "all". Use "paid" unless the user clearly asks for free kits.
        Note, the "all" type is just all "free" AND "paid" kits.

    Use this tool whenever the user asks about:
    - available products
    - what products exist
    - categories or genres
    - "what do you have"
    - "show me kits"
    - "do you have ___"
    Or something along these lines.
    The "type"

    This is the format for each product:
    id: This id should be kept internally and should NOT be given to the user.
    name: The name of this product. These names are unique to each product.
    description: The description written for this product.
    contents: The different sounds available in this product and the number of each
    tags: The types of services this product provides (ex. drum kit, fx kit, one shot kit, etc.)
    genres: The music genres that suit this product.
    price: The price in CAD of this product (you do not need to explicitly mention this to users unless they ask for the currency type).
    """
    # Get products
    res = requests.get("http://localhost:5000/getProducts", params={"type": type})

    # Check if http error occurred
    res.raise_for_status()

    # Get the products themselves
    products = res.json()

    # Get rid of unnecessary fields
    trimmed = []
    for p in products:
        {
            "id": p["id"],
            "name": p["name"],
            "description": p["desc"],
            "contents": p["includes"],
            "tags": p["tags"],
            "genres": p.get("genres", []),
            "price": p["price"]
        }

    q = query.lower().strip()
    if q == "":
        return trimmed
    
    lst = []
    for p in trimmed:
        # Check genre
        for genre in p.get("genres", []):
            if q in genre.lower():
                lst.append(p)
                continue

        # Check name
        if q in p["name"].lower():
            lst.append(p)
            continue

        # Check description
        if q in p["desc"].lower():
            lst.append(p)
            continue

    return lst

@tool
def add_to_cart(product_id: str) -> str:
    """
    This method adds a product to the user's cart. product_id is the id of the product that should
    be added to the user's cart.
    Use this tool whenever the user expresses clear intent to purchase, add, buy, get, or put a
    product in their cart.
    """
    # Call add to cart endpoint
    # res = requests.get("http://localhost:5000/addToCart", params={"product": product_id})

    # # Check for http error and return the message
    # res.raise_for_status()
    # return res.json().get("message", "added to cart.")
    return f"add-to-cart:{product_id}"

@tool
def navigate_to(product_id: str) -> str:
    """
    Navigate the user to a product's page so they can get more information. product_id is the product
    that will be showcased on the product page.
     Use this tool whenever the user asks to:
    - view a product
    - see a product
    - go to a product
    - open a product page
    - learn more about a product
    - "take me to" a product
    Or something along these lines.
    """
    # Call redirect endpoint
    # res = requests.get("http://localhost:5000/redirect", params={"product": product_id})

    # res.raise_for_status()
    # return res.json().get("url", f"/product/{product_id}")
    return f"redirect:{product_id}"
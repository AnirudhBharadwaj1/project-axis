from dotenv import load_dotenv
from langchain.agents import create_agent
from tools import *
import json

# Make the API key from the .env available for use here
load_dotenv()

# ///////////////////////////// TESTING /////////////////////////////
tools = [search_products, add_to_cart, navigate_to]

# prompt = "You are a friendly shopping assistant for an online music production store." \
# "Your job is to help users find products and encourage purchases without sounding pushy." \
# "Use the tools to search products, show product info, and add items to the cart whenever it helps." \
# "Make the process convenient and smooth."

prompt = (
    "You are a shopping assistant for an online music production store. "
    "When a user asks about store inventory, product availability, product lists, or asks to see items, "
    "you MUST call the tool `search_products`. Do not list or invent products yourself. "
    "Use the tool's output to form your answer. Be friendly and not pushy. "
    "Also, make the process convenient for the user, so recommend redirecting them to a product's page or "
    "adding the product to their cart but do NOT perform the action unless they confirm."
)

agent = create_agent(model="gpt-5-mini", tools=tools, system_prompt=prompt)

def run():
    # ///////////////////////////// TESTING /////////////////////////////

    # SEARCH_PRODUCTS: //////////////////////////////////////////
    # Test general product lookup
    result = agent.invoke(
        {"messages": [{"role": "user", "content": "What products are available on this website?"}]}
    )

    # Test query
    # result = agent.invoke(
    #     {"messages": [{"role": "user", "content": "I am looking for a trap drum kit with hard hitting sounds. I want the cheapest option. What would you recommend?"}]}
    # )

    # Test cluttered request
    # result = agent.invoke(
    #     {"messages": [{"role": "user", "content": "I'm working on a dark ambient track and need something gritty but subtle—anything in your catalog that might fit?"}]}
    # )

    # Test non-descriptive request
    # result = agent.invoke(
    #     {"messages": [{"role": "user", "content": "trap"}]}
    # )

    # REDIRECT: //////////////////////////////////////////////////
    # Test actual name
    # result = agent.invoke(
    #     {"messages": [{"role": "user", "content": "Sure, can you take me to the Trap Essentials Kit?"}]}
    # )

    # Test wrong name
    # result = agent.invoke(
    #     {"messages": [{"role": "user", "content": "Can you take me to the Conch Drum Kit?"}]}
    # )

    # Test getting product and then redirect
    # result = agent.invoke(
    #     {"messages": [{"role": "user", "content": "Sure, can you take me to the cheapest trap drum kit on the website?"}]}
    # )

    # Test invalid price request
    # result = agent.invoke(
    #     {"messages": [{"role": "user", "content": "Take me to the kit that costs $7"}]}
    # )

    # Test ambiguous request
    # result = agent.invoke(
    #     {"messages": [{"role": "user", "content": "Take me to that kit"}]}
    # )

    # ADD TO CART: /////////////////////////////////////////////////
    # Test basic adding to cart
    # result = agent.invoke(
    #     {"messages": [{"role": "user", "content": "Can you add the Trap Essentials Kit to my cart?"}]}
    # )

    # Test item does not exist in store
    # result = agent.invoke(
    #     {"messages": [{"role": "user", "content": "Add the drill drum kit to my cart"}]}
    # )

    # MULTI: ///////////////////////////////////////////////////////
    # Test search, add, redirect to page
    # ///////////////////////////// TESTING /////////////////////////////

    # DEBUG DUMP
    print(json.dumps(result, indent=2, default=str))
    print("\n--------------------------------------------------------------------------------\n")
    for message in result["messages"]:
        if message.role == "user":
            print("User: ", message.content)
        else:
            print("Chatbot: ", message.content)


if __name__ == "__main__":
    run()
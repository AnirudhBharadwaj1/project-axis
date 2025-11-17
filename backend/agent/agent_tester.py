from dotenv import load_dotenv
from langchain.agents import create_agent
from tools import *
import json

# Make the API key from the .env available for use here
load_dotenv()

# ///////////////////////////// TESTING /////////////////////////////
tools = [search_products, add_to_cart, navigate_to]

prompt = (
    "You are a shopping assistant for an online music production store." \
    "Rules:"\
    "1. If the user asks about products, availability, inventory, genres, or 'what do you have,', you MUST call the 'search_products' tool. Never list or invent products yourself." \
    "2. Use tool results when answering. Never expose the product IDs to the user." \
    "3. When the user shows interest in a product, you may suggest redirecting them to its product page or adding it to their cart, but do NOT call those tools until they explicitly confirm." \
    "4. If the user's request is ambiguous, ask for clarification instead of acting." \
    "5. When a redirect *is* confirmed and you call the tool, speak as if the redirect has already been completed." \
    "6. Keep responses concise as they will be shown in a small UI" \
    "7. When interpreting product-related queries, first check the product catalog to see if an exact product exists. If it does not, treat the user's request as referring to a category, type, or genre rather than a specific product name."
    "8. If what the user is looking for does not exist in the store, do not recommend things that are not in the store but rather just suggest related items or in the worst case, apologize and say that what they are looking for is not available here."
)

agent = create_agent(model="gpt-5-mini", tools=tools, system_prompt=prompt)

def run():
    # ///////////////////////////// TESTING /////////////////////////////

    # SEARCH_PRODUCTS: //////////////////////////////////////////
    # Test general product lookup
    # result = agent.invoke(
    #     {"messages": [{"role": "user", "content": "What products are available on this website?"}]}
    # )

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

    # Test getting product and then redirect (assertive)
    # result = agent.invoke(
    #     {"messages": [{"role": "user", "content": "Take me to the page for the cheapest trap drum kit on the website."}]}
    # )

    # Test getting product and then redirect (questioning)
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
    # Test search and redirect to page
    history = [{"role": "user", "content": "What is the cheapest drum kit on the website?"}]
    result = agent.invoke({"messages": history})
    
    history.append({"role": "user", "content": "Yes, redirect me to that page please."})
    result = agent.invoke({"messages": history})

    # Test search and add to cart (questioning)
    # history = [{"role": "user", "content": "What is the cheapest drum kit on the website?"}]
    # result = agent.invoke({"messages": history})
    
    # history.append({"role": "user", "content": "Can you add the kit to my cart?"})
    # result = agent.invoke({"messages": history})

    # Test search and add to cart (assertive)
    # history = [{"role": "user", "content": "What is the cheapest drum kit on the website?"}]
    # result = agent.invoke({"messages": history})
    
    # history.append({"role": "user", "content": "Add the kit to my cart."})
    # result = agent.invoke({"messages": history})

    # ///////////////////////////// TESTING /////////////////////////////

    # DEBUG DUMP
    print(json.dumps(result, indent=2, default=str))
    print("\n--------------------------------------------------------------------------------\n")
    for message in result["messages"]:
        if message.type == "human":
            print("User: ", message.content)
        elif message.type == "ai":
            print("Chatbot: ", message.content)
        else:
            print("Internal: ", message.content)


if __name__ == "__main__":
    run()
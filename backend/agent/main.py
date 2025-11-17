from dotenv import load_dotenv
from flask import Flask, request, jsonify
from langchain.agents import create_agent
from tools import *
import json

# Make the API key from the .env available for use here
load_dotenv()

app = Flask(__name__)

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

@app.post("/invoke")
def invoke():
    """
    Accept messages from server.js and return agent output
    """
    # Get the messages from the frontend
    data = request.get_json()
    if not data or "messages" not in data:
        return jsonify({"error": "Request must contain 'messages'"}, 400)
    
    messages = data["messages"]

    # Put the messages in the format that LangChain agent can understand
    cleaned = []
    for msg in messages:
        cleaned.append({ 
            "role": "user" if msg["sender"] == "user" else "assistant",
            "content": msg["text"]
        })

    result = agent.invoke({"messages": cleaned})

    return jsonify({
        "message": result["messages"][-1].content
    })

if __name__ == "__main__":
    app.run(port=7000)
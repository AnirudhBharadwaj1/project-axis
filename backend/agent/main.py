import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain.agents import initialize_agent, AgentType
from tools import *

# Make the API key from the .env available for use here
load_dotenv()

# LangChain wrapper for OpenAI model
llm = ChatOpenAI(model="gpt-5-mini")

# ///////////////////////////// TESTING /////////////////////////////
agent = initialize_agent(
    tools = [add],
    llm = llm,
    agent = AgentType.OPENAI_FUNCTIONS,
    verbose = True,
)
# ///////////////////////////// TESTING /////////////////////////////

# Create the agent with the ability to call the functions in tools.py
# tools: List of functions from tools.py that should be considered by AI
# agent: The type of functions applicable (use OPENAI_FUNCTIONS since we use OpenAI)
# verbose: Send what the AI is thinking at each step
# agent = initialize_agent(
#     tools = [search_products, add_to_cart, navigate_to],
#     llm = llm,
#     agent = AgentType.OPENAI_FUNCTIONS,
#     verbose = True,
# )

def run():
    # ///////////////////////////// TESTING /////////////////////////////
    result = agent.run("Add 5 and 7.")
    print(result)
    # ///////////////////////////// TESTING /////////////////////////////

    # result = agent.run("I am looking for a trap drum kit with good punch.")
    # print(result)

if __name__ == "__main__":
    run()
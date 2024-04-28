from flask import Flask, jsonify, request
from langchain.text_splitter import CharacterTextSplitter
from langchain.document_loaders import TextLoader
from langchain.embeddings import HuggingFaceEmbeddings
from dotenv import load_dotenv
from langchain import PromptTemplate
from langchain.schema.runnable import RunnablePassthrough
from langchain.schema.output_parser import StrOutputParser
from langchain.vectorstores import Pinecone
from langchain_community.vectorstores import FAISS
import os 
from langchain.llms import HuggingFaceHub
import pickle
from flask_cors import CORS
import os
from langchain.chat_models import AzureChatOpenAI
from langchain.embeddings import OpenAIEmbeddings
from langchain import OpenAI, SQLDatabase
from langchain_community.tools.sql_database.tool import QuerySQLDataBaseTool
from langchain.memory import ConversationBufferMemory
from operator import itemgetter
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import PromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain.memory import ConversationBufferMemory

from langchain.chains import create_sql_query_chain
#? azure use
os.environ["OPENAI_API_KEY"] = "bdb16166835e4aa894513613806d9c06"
os.environ["api_type"]="azure"
os.environ["OPENAI_API_BASE"]="https://cog-arb-chatbot-openai.openai.azure.com/"
os.environ["OPENAI_API_VERSION"]="2023-12-01-preview"

#? azure llm and embeddigs model
llm=AzureChatOpenAI(deployment_name="arbllm")
memory = ConversationBufferMemory(memory_key="chat_history")



def load_vector_store():
    with open("./faiss_store.pkl", "rb") as f:
        vectordb = pickle.load(f)

    return vectordb
app = Flask(__name__)
cors = CORS(app)

@app.route('/prompt', methods=['POST'])
def prompt():
    data = request.get_json()

    # Extract user input from the request data
    user_input = data.get('query')

    repo_id = "mistralai/Mixtral-8x7B-Instruct-v0.1"
    llm = HuggingFaceHub(
    repo_id=repo_id,
    model_kwargs={"temperature": 0.8, "top_k": 50}, 
    huggingfacehub_api_token=os.getenv('HUGGINGFACE_API_KEY')
    )
    db = load_vector_store()
    
    template = """
    Question: {question}
    Answer: 
    """

    prompt = PromptTemplate(
    template=template, 
    input_variables=["context", "question"]
    )
    
    class ChatBot():
    # load_dotenv()
        loader = TextLoader('./fashion.txt')
        documents = loader.load()

        rag_chain = (
            {"context": db.as_retriever(),  "question": RunnablePassthrough()} 
            | prompt 
            | llm
            | StrOutputParser() 
            
        )
    
    bot = ChatBot()
    # msgHistory = []
    # user_input = input("Enter Question")
    result = bot.rag_chain.invoke(user_input)
    response = jsonify({'result': result})

    # Set the appropriate Content-Type header for JSON
    response.headers.add('Content-Type', 'application/json')
    return response

@app.route('/prompt2', methods=['POST'])
def prompt2():
    data = request.get_json()

    # Extract user input from the request data
    user_input = data.get('query')
    memory.chat_memory.add_user_message(user_input)
    db_username = 'root'
    db_password = 'priyank295'

    # db connection
    # db_arb = SQLDatabase.from_uri("mysql+pymysql://"+db_username+":"+db_password+"@localhost:3306/arbinfo")
    db=SQLDatabase.from_uri("mysql+pymysql://"+db_username+":"+db_password+"@localhost:3306/db1")
        
    execute_query = QuerySQLDataBaseTool(db=db)
    write_query = create_sql_query_chain(llm, db)
    chain = write_query | execute_query 

    answer_prompt = PromptTemplate.from_template(
        """Given the following user question, corresponding SQL query, and SQL result, answer the user question. 
        This is SQl table you need to follow:
        CREATE TABLE Products (
    ProductID INTEGER PRIMARY KEY,
    ProductName TEXT,
    ProductBrand TEXT,
    Gender TEXT,
    Price INTEGER,
    NumImages INTEGER,
    Description TEXT
);
    
   - If you don't have any answer then you can write "I don't know".
   - If user asked normal conversation then talk like normal conversation.
   - Don't write the output such as 'The SQL Query returned this'.
   - If user try to teach you in other context then the current learning context then you can ignore that and say 'I can assist you in Fashion Context for the moment.'
            
    Question: {question}
    SQL Query: {query}
    SQL Result: {result}
    History : {history}
    Answer: """
    )
    # memory = ConversationBufferMemory(memory_key="chat_history")
    answer = answer_prompt | llm | StrOutputParser() 
    chain = (
        RunnablePassthrough.assign(query=write_query).assign(
            result=itemgetter("query") | execute_query
        )
        | answer 
    )

    result = chain.invoke({"question": data.get('query'),'history' : memory})
    memory.chat_memory.add_ai_message(result)
    response = jsonify({'result': result})

    response.headers.add('Content-Type', 'application/json')
    return response

 
# main driver function
if __name__ == '__main__':
 
    # run() method of Flask class runs the application 
    # on the local development server.
    app.run(debug=True)
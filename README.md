
# E-Commerce Bot


In the era of online shopping, providing users with personalized and efficient shopping assistance is crucial for enhancing user experience and driving sales. Our project, the E-Commerce Bot, leverages cutting-edge machine learning techniques, specifically utilizing RAG (Retrieval-Augmented Generation) for intelligent conversational interactions in the realm of online shopping.

## Objective:
The primary objective of our E-Commerce Bot is to assist users in making informed purchasing decisions by offering product recommendations, comparisons, and general guidance within the online shopping environment. By harnessing the power of RAG, the bot can understand user queries, retrieve relevant information from an embedded dataset, and provide tailored responses.

## Methodology:

Dataset Embedding: Initially, we embed our curated e-commerce dataset using advanced natural language processing (NLP) techniques. This involves converting textual product descriptions, specifications, and other metadata into meaningful vector representations.

![flow](https://i.ibb.co/P4JrxgW/flow.png)

Vector Storage: The embedded dataset is stored as vectors in a retrieval-friendly format. Each product or piece of information in the dataset is represented as a vector, enabling efficient similarity calculations during user interactions.

RAG Architecture: RAG, a state-of-the-art model, is employed to handle user queries and responses. RAG combines retrieval-based methods with language generation, allowing the bot to retrieve relevant information from the embedded dataset and generate human-like responses.


## Key Features:

Product Recommendations: The bot offers personalized product recommendations based on user preferences, historical data, and current trends.

Product Comparison: Users can request comparisons between multiple products based on various attributes (e.g., price, specifications) to make well-informed choices.

Query Understanding: Through advanced NLP, the bot comprehends complex user queries, including synonyms, context, and intent, to provide accurate and relevant responses.
Interactive Conversations: The bot engages users in natural conversations, guiding them through the shopping process, answering questions, and addressing concerns.

## User Interaction:
Users interact with the E-Commerce Bot through a user-friendly interface, such as a chat widget on an online shopping website or a dedicated messaging platform. The bot can understand both text and voice inputs, making it accessible and convenient for all users.



## API Reference

#### HuggingFace API

```http
  GET /api/HuggingFace
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### OpenAI API

```http
  GET /api/OpenAI
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |



## Installation

Install project with pip

```bash
  pip install -r requirement.txt
  pip install langchain-experimental
```
Run Flask server 
```bash
 python main.py
```
Run React server
```bash
 npm install 
 npm start
```

## Screenshots

![App ](https://i.ibb.co/T1VLhtD/design.jpg)

![App Screenshot](https://i.ibb.co/2cS0GD2/Screenshot-2024-04-21-at-9-07-04-AM.png)


![App Screenshot](https://i.ibb.co/PDJBNJQ/Screenshot-2024-04-21-at-9-08Screenshot-54-AM.png)




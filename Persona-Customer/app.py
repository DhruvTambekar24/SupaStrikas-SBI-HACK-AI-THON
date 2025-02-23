# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import faiss
# import numpy as np
# import joblib
# import torch
# from transformers import BertTokenizer, BertModel
# from config import FAISS_INDEX_PATH, EMBEDDINGS_PATH, DEBUG, HOST, PORT

# app = Flask(__name__)
# CORS(app)

# # Load Pretrained Models & FAISS Index
# tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")
# model = BertModel.from_pretrained("bert-base-uncased")
# index = faiss.read_index(FAISS_INDEX_PATH)
# customer_data = joblib.load(EMBEDDINGS_PATH)

# def generate_embedding(text):
#     """Generate customer persona embedding from input text"""
#     inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True)
#     with torch.no_grad():
#         outputs = model(**inputs)
#     return outputs.last_hidden_state.mean(dim=1).numpy()

# # @app.route("/get_persona", methods=["POST"])
# # def get_persona():
# #     """Retrieve most similar customer personas"""
# #     data = request.json
# #     text = data.get("description")

# #     # Convert input text to vector
# #     query_vector = generate_embedding(text)

# #     # Search FAISS for closest personas
# #     distances, indices = index.search(np.array([query_vector]), k=3)

# #     # Return similar customer profiles
# #     results = customer_data.iloc[indices[0]].to_dict(orient="records")
# #     return jsonify(results)
# @app.route("/get_persona", methods=["POST"])
# def get_persona():
#     """Retrieve most similar customer personas"""
#     data = request.json
#     print(data)
#     text = data.get("description")

#     # Convert input text to vector
#     query_vector = generate_embedding(text).flatten().reshape(1, -1)  # Ensure correct shape (1, 768)

#     # Debugging: Print query vector shape before FAISS search
#     print("Query Vector Shape:", query_vector.shape)  # Should be (1, 768)

#     # Search FAISS for closest personas
#     distances, indices = index.search(query_vector, k=3)

#     # Return similar customer profiles
#     results = customer_data.iloc[indices[0]].to_dict(orient="records")
#     return jsonify(results)

# if __name__ == "__main__":
#     app.run(host=HOST, port=PORT, debug=DEBUG)
import os

# Fix OpenMP multiple instances issue
os.environ["KMP_DUPLICATE_LIB_OK"] = "TRUE"

from flask import Flask, request, jsonify
from flask_cors import CORS
import faiss
import numpy as np
import joblib
import torch
from transformers import BertTokenizer, BertModel
from config import FAISS_INDEX_PATH, EMBEDDINGS_PATH, DEBUG, HOST, PORT

app = Flask(__name__)
CORS(app)

# Load Pretrained Models & FAISS Index
tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")
model = BertModel.from_pretrained("bert-base-uncased")
index = faiss.read_index(FAISS_INDEX_PATH)
customer_data = joblib.load(EMBEDDINGS_PATH)

def generate_embedding(text):
    """Generate customer persona embedding from input text"""
    inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True)
    with torch.no_grad():
        outputs = model(**inputs)
    return outputs.last_hidden_state.mean(dim=1).numpy()

# @app.route("/get_persona", methods=["POST"])
# def get_persona():
#     """Retrieve most similar customer personas"""
#     data = request.json
#     print(data)  # Debugging: Print incoming request

#     text = data.get("description")
#     query_vector = generate_embedding(text).flatten().reshape(1, -1)  # Ensure correct shape

#     # Debugging: Print query vector shape
#     print("Query Vector Shape:", query_vector.shape)

#     distances, indices = index.search(query_vector, k=3)
#     results = customer_data.iloc[indices[0]].to_dict(orient="records")
#     return jsonify(results)
import numpy as np

@app.route("/get_persona", methods=["POST"])
def get_persona():
    """Retrieve most similar customer personas"""
    data = request.json
    print(data)  # Debugging: Print incoming request

    text = data.get("description")
    query_vector = generate_embedding(text).flatten().reshape(1, -1)  # Ensure correct shape

    # Debugging: Print query vector shape
    print("Query Vector Shape:", query_vector.shape)

    distances, indices = index.search(query_vector, k=3)

    # Convert results to a JSON serializable format
    results = customer_data.iloc[indices[0]].to_dict(orient="records")

    # Convert NumPy float32 values to Python float
    for result in results:
        for key, value in result.items():
            if isinstance(value, np.ndarray):  # If value is an ndarray, convert to list
                result[key] = value.tolist()
            elif isinstance(value, np.float32):  # If value is a NumPy float, convert to Python float
                result[key] = float(value)

    return jsonify(results)

if __name__ == "__main__":
    app.run(host=HOST, port=5003, debug=DEBUG)

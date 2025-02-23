from flask import Flask, request, jsonify
from flask_cors import CORS
import faiss
import numpy as np
import joblib
from transformers import BertTokenizer, BertModel

app = Flask(__name__)
CORS(app)

# Load pre-trained models & FAISS index
tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")
model = BertModel.from_pretrained("bert-base-uncased")
index = faiss.read_index("../data/persona_index.faiss")
customer_data = joblib.load("../data/persona_embeddings.pkl")

def generate_embedding(text):
    """Generate customer persona embedding from input text"""
    inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True)
    with torch.no_grad():
        outputs = model(**inputs)
    return outputs.last_hidden_state.mean(dim=1).numpy()

@app.route("/get_persona", methods=["POST"])
def get_persona():
    """Retrieve most similar customer persona"""
    data = request.json
    text = data.get("description")

    # Convert input text to vector
    query_vector = generate_embedding(text)

    # Search for similar personas
    distances, indices = index.search(np.array([query_vector]), k=3)

    # Return similar customer profiles
    results = customer_data.iloc[indices[0]].to_dict(orient="records")
    return jsonify(results)

if __name__ == "__main__":
    app.run(debug=True)

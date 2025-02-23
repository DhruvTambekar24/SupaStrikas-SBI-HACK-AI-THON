from transformers import BertTokenizer, BertModel
import torch
import pandas as pd
import joblib

# Load BERT tokenizer & model
tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")
model = BertModel.from_pretrained("bert-base-uncased")

def generate_persona_embedding(text):
    """Generate customer persona vector from text input"""
    inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True)
    with torch.no_grad():
        outputs = model(**inputs)
    embedding = outputs.last_hidden_state.mean(dim=1)  # Convert to 768-dim vector
    return embedding.numpy()

# Load customer dataset
df = pd.read_csv("../data/customer_data.csv")

# # Generate persona embeddings for each customer
# df["persona_vector"] = df["Description"].apply(generate_persona_embedding)
df["Persona_Vector"] = df["Description"].apply(generate_persona_embedding)  # Ensure correct column name

# Convert embeddings to a NumPy array before saving
df["Persona_Vector"] = df["Persona_Vector"].apply(lambda x: x.flatten())  

# Save updated DataFrame with embeddings
joblib.dump(df, "../data/persona_embeddings.pkl")

print("✅ Persona embeddings saved!")

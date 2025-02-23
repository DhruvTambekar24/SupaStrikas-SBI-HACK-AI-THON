# import pandas as pd
# import numpy as np
# import joblib
# import faiss
# from transformers import BertTokenizer, BertModel
# import torch

# # Load customer data
# df = pd.read_csv(r"C:\Users\dtamb\OneDrive\Desktop\SBI HACK AI THO\PersonaXAi\backend\data\customer_data.csv")

# # Initialize BERT tokenizer and model
# tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")
# model = BertModel.from_pretrained("bert-base-uncased")

# def generate_embedding(text):
#     """Generate customer persona vector from text input."""
#     inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True)
#     with torch.no_grad():
#         outputs = model(**inputs)
#     return outputs.last_hidden_state.mean(dim=1).numpy()

# # Generate persona embeddings
# df["Persona_Vector"] = df["Description"].apply(generate_embedding)

# # Save persona embeddings as a pickle file
# joblib.dump(df, "persona_embeddings.pkl")

# # Store persona embeddings in FAISS for fast retrieval
# dimension = 768  # BERT embedding size
# index = faiss.IndexFlatL2(dimension)

# # Convert embeddings to NumPy array
# vectors = np.stack(df["Persona_Vector"].values)

# # Add embeddings to FAISS index
# index.add(vectors)

# # Save FAISS index
# faiss.write_index(index, "persona_index.faiss")

# print("✅ Persona embeddings and FAISS index saved successfully!")

import pandas as pd
import numpy as np
import joblib
import faiss
from transformers import BertTokenizer, BertModel
import torch

# Load customer data
df = pd.read_csv(r"C:\Users\dtamb\OneDrive\Desktop\SBI HACK AI THO\PersonaXAi\backend\data\customer_data.csv")

# Initialize BERT tokenizer and model
tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")
model = BertModel.from_pretrained("bert-base-uncased")

def generate_embedding(text):
    """Generate customer persona vector from text input."""
    inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True)
    with torch.no_grad():
        outputs = model(**inputs)
    return outputs.last_hidden_state.mean(dim=1).numpy().flatten()  # Flatten to 1D array

# Generate persona embeddings
df["Persona_Vector"] = df["Description"].apply(generate_embedding)

# Save persona embeddings as a pickle file
joblib.dump(df, "persona_embeddings.pkl")

# Store persona embeddings in FAISS for fast retrieval
dimension = 768  # BERT embedding size
index = faiss.IndexFlatL2(dimension)

# Convert list of arrays to 2D NumPy array
vectors = np.vstack(df["Persona_Vector"].values).astype(np.float32)  # Ensure (num_samples, 768)

# Debugging: Print vector shape
print("Vector Shape:", vectors.shape)  # Should be (num_samples, 768)

# Add embeddings to FAISS index
index.add(vectors)

# Save FAISS index
faiss.write_index(index, "persona_index.faiss")

print("✅ Persona embeddings and FAISS index saved successfully!")


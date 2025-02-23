# import faiss
# import numpy as np
# import joblib

# # Load persona embeddings
# df = joblib.load("../data/persona_embeddings.pkl")

# # Create FAISS index
# dimension = 768  # BERT embedding size
# index = faiss.IndexFlatL2(dimension)

# # Convert embeddings to NumPy array
# vectors = np.stack(df["persona_vector"].values)

# # Add embeddings to FAISS index
# index.add(vectors)

# # Save FAISS index
# faiss.write_index(index, "../data/persona_index.faiss")
# print("✅ Persona vectors stored successfully!")
import faiss
import numpy as np
import joblib

# Load persona embeddings
df = joblib.load("../data/persona_embeddings.pkl")

# Create FAISS index
dimension = 768  # BERT embedding size
index = faiss.IndexFlatL2(dimension)

# Convert embeddings to NumPy array
vectors = np.vstack(df["Persona_Vector"].values).astype(np.float32)  # Ensure (num_samples, 768)
vectors = vectors.reshape(vectors.shape[0], -1)  # Flatten if needed

# Debugging: Print vector shape
print("Vector Shape After Reshape:", vectors.shape)  # Should be (num_samples, 768)

# Add embeddings to FAISS index
index.add(vectors)

# Save FAISS index
faiss.write_index(index, "../data/persona_index.faiss")

print("✅ Persona vectors stored successfully!")

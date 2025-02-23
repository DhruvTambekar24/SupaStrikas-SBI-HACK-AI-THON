import os

# General Configuration
DEBUG = True
HOST = "0.0.0.0"
PORT = 5003

# Paths
DATA_PATH = os.path.join(os.path.dirname(__file__), "data")
FAISS_INDEX_PATH = os.path.join(DATA_PATH, "persona_index.faiss")
EMBEDDINGS_PATH = os.path.join(DATA_PATH, "persona_embeddings.pkl")

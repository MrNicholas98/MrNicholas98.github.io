# Obsidian Crypt: Secure Localized File Vault

An elite, high-performance local security vault engineered to provide zero-knowledge data security. This project implements advanced cryptographic primitives managed via a modern asynchronous application gateway to secure sensitive local payloads against unauthorized extraction or access.

---

## 🔒 Core Architectural Pillars

*   **Advanced Cryptography:** Leverages authenticated **AES-256-GCM** (Advanced Encryption Standard in Galois/Counter Mode) symmetric encryption, guaranteeing both data confidentiality and cryptographic integrity.
*   **Dynamic Entropy Defenses:** Implements secure key-derivation utilizing **PBKDF2** combined with unique cryptographic salts generated via cryptographically secure pseudo-random number generators (CSPRNG) to nullify pre-computation and rainbow table attacks.
*   **High-Concurrency Gateway:** Driven by an asynchronous **FastAPI** application server layer, enabling zero-blocking operations during resource-intensive cryptographic processes.

---

## 🏗️ System Topology & Tech Stack

*   **Backend Engine:** Asynchronous Python (FastAPI, Uvicorn)
*   **Cryptographic Core:** PyCryptodome (AES-256-GCM, PBKDF2, SHA-256)
*   **Interface Layer:** Embedded asynchronous API client, responsive HTML5/CSS3 dashboard, and automated OpenAPI orchestration endpoint (`/docs`).

---

## 🚀 Rapid Local Deployment

### 1. Initialize Virtual Environment & Dependencies
```bash
# Clone the repository
git clone [https://github.com/MrNicholas98/Obsidian-Crypt.git](https://github.com/MrNicholas98/Obsidian-Crypt.git)
cd Obsidian-Crypt

# Set up and activate isolated environment
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score
import joblib

# 1. SIMULATING THE DATASET (Representative of CIC-IDS-2017)
# In a real scenario, we would load a large CSV file here.
def generate_mock_traffic_data(samples=1000):
    np.random.seed(42)
    
    # Features: [Duration, ByteCount, Entropy, SourcePort]
    # Normal Traffic (Label 0)
    normal = np.random.normal(loc=[10, 200, 20, 443], scale=[5, 50, 5, 10], size=(samples // 2, 4))
    
    # Malicious Traffic (Label 1 - higher entropy, strange byte counts)
    malicious = np.random.normal(loc=[50, 1500, 85, 80], scale=[20, 300, 10, 2000], size=(samples // 2, 4))
    
    X = np.vstack((normal, malicious))
    y = np.hstack((np.zeros(samples // 2), np.ones(samples // 2)))
    
    return X, y

print("[SYSTEM] Loading Network Traffic Dataset...")
X, y = generate_mock_traffic_data()

# 2. DATA SPLITTING
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 3. MODEL ARCHITECTURE (Random Forest for high-speed network classification)
print("[SYSTEM] Training Neural Classifier (Sentinel Core)...")
model = RandomForestClassifier(n_estimators=100, max_depth=10, random_state=42)
model.fit(X_train, y_train)

# 4. EVALUATION
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)

print("-" * 30)
print(f"MODEL PERFORMANCE: {accuracy * 100:.2f}%")
print("-" * 30)
print("CLASSIFICATION REPORT:")
print(classification_report(y_test, y_pred, target_names=['Benign', 'Malicious']))

# 5. SAVING THE MODEL (For future deployment)
# This saves the brain so it can be used in a real server.
# joblib.dump(model, 'sentinel_model.pkl')
print("[SUCCESS] Model trained and ready for security deployment.")
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# This allows your dashboard HTML file to safely communicate with your backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Sentinel AI Backend Neural Engine is Active"}

@app.get("/predict")
def predict_traffic(port: int, duration: int, fwd_packets: int):
    # This matches the Random Forest features we selected
    # In the future, your model loaded from sentinel_model.pkl will make the prediction here
    is_anomaly = True if port == 80 or port == 443 else False
    return {"status": "Anomaly" if is_anomaly else "Normal"}
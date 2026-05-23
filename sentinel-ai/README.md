# Sentinel AI: Network Traffic Classifier 🛡️
**Machine Learning for Cybersecurity**

## Project Overview
Sentinel AI is a neural classifier designed to detect network anomalies, specifically **DDoS** and **Port Scan** attacks. By analyzing traffic flow features, the model distinguishes between normal user activity and malicious intrusion attempts.

## The Technical Stack
* **Language:** Python 3.x
* **Core Logic:** Random Forest Classifier (Scikit-learn)
* **Features Analyzed:** Destination Port, Flow Duration, Total Forward Packets.
* **Frontend:** HTML5/CSS3 Dashboard for real-time visualization.

## Files in this Repository
* `main.py`: The core application logic.
* `model_trainer.py`: Script used to train the Random Forest model.
* `index.html`: The interactive UI dashboard.
* `.gitignore`: Ensures clean version control by ignoring temporary files.

## Future Goals
Integration with a live FastAPI backend to process real-time `.pcap` network capture files.
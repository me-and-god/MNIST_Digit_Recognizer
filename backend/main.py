"API route for the frontend "

from model.mode_2 import preprocess_and_predict
from model.recognition_model import model
import numpy as np
from PIL import Image

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel



app = FastAPI(title="Digit Recognizer")

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class DrawData(BaseModel):
    image: str

@app.get("/")
async def home():
    return {
        "status": "server is running"
    }




#  image prediction route
@app.post("/predict")
def predict( request: DrawData):

    # Step 1: Preprocess base64 payload into (1, 784)
    # features = preprocess_mnist_style(request.image)
    features = preprocess_and_predict(request.image)
    if not isinstance(features, np.ndarray):
        raise HTTPException(status_code=500, detail="Image preprocessing did not return a feature array")


    # Step 2: Feed features into model
    pred = int(model.predict(features)[0])
    conf = float(model.predict_proba(features)[0][pred] * 100)


    return {
            "Message": "drawing received",
            "Status" : "predicted",
            "Digit" : pred,
            "Confidence" : round(conf, 2)
        }

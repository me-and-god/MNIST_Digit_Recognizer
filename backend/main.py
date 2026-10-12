"API route for the frontend "

import base64
import binascii
from io import BytesIO
from PIL import Image

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel



app = FastAPI(title="Digit Recognizer")


class DrawData(BaseModel):
    image: str

@app.get("/")
def home():
    return {
        "status": "server is running"
    }


@app.post("/predict")
def predict( request: DrawData):

    try:
        #separate the Base64 acontent from the data URL 
        header, encoded = request.image.split(",",1)

        if header != "data:image/png;base64":
            raise HTTPException(
                status_code=400,
                detail="Expected a PNG data URL"
            )

        #decode Base64 into image bytes 
        image_bytes = base64.b64decode(
            encoded,
            validate=True
        )


        # convert image bytes  into a PIL image
        image = Image.open(
            BytesIO(image_bytes)
        ).convert("RGB")


    except HTTPException:
        raise

    except (
        ValueError,
        binascii.Error,
        OSError
    ):

        raise HTTPException(
            status_code=400,
            detail=" invalid drawing image"
        )




    return {
        "message": "drawing received",
        "width": image.width,
        "height": image.height
    }
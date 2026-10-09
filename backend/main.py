"API route for the frontend "

from fastapi import FastAPI


app = FastAPI(title="Digit Recognizer")


@app.get("/")
def home():
    return {
        "status": "server is running"
    }



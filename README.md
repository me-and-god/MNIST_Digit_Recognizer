# MNIST Digit Recognizer 🔢

A machine learning web application that recognizes handwritten digits in real time. This project connects a Python/FastAPI machine learning backend with a modern Next.js frontend. 

Hope you find it amazing and enjoy exploring the learning process! 😊

---

## 🛠️ Tech Stack

* **Frontend:** Next.js, TypeScript, Tailwind CSS
* **Backend:** Python, FastAPI, Uvicorn
* **Machine Learning:** MNIST Dataset

---

## 🚀 Live Demo

* [View Demo](https://mnistdigitrecognizer-4zm6mr6gv-me-and-myself15.vercel.app/)

---

## 💻 Local Setup & Installation

Follow these steps to get the project up and running on your local machine after cloning the repository.

### 1. Backend Setup

Open your terminal and navigate to the backend directory:

```bash
cd backend
```

Create a Python virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment:
* **Windows:** `venv\Scripts\activate`
* **macOS/Linux:** `source venv/bin/activate`

Install the required dependencies:

```bash
pip install -r requirements.txt
```

Start the FastAPI server using Uvicorn:

```bash
uvicorn main:app --reload
```

### 2. Frontend Setup

Open a **new terminal window** and navigate to the frontend directory:

```bash
cd frontend
```

Install the Node dependencies (if you haven't already):

```bash
npm install
```

Run the Next.js development server:

```bash
npm run dev
```

---

## 🧪 Testing the App

Once both the backend and frontend servers are running, open your browser and navigate to:

👉 **[http://localhost:3000/](http://localhost:3000/)**

Draw a digit on the canvas and test out the model! 😎

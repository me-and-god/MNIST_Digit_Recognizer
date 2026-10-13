"This is the file where the machine learning model for digit recognition belongs"

import matplotlib.pyplot as plt
import numpy as np
from sklearn.datasets import fetch_openml
from sklearn.linear_model import SGDClassifier
from sklearn.metrics import ConfusionMatrixDisplay, classification_report
from sklearn.model_selection import cross_val_predict, cross_val_score
from sklearn.preprocessing import StandardScaler


def load_and_preprocess_data():
    mnist = fetch_openml("mnist_784", as_frame=False)
    X, y = mnist.data, mnist.target

    # Splitting the First 60,000 for training and the remaining 10,000 for testing
    X_train, X_test = X[:60000], X[60000:]
    y_train, y_test = y[:60000], y[60000:]

    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    return X_train_scaled, X_test_scaled, y_train, y_test


def build_and_evaluate_engine(X_train, X_test, y_train, y_test):
    model = SGDClassifier(max_iter=1000, tol=1e-3, random_state=42)

    # Cross-validation on training data to measure generalization before touching test set
    cv_scores = cross_val_score(model, X_train, y_train, cv=3, scoring="accuracy")
    print(f"CV Accuracy across folds: {cv_scores.round(4)}")
    print(f"Mean CV Accuracy: {cv_scores.mean():.4f}")

    # Fitting model on the full training set
    model.fit(X_train, y_train)

    # Evaluating on the held-out test set
    y_test_pred = model.predict(X_test)

    print("\n--- Test Set Performance ---")
    print(classification_report(y_test, y_test_pred, target_names=[str(i) for i in range(10)]))

    return model, y_test_pred

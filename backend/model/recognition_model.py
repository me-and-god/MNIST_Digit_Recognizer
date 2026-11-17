
"""This file contains the prediction model trained on the MNIST dataset and then the function to 
    predict the custom image
"""
# from pathlib import Path
# import joblib

# import numpy as np
# from PIL import Image
# from sklearn.datasets import fetch_openml
# from sklearn.ensemble import RandomForestClassifier
# from sklearn.metrics import accuracy_score
# from sklearn.metrics import confusion_matrix
# from sklearn.preprocessing import StandardScaler

# mnist = fetch_openml("mnist_784", version=1, as_frame=False, parser='liac-arff')
# X = mnist.data
# y = mnist.target.astype(np.uint8)

# X_train = X[:60000]
# X_test = X[60000:]
# y_train = y[:60000]
# y_test = y[60000:]

# # scaler = StandardScaler()
# # X_train_scaled = scaler.fit_transform(X_train.astype(np.float64))
# # X_test_scaled = scaler.transform(X_test.astype(np.float64))

# model = RandomForestClassifier(n_estimators=100, random_state=42, n_jobs=-1)
# model.fit(X_train, y_train)


# output_path = Path(__file__).resolve().parent / "mnist_model.joblib"
# joblib.dump(model, output_path, compress=3)
# print(f"Saved trained model to {output_path}")

# # # model evaluate
# # y_pred = model.predict(X_test)

# # acc = accuracy_score(y_test, y_pred)
# # print(f"Accuracy: {acc * 100:.2f}%")

# # cm = confusion_matrix(y_test, y_pred)
# # print(cm)




from pathlib import Path
import joblib

MODEL_PATH = Path(__file__).resolve().parent / "mnist_model.joblib"
model = joblib.load(MODEL_PATH)


import numpy as np
from sklearn.model_selection import train_test_split
import pickle

from sklearn.datasets import fetch_lfw_people
faces = fetch_lfw_people(min_faces_per_person=50)
print('Faces included in the dataset:')
print(faces.target_names)
print()
print('The shape of our data is {}'.format(faces.images.shape))
print('We have {} images'.format(faces.images.shape[0]))
print('Each image is of size {} by {} pixels'.format(faces.images.shape[1],faces.images.shape[2]))

print("-------")

X_train, X_test, y_train, y_test = train_test_split(faces.data, 
                                                faces.target,random_state=0, 
                                                test_size=0.2)

from sklearn.svm import SVC

model = SVC(C = 10, kernel = 'rbf')
model.fit(X_train, y_train)

y_preds = model.predict(X_test)

acc = (y_preds == y_test).sum() / y_test.size

print(f"Accuracy of the model: {acc}")

print("Saving the model : ")

with open('lfw.pkl','wb') as f:
    pickle.dump(model, f)
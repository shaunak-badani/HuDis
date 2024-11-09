from flask import Flask, request, jsonify
from flask_cors import CORS
from io import BytesIO
from PIL import Image
import numpy as np
import pickle

app = Flask(__name__)
CORS(app)


TARGET_NAMES = ['Ariel Sharon', 'Colin Powell', 'Donald Rumsfeld', 'George W Bush',
 'Gerhard Schroeder', 'Hugo Chavez', 'Jacques Chirac', 'Jean Chretien',
 'John Ashcroft', 'Junichiro Koizumi', 'Serena Williams', 'Tony Blair']


@app.route('/predict', methods = ['POST'])
def predict():
	if 'image' not in request.files:
		return jsonify({"error": "No image passed!"}), 400
    
	img = request.files['image']
	image_bytes = BytesIO(img.read())
	image = Image.open(image_bytes).convert('L').resize((47, 62))
	np_img = np.asarray(image).reshape((1, -1)) / 255.0

	with open('lfw.pkl', 'rb') as f:
		clf = pickle.load(f)
		prediction = clf.predict(np_img)
		predicted_name = TARGET_NAMES[prediction.item()]
		   
	return jsonify({'prediction': predicted_name })


if __name__ == "__main__":
    app.run()
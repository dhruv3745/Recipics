from flask import Flask, request, jsonify
import os
# import IngredientFinder
# import ImageToText

app = Flask(__name__)

ingredients = []

@app.route('/process_image', methods=['POST'])
def process_image():
    if 'file' not in request.files:
        return jsonify({"error": "No image file provided"}), 400

    global ingredients
    image = request.files['file']
    path = os.path.join("images", image.filename)
    image.save(path)
    # ingredients = IngredientFinder.__main__(ImageToText.__main__(path))

    return jsonify({"message": "Image received successfully!"})

@app.route('/')
def home():
    return ingredients

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
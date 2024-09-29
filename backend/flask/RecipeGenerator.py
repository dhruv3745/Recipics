from flask import Flask, request, jsonify
import os
import IngredientFinder
import ImageToText
from FindRecipe import find_recipe
from bson import json_util

app = Flask(__name__)

@app.route('/process_image', methods=['POST'])
def process_image():
    if 'file' not in request.files:
        return jsonify({"error": "No image file provided"}), 400

    global ingredients
    image = request.files['file']
    path = os.path.join("images", image.filename)
    image.save(path)
    ingredients = IngredientFinder.__main__(ImageToText.__main__(path))

    return jsonify({"result": ingredients})

@app.route('/get_recipe', methods=['GET'])
def get_recipe():
    ingredients = request.args.get('ingredients').split(',')

    results = find_recipe(ingredients)

    return jsonify({"results":json_util.dumps(results)})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
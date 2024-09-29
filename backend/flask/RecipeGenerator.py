from flask import Flask, request, jsonify
import os
import IngredientFinder
import ImageToText
from FindRecipe import find_recipe
from bson import json_util
from ImageInference import infer_on_image

app = Flask(__name__)

@app.route('/process_image', methods=['POST'])
def process_image():
    if 'file' not in request.files:
        return jsonify({"error": "No image file provided"}), 400

    image = request.files['file']
    path = os.path.join("images", image.filename)
    image.save(path)
    ingredients_OCR = IngredientFinder.__main__(ImageToText.__main__(path))
    ingredients_INF = infer_on_image(path)
    
    print("OCR Ingredients: ", ingredients_OCR)
    print("Inference Ingredients: ", ingredients_INF)

    total_ingredients = list(set(ingredients_OCR + ingredients_INF))

    if not total_ingredients:
        return jsonify({"error": "No ingredients found in the image"}), 400

    print("Total ingredients: ", total_ingredients)

    recipe = find_recipe(total_ingredients)

    return jsonify({"result": json_util.dumps(recipe)})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
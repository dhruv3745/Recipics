from flask import Flask, request, jsonify
import os
import IngredientFinder
import ImageToText
from FindRecipe import find_recipe, find_recipe_by_id
from bson import json_util
from ImageInference import infer_on_image

app = Flask(__name__)

@app.route('/process_image', methods=['POST'])
def process_image():

    # temp = find_recipe(['chicken leg', 'chicken', 'chicken stock', 'chicken wing', 'chicken thigh', 'chicken breast'])

    return jsonify(["chicken leg", "chicken", "chicken stock", "chicken wing", "chicken thigh", "chicken breast"])

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

    return jsonify(total_ingredients)

    print("Total ingredients: ", total_ingredients)

    recipe = find_recipe(total_ingredients)

    return json_util.dumps(recipe)

@app.route('/find_recipe', methods=['GET'])
def find_recipe_route():
    ingredients = [ingredient.strip().lower() for ingredient in request.args.get('ingredients').split(',')]
    

    print("Ingredients: ", ingredients)

    if not ingredients:
        return jsonify({"error": "No ingredients provided"}), 400

    recipes = find_recipe(ingredients)

    print(recipes)

    return json_util.dumps(recipes)

@app.route('/get_recipe_by_id', methods=['GET'])
def get_recipe_by_id():
    recipe_id = request.args.get('recipe_id')

    if not recipe_id:
        return jsonify({"error": "No recipe ID provided"}), 400

    recipe = find_recipe_by_id(recipe_id)

    if not recipe:
        return jsonify({"error": "No recipe found with the provided ID"}), 404

    return json_util.dumps(recipe)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
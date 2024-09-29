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
    if 'files' not in request.files:
        return jsonify({"error": "No image files provided"}), 400

    files = request.files.getlist('files')
    if not files:
        return jsonify({"error": "No files uploaded"}), 400
    
    all_ingredients = set()

    # Loop through each uploaded file
    for image in files:
        if image.filename == '':
            return jsonify({"error": "One of the files has an empty filename"}), 400

        # Save the image to a temporary path (images directory)
        path = os.path.join("images", image.filename)
        try:
            image.save(path)

            # Process the image 
            ingredients_OCR = IngredientFinder.__main__(ImageToText.__main__(path))
            ingredients_INF = infer_on_image(path)

            print(f"Processing {image.filename}:")
            print("  OCR Ingredients: ", ingredients_OCR)
            print("  Inference Ingredients: ", ingredients_INF)

            # Combine ingredients from both OCR and inference, and add to the total set
            all_ingredients.update(ingredients_OCR)
            all_ingredients.update(ingredients_INF)
        
        finally:
            # Delete the file after processing
            if os.path.exists(path):
                os.remove(path)
                print(f"Deleted file: {path}")

    if not all_ingredients:
        return jsonify({"error": "No ingredients found in the uploaded images"}), 400

    return jsonify(list(all_ingredients))

@app.route('/find_recipe', methods=['GET'])
def find_recipe_route():
    # Safely process the query parameter 'ingredients'
    ingredients_param = request.args.get('ingredients')
    ingredients = [ingredient.strip().lower() for ingredient in ingredients_param.split(',')] if ingredients_param else []

    # Safely process the query parameter 'dietLabels'
    dietLabels_param = request.args.get('dietLabels')
    dietLabels = [dietLabel.strip().lower() for dietLabel in dietLabels_param.split(',')] if dietLabels_param else []

    # Safely process the query parameter 'healthLabels'
    healthLabels_param = request.args.get('healthLabels')
    healthLabels = [healthLabel.strip().lower() for healthLabel in healthLabels_param.split(',')] if healthLabels_param else []

    # Safely process the query parameter 'cuisineType'
    cuisineType_param = request.args.get('cuisineType')
    cuisineType = [cuisine.strip().lower() for cuisine in cuisineType_param.split(',')] if cuisineType_param else []
    print("Ingredients: ", ingredients)

    if not ingredients:
        return jsonify({"error": "No ingredients provided"}), 400

    recipes = find_recipe(ingredients, dietLabels, healthLabels, cuisineType)

    # print(recipes)

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
from flask import Flask, request, jsonify
import IngredientFinder
import ImageToText
import requests

app = Flask(__name__)

ingredients = []
api_key = '61f65361f78d4fe6922325b17d377a26'

@app.route('/process_image', methods=['POST'])
def process_image():
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400

    global ingredients
    image = request.files['image']
    path = 'C:\\Users\\litte\\OneDrive\\Pictures\\Camera Roll\\input.jpg'
    image.save(path)
    ingredients = IngredientFinder.__main__(ImageToText.__main__(path))
    ingredients_str = ','.join(ingredients)

    response = requests.get(f'https://api.spoonacular.com/recipes/findByIngredients?ingredients={ingredients_str}&number=5&apiKey={api_key}')
    recipes = response.json()

    for recipe in recipes:
        print(recipe['title'])
        print(recipe['sourceUrl'])

    return jsonify({"message": "Image received successfully!"})

@app.route('/')
def home():
    return ingredients

if __name__ == '__main__':
    app.run(debug=True)

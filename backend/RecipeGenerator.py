from flask import Flask 
import IngredientFinder

app = Flask(__name__)

@app.route('/')
def __main__():
    return "Hello, Flask!"

if __name__ == '__main__':
    app.run(debug=True)
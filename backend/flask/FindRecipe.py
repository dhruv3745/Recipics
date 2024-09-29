from pymongo import MongoClient
from MapIngredients import map_ingredients

uri = "mongodb+srv://admin:cH2BkGTbxehvD1wr@recipes.5iqaj.mongodb.net/?retryWrites=true&w=majority&appName=Recipes"

client = MongoClient(uri)

database = client['Recipes']
collection = database['Recipes']

def find_recipe(ingredients):
    # Ensure ingredients are passed correctly
    if not ingredients or not isinstance(ingredients, list):
        print("Invalid ingredients input. Expected a list.")
        return None
    
    # mappings
    mapped_ingredients = map_ingredients(ingredients)

    try:
        # Define your query by limiting results to the specified ingredients list
        query = {
            'simplifiedIngredients': {
                '$exists': True,
                '$not': {
                    '$elemMatch': {
                        '$nin': mapped_ingredients
                    }
                }
            }
        }

        # Perform the query and convert the cursor to a list
        results = list(collection.find(query))  # Converts cursor to list
        print(results)  # Print or log the result if desired
        return results
    
    except PyMongoError as e:
        # Log the specific exception for easier debugging
        print(f"Failed to connect to MongoDB: {e}")
        return None
    

# print(find_recipe(['chicken leg', 'chicken', 'chicken stock', 'chicken wing', 'chicken thigh', 'chicken breast']))
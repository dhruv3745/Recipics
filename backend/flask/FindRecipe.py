from pymongo import MongoClient
from MapIngredients import map_ingredients
from bson.objectid import ObjectId
from pymongo.errors import PyMongoError

uri = "mongodb+srv://admin:cH2BkGTbxehvD1wr@recipes.5iqaj.mongodb.net/?retryWrites=true&w=majority&appName=Recipes"

client = MongoClient(uri)

database = client['Recipes']
collection = database['Recipes']

def find_recipe(ingredients, dietLabels, healthLabels, cuisineType):
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

        # Only add `dietLabels` if it's non-empty
        if dietLabels:
            query['dietLabels'] = {'$in': dietLabels}

        # Only add `healthLabels` if it's non-empty
        if healthLabels:
            query['healthLabels'] = {'$in': healthLabels}

        # Only add `cuisineType` if it's non-empty
        if cuisineType:
            query['cuisineType'] = {'$in': cuisineType}

        print("Query:", query)

        c = collection.find(query)

        # Perform the query and convert the cursor to a list
        results = list(c)  # Converts cursor to list
        return results
    
    except PyMongoError as e:
        # Log the specific exception for easier debugging
        print(f"Failed to connect to MongoDB: {e}")
        return None
    
def find_recipe_by_id(recipe_id):
    # Ensure recipe_id is passed correctly
    if not recipe_id or not isinstance(recipe_id, str):
        print("Invalid recipe ID input. Expected a string.")
        return None
    
    try:
        # Define your query by limiting results to the specified recipe_id
        query = {
            '_id': ObjectId(recipe_id)
        }

        # Perform the query and convert the cursor to a list
        results = collection.find_one(query) 
        print("Get recipe by id:", results)  # Print or log the result if desired
        return results
    
    except PyMongoError as e:
        # Log the specific exception for easier debugging
        print(f"Failed to connect to MongoDB: {e}")
        return

# print(find_recipe(['chicken leg', 'chicken', 'chicken stock', 'chicken wing', 'chicken thigh', 'chicken breast']))
# import the inference-sdk
from inference_sdk import InferenceHTTPClient

# initialize the client
CLIENT = InferenceHTTPClient(api_url="https://detect.roboflow.com", api_key="Wl3jmgI5JLK8ubSZhhep")

path = "images/ingredients.jpg"

# infer on a local image

def infer_on_image(path):
    result = CLIENT.infer(path, model_id="ingredients-2-sj4ut/2")

    ingredients = []

    for prediction in result["predictions"]:
        # remove predictions with a confidence level below 0.45
        if prediction["confidence"] < 0.45:
            continue
        # remove last 8 characters from the class name
        ingredients.append(prediction["class"].lower())

    return ingredients

infer_on_image(path)
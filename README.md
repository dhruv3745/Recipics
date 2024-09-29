# RecipeAI

**Problem Statement**
Our goal is to address three main issues:
* Reduce food waste
* Dietary management
* Cost efficiency

**Tech Stack**
* Database: MongoDB
* Backend: Python Flask
* Frontend: React Native
* AI Model Training: YOLOv8

**Dependencies**
* fuzzywuzzy
* ImageToText
* re
* MongoClient
* Flask
* os
* bson
* Image
* pytesseract
* inference_sdk
* numpy
* cv2
* Output
* requests
* jsonify
* request

**AI Model Training**
The primary aim of this project is to utilize images for generating user-specific recipes. To achieve this, we developed a Convolutional Neural Network (CNN) to analyze images and detect various ingredients. We explored several methods, including TensorFlow 2, but ultimately decided to split our approach into two main sections: creating a supervised learning dataset and training a YOLOv8 model.

**Creation of Ingredients Dataset**
Dataset: Ingredients 2.v2i.voc
Most existing datasets contain cooked meals, which don’t align with our focus on identifying raw ingredients. To overcome this limitation, we created our own dataset of commonly used ingredients found in typical kitchens. We gathered over 300 labeled photos to form a custom supervised dataset, dividing it as follows:
* Training: 89%
* Validation: 7%
* Testing: 4%

**YOLO-NAS Object Detection Model**
After evaluating various options, we selected YOLOv8 for our model due to its proficiency in detecting multiple objects in images and its efficiency compared to TensorFlow.
[CNN Model Weights Code: Google Colab Link]([url](https://colab.research.google.com/drive/1-mdtUdamd26maRLm397OhPzS8NH-1wC-?usp=sharing))
The final CNN is fast at ingredient detection, achieving a precision score of 83.7%. To optimize load times on our Flask server, we hosted our model on Roboflow.
[CNN Demonstration Video: YouTube Link]([url](https://www.youtube.com/watch?v=qfqvKKoogK0&feature=youtu.be))

**Recipe Database Creation**
To find recipes based on available ingredients, we needed a comprehensive recipe database. While we initially considered using an existing API, we opted to create our own. Using MongoDB, we compiled over 30,000 unique recipes with 10 key parameters, adding an additional parameter to enhance search speed.

**Our Idea**
The app aims to provide users with recipes based solely on their available ingredients. Users can upload a photo of their ingredients, and the app will identify them, allowing for ingredient modifications and filtering by cuisine type, dietary needs, and health labels.

**Development Plan**
We followed a hierarchical development structure:
* Level 1: Pull data from the Recipe Search API.
* Level 2: Store and manage data in a MongoDB database.
* Level 3: Optimize data retrieval from the MongoDB dataset.
* Level 4: Implement computer vision for ingredient identification.
* Level 5: Integrate OCR to read receipts and map to ingredients.
* Level 6: Add user preferences for health needs and dietary restrictions.

**Challenges Encountered**
Aggregating a custom dataset was time-consuming, necessitating supervised learning due to limited images.
Our mapping algorithm sometimes yielded inconsistent results, affecting ingredient accuracy.
The AI model occasionally misidentified input images, leading to questionable accuracy levels.

**Contributions & Key Learnings**
**Rick**
Developed a Flask backend to interpret receipt images.
Filtered and mapped text data onto a dataset of raw ingredients.
Integrated user image submissions to facilitate recipe generation.
Trained a Roboflow object detection model on a dataset of 788 images.
Gained insights into Git, dataset quality, and model accuracy.
**Jason**
Designed the mobile app's UI/UX using React Native.
Created backend endpoints in Flask for querying MongoDB recipes.
Learned to process images for ingredient extraction.
Integrated frontend and backend features for enhanced filtering options.
**Dhruv**
Specialized in CNN model creation and training with Roboflow.
Gained knowledge on supervised vs. unsupervised learning.
**Dev**
Developed skills in MongoDB database engineering, server deployment, and natural language querying.
Automated the insertion of 30,000+ recipes into the database and created a string matching algorithm for efficient data retrieval.
Contributed to the labeling of training data and created methods for data analysis on the Flask server.
Learned to create virtual environments and integrate APIs and databases effectively.

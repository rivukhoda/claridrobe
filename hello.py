from flask import Flask, jsonify, json, request
from flask_pymongo import PyMongo
from bson import json_util
from clarifai.client import ClarifaiApi

app = Flask(__name__)
app.config.from_object('settings.DevelopmentConfig')
mongo = PyMongo(app)
clarifai_api = ClarifaiApi()

@app.route('/images', methods=['GET'])
def get_all_images():
    all_images = list(mongo.db.images.find())
    response = json.dumps(all_images, default=json_util.default)
    return jsonify(response)

@app.route('/images/<category_of_clothing>', methods=['GET'])
def get_images(category_of_clothing):
    images = list(mongo.db.images.find({"tag": category_of_clothing}))
    response = json.dumps(images, default=json_util.default)
    return jsonify(response)

@app.route('/upload', methods=['POST'])
def store_image():
    image_metadata = request.get_json()
    image_metadata['tag'] = classify_clothing(image_metadata['url'])
    mongo.db.images.insert(image_metadata)
    return jsonify(status=200, message="success")

def classify_clothing(image_url):
    categories_of_clothes = ['shirt', 'pants', 'jacket', 'footwear']
    possible_categories = clarifai_api.tag_image_urls(image_url)
    tags = possible_categories['results'][0]['result']['tag']['classes']

    for category_of_clothing in categories_of_clothes:
        if category_of_clothing in tags:
            return category_of_clothing

if __name__ == "__main__":
    app.run()

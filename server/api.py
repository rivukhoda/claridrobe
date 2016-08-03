from flask import Flask, jsonify, json, request, Response
from flask_pymongo import PyMongo
from bson import json_util
from clarifai.client import ClarifaiApi
from flask_cors import CORS
from bson.objectid import ObjectId
import os
import requests

app = Flask(__name__)
app.config.from_object('settings.DevelopmentConfig')
CORS(app)
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
    json_images = json.dumps(images, default=json_util.default)
    return Response(json_images, mimetype='application/json')


@app.route('/images', methods=['DELETE'])
def delete_all_images():
    mongo.db.images.drop()
    return jsonify(status=200, message="images deleted successfuly")


@app.route('/images', methods=['POST'])
def store_image():
    image_metadata = request.get_json()
    image_metadata['tag'] = classify_clothing(image_metadata['url'])
    mongo.db.images.insert(image_metadata)
    return jsonify(status=200, message="image uploaded successfully")


def classify_clothing(image_url):
    categories_of_clothes = ['shirt', 'pants', 'jacket', 'footwear']
    possible_categories = clarifai_api.tag_image_urls(image_url)
    generated_classes_of_clothes = possible_categories['results'][0]['result']['tag']['classes']

    for type_of_clothing in generated_classes_of_clothes:
        if type_of_clothing in categories_of_clothes:
            return type_of_clothing


@app.route('/outfits', methods=['POST'])
def save_outfit():
    outfit = request.get_json()
    mongo.db.outfits.insert(outfit)
    return jsonify(status=200, message="outfit saved successfully")


@app.route('/outfits', methods=['GET'])
def get_all_outfits():
    all_outfits = list(mongo.db.outfits.find())
    json_outfits = json.dumps(all_outfits, default=json_util.default)
    return Response(json_outfits, mimetype='application/json')


@app.route('/outfits/<oid>', methods=['DELETE'])
def delete_outfit(oid):
    mongo.db.outfits.delete_one({"_id": ObjectId(oid)})
    return jsonify(status=200, message="outfit deleted successfully")


@app.route('/weather', methods=['GET'])
def get_weather_info():
    url = 'https://api.forecast.io/forecast/'
    latitude = request.args.get('latitude')
    longitude = request.args.get('longitude')
    api_key = app.config['DARKSKY_API_KEY']
    forecast = requests.get(url + api_key + '/' + latitude + ',' + longitude)
    return Response(forecast, mimetype='application/json')


if __name__ == "__main__":
    app.run(threaded=True)

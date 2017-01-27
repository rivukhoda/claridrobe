import os


class Config(object):
    DEBUG = False
    TESTING = False
    DATABASE_URI = ''


class ProductionConfig(Config):
    DATABASE_URI = ''


class DevelopmentConfig(Config):
    DEBUG = True
    MONGO_DBNAME = 'database'
    DARKSKY_API_KEY = os.environ['DARKSKY_API_KEY']
    GMAPS_API_KEY = os.environ['GMAPS_API_KEY']
    CLARIFAI_API_CLIENT_ID = os.environ['CLARIFAI_API_CLIENT_ID']
    CLARIFAI_API_CLIENT_SECRET = os.environ['CLARIFAI_API_CLIENT_SECRET']


class TestingConfig(Config):
    TESTING = True

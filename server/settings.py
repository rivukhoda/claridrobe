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


class TestingConfig(Config):
    TESTING = True

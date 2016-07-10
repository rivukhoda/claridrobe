class Config(object):
	DEBUG = False
	TESTING = False
	DATABASE_URI = ''

class ProductionConfig(Config):
	DATABASE_URI = ''

class DevelopmentConfig(Config):
	DEBUG = True

class TestingConfig(Config):
	TESTING = True
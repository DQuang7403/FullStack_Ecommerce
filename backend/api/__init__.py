from flask import Flask

def create_app():
  app = Flask(__name__)
  app.config['SECRET_KEY'] = 'randomKey'
  app.config["SESSION_COOKIE_SAMESITE"] = "None"
  app.config["SESSION_COOKIE_SECURE"] = True

  from .products import products
  from .views import views
  
  app.register_blueprint(views, url='/')
  app.register_blueprint(products, url='/')

  return app
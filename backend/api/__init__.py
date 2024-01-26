from flask import Flask
from datetime import timedelta
from flask_jwt_extended import (
    JWTManager, 
)
from api.client import client_routes
def create_app():
    app = Flask(__name__)
    # session configuration
    app.config["SECRET_KEY"] = "randomKey"
    app.config["SESSION_COOKIE_SAMESITE"] = "None"
    app.config["SESSION_COOKIE_SECURE"] = True

    # jwt configuration
    app.config["JWT_SECRET_KEY"] = "randomKey"
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
    jwt = JWTManager()
    jwt.init_app(app)

    client_routes(app)
    

    return app
from flask import Flask
from datetime import timedelta
from flask_jwt_extended import (
    JWTManager, 
)

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

    from .products import products
    from .cart import cart
    from .auth import auth
    from .account import account
    from .wishlist import wishlist
    from .checkout import checkout
    from .review import review

    app.register_blueprint(cart, url_prefix="/")
    app.register_blueprint(products, url_prefix="/")
    app.register_blueprint(auth, url_prefix="/auth")
    app.register_blueprint(account, url_prefix="/account")
    app.register_blueprint(checkout, url_prefix="/checkout")
    app.register_blueprint(wishlist, url_prefix="/")
    app.register_blueprint(review, url_prefix="/")

    return app
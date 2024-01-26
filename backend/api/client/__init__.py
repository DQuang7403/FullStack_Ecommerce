from flask import Flask, Blueprint


def client_routes(app):
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
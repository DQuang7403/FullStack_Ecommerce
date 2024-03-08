from flask import Flask, Blueprint


def admin_routes(app):
  from .products import admin_products
  from .order import admin_order
  from .users import users
  from .graph import graphInfo
  from .authentication import adminAuth

  app.register_blueprint(admin_products, url_prefix="/admin")
  app.register_blueprint(admin_order, url_prefix="/admin")
  app.register_blueprint(users, url_prefix="/admin")
  app.register_blueprint(graphInfo, url_prefix="/admin")
  app.register_blueprint(adminAuth, url_prefix="/admin")

  
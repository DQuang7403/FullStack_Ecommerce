from flask import Blueprint, request, session, jsonify
import sqlite3
from flask_cors import CORS

views = Blueprint("views", __name__)
sqldbname = "backend/Ecommerce.db"
CORS(views, origins="http://localhost:5173", supports_credentials=True)


@views.route("/cart", methods=["GET"])
def get_cart():
    current_cart = []
    if "cart" in session:
        current_cart = session.get("cart", [])
    return jsonify(current_cart)


@views.route("/cart/add", methods=["POST"])
def add_to_cart():
    productId = request.json["product_id"]
    quantity = int(request.json["quantity"])
    conn = sqlite3.connect(sqldbname)
    cursor = conn.cursor()
    cursor.execute(
        "SELECT title, price, thumbnail FROM Products WHERE id = ?", (productId,)
    )
    product = cursor.fetchone()
    conn.close()
    product_details = {
        "id": productId,
        "title": product[0],
        "price": product[1],
        "thumbnail": product[2],
        "quantity": quantity,
    }
    cart = session.get("cart", [])
    found = False
    for item in cart:
        if item["id"] == productId:
            item["quantity"] += quantity
            found = True
    if not found:
        cart.append(product_details)
    session["cart"] = cart
    return jsonify({"message": "Product added to cart successfully"}), 200


@views.route("/cart/remove", methods=["POST"])
def remove_item():
    productId = request.json["product_id"]
    cart = session.get("cart", [])
    new_cart = []

    for item in cart:
        if item["id"] != productId:
            new_cart.append(item)
    session["cart"] = new_cart
    return jsonify({"message": "Product removed from cart successfully"}), 200

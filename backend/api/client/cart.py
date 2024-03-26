from flask import Blueprint, request, session, jsonify
import sqlite3
from flask_cors import CORS

cart = Blueprint("cart", __name__)
sqldbname = "Ecommerce.db"
CORS(cart, origins="http://localhost:5173", supports_credentials=True)


@cart.route("/cart", methods=["GET"])
def get_cart():
    current_cart = []
    if "cart" in session:
        current_cart = session.get("cart", [])
    return jsonify(current_cart)


@cart.route("/cart/add", methods=["POST"])
def add_to_cart():
    productId = request.json["product_id"]
    quantity = int(request.json["quantity"])
    conn = sqlite3.connect(sqldbname)
    cursor = conn.cursor()
    cursor.execute(
        "SELECT title, price, thumbnail, stocks FROM Products WHERE product_id = ?",
        (productId,),
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
        if item["id"] == productId and item["quantity"] + quantity <= product[3]:
            item["quantity"] += quantity
            found = True
        elif item["id"] == productId and item["quantity"] + quantity > product[3]:
            return jsonify({"message": "Not enough stock"}), 400
        else:
            continue
    if not found:
        cart.append(product_details)
    session["cart"] = cart
    return jsonify({"message": "Product added to cart successfully"}), 200


@cart.route("/cart/remove", methods=["POST"])
def remove_item():
    productId = request.json["product_id"]
    cart = session.get("cart", [])
    new_cart = []

    for item in cart:
        if item["id"] != productId:
            new_cart.append(item)
    session["cart"] = new_cart
    return jsonify({"message": "Product removed from cart successfully"}), 200


@cart.route("/cart/update", methods=["POST"])
def update_cart():
    cart = request.json["cart"]
    
    conn = sqlite3.connect(sqldbname)
    cursor = conn.cursor()
    for item in cart:
        cursor.execute("select stocks from Products where title = ?", (item["title"],))
        stock = cursor.fetchone()
        if stock[0] < item["quantity"]:
            return jsonify({"message": "Not enough stock"}), 400
    conn.close()
    session["cart"] = cart
    return jsonify({"message": "Cart updated successfully"}), 200

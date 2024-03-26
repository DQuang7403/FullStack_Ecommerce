from flask import Blueprint, request, jsonify, session
import sqlite3
from flask_cors import CORS

wishlist = Blueprint("wishlist", __name__)
sqldbname = "Ecommerce.db"
CORS(wishlist, origins="http://localhost:5173", supports_credentials=True)


@wishlist.route("/wishlist", methods=["GET"])
def get_wishlist():
    wishlist = []
    if "wishlist" in session:
        wishlist = session.get("wishlist", [])
    return jsonify(wishlist)


@wishlist.route("/wishlist/add", methods=["POST"])
def add_to_wishlist():
    productId = request.json["product_id"]
    conn = sqlite3.connect(sqldbname)
    cur = conn.cursor()
    cur.execute("SELECT * FROM Products WHERE product_id = ?", (productId,))
    product = cur.fetchone()
    conn.close()
    product_details = {
        "id": product[0],
        "title": product[1],
        "price": product[2],
        "rating": product[3],
        "stock": product[4],
        "category": product[5],
        "thumbnail": product[6],
        "description": product[7],
        "totalRating": product[8],
        "discount": product[9],
        "images": [product[10], product[11], product[12]],
    }
    for item in session.get("wishlist", []):
        if item["id"] == productId:
            return jsonify({"message": "Product already in wishlist"}), 409

    wishlist = session.get("wishlist", [])
    wishlist.append(product_details)
    session["wishlist"] = wishlist
    return (
        jsonify(
            {"message": "Product added to wishlist successfully", "item": wishlist}
        ),
        200,
    )


@wishlist.route("/wishlist/remove", methods=["POST"])
def remove_from_wishlist():
    productId = request.json["product_id"]
    wishlist = session.get("wishlist", [])
    new_wishlist = []
    for item in wishlist:
        if item["id"] != productId:
            new_wishlist.append(item)
    session["wishlist"] = new_wishlist
    return (
        jsonify(
            {
                "message": "Product removed from wishlist successfully",
                "item": new_wishlist,
            }
        ),
        200,
    )


@wishlist.route("/wishlist/user/<email>", methods=["GET"])
def get_user_wishlist(email):
    wishlist = []
    conn = sqlite3.connect(sqldbname)
    cursor = conn.cursor()
    cursor.execute(
        "Select * from Wishlist, Products where user_email = ? and Wishlist.product_id = Products.product_id",
        (email,),
    )
    wishlistProducts = cursor.fetchall()
    for product in wishlistProducts:
        wishlist.append(
            {
                "id": product[3],
                "title": product[4],
                "price": product[5],
                "rating": product[6],
                "stock": product[7],
                "category": product[8],
                "thumbnail": product[9],
                "description": product[10],
                "totalRating": product[11],
                "discount": product[12],
                "images": [product[13], product[14], product[15]],
            }
        )

    conn.close()
    return jsonify(wishlist)


@wishlist.route("/wishlist/user/add", methods=["POST"])
def add_to_user_wishlist():
    wishlist = []
    productId = request.json["product_id"]
    user_email = request.json["user_email"]
    conn = sqlite3.connect(sqldbname)
    cur = conn.cursor()
    cur.execute(
        "Insert into Wishlist (product_id, user_email) values (?, ?)",
        (productId, user_email),
    )
    conn.commit()
    cur.execute(
        "Select * from Wishlist, Products where user_email = ? and Wishlist.product_id = Products.product_id",
        (user_email,),
    )
    wishlistProducts = cur.fetchall()
    for product in wishlistProducts:
        wishlist.append(
            {
                "id": product[3],
                "title": product[4],
                "price": product[5],
                "rating": product[6],
                "stock": product[7],
                "category": product[8],
                "thumbnail": product[9],
                "description": product[10],
                "totalRating": product[11],
                "discount": product[12],
                "images": [product[13], product[14], product[15]],
            }
        )
    conn.close()
    return (
        jsonify(
            {
                "message": "Added to wishlist",
                "item": wishlist,
            }
        ),
        200,
    )


@wishlist.route("/wishlist/user/remove", methods=["POST"])
def remove_from_user_wishlist():
    wishlist = []
    productId = request.json["product_id"]
    user_email = request.json["user_email"]
    conn = sqlite3.connect(sqldbname)
    cur = conn.cursor()
    cur.execute(
        "Delete from Wishlist where product_id = ? and user_email = ?",
        (productId, user_email),
    )
    conn.commit()
    cur.execute(
        "Select * from Wishlist, Products where user_email = ? and Wishlist.product_id = Products.product_id",
        (user_email,),
    )
    wishlistProducts = cur.fetchall()
    for product in wishlistProducts:
        wishlist.append(
            {
                "id": product[3],
                "title": product[4],
                "price": product[5],
                "rating": product[6],
                "stock": product[7],
                "category": product[8],
                "thumbnail": product[9],
                "description": product[10],
                "totalRating": product[11],
                "discount": product[12],
                "images": [product[13], product[14], product[15]],
            }
        )
    conn.close()
    conn.close()
    return jsonify({"message": "Removed from wishlist", "item": wishlist}), 200

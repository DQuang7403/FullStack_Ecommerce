from flask import Blueprint, jsonify, request
import sqlite3
from flask_cors import CORS, cross_origin

admin_products = Blueprint("admin_products", __name__)
sqldbname = "Ecommerce.db"
CORS(admin_products, origins="http://localhost:3000", supports_credentials=True)


@admin_products.route("/products")
def get_products():
    conn = sqlite3.connect(sqldbname)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Products")
    products = cursor.fetchall()
    products_list = []
    for product in products:
        products_list.append(
            {
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
        )
    return jsonify(products_list)


@admin_products.route("/products/<int:id>", methods=["GET"])
def get_product_by_id(id):
    conn = sqlite3.connect(sqldbname)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Products WHERE product_id = ?", (id,))
    product = cursor.fetchone()

    return jsonify(
        {
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
    )


@admin_products.route("/products/add", methods=["POST"])
def add_product():
    title = request.json["title"]
    price = request.json["price"]
    stock = request.json["stock"]
    category = request.json["category"]
    thumbnail = request.json["thumbnail"]
    description = request.json["description"]
    discount = request.json["discount"]
    images1 = request.json["images1"]
    images2 = request.json["images2"]
    images3 = request.json["images3"]

    conn = sqlite3.connect(sqldbname)
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO Products (title, price, rating, stocks, category, thumbnail, description, totalRating, discount, thumbnail2, thumbnail3, thumbnail4) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        (
            title,
            price,
            0,
            stock,
            category,
            thumbnail,
            description,
            0,
            discount,
            images1,
            images2,
            images3,
        ),
    )
    conn.commit()
    conn.close()

    return jsonify({"message": "Product added successfully"}), 201


@admin_products.route("/products/update/<int:id>", methods=["PUT"])
def update_product(id):
    title = request.json["title"]
    price = request.json["price"]
    stock = request.json["stock"]
    category = request.json["category"]
    thumbnail = request.json["thumbnail"]
    description = request.json["description"]
    discount = request.json["discount"]
    images1 = request.json["images1"]
    images2 = request.json["images2"]
    images3 = request.json["images3"]

    conn = sqlite3.connect(sqldbname)
    cursor = conn.cursor()
    cursor.execute(
        "Update Products set title = ?, price = ?, stocks = ?, category = ?, thumbnail = ?, description = ?, discount = ?, thumbnail2 = ?, thumbnail3 = ?, thumbnail4 = ? where product_id = ?",
        (
            title,
            price,
            stock,
            category,
            thumbnail,
            description,
            discount,
            images1,
            images2,
            images3,
            id,
        ),
    )
    conn.commit()
    conn.close()

    return jsonify({"message": "Product has been updated successfully"}), 201


@admin_products.route("/products/delete/<int:id>", methods=["DELETE"])
def delete_product(id):
    conn = sqlite3.connect(sqldbname)
    cursor = conn.cursor()
    cursor.execute("Delete from Products where product_id = ?", (id,))
    conn.commit()
    conn.close()

    return jsonify({"message": "Product deleted successfully"}), 201
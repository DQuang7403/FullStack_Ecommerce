from flask import Blueprint, request, jsonify
import sqlite3
from flask_cors import CORS
from flask_jwt_extended import jwt_required
from .auth import authenticated_user

products = Blueprint("products", __name__)
sqldbname = "Ecommerce.db"
CORS(products, origins="http://localhost:5173")
CORS(products, origins="http://localhost:3000")


@products.route("/products/all/<int:quantity>", methods=["GET"])
def getproduct(quantity):
    conn = sqlite3.connect(sqldbname)
    cur = conn.cursor()
    cur.execute("select * from Products Limit 0, ?", (quantity,))
    products = cur.fetchall()
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


@products.route("/products/<int:id>", methods=["GET"])
def get_product_by_id(id):
    conn = sqlite3.connect(sqldbname)
    cur = conn.cursor()
    cur.execute("select * from Products where product_id = ?", (id,))
    product = cur.fetchone()
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


@products.route("/products/<category>", methods=["GET"])
def get_product_by_category(category):
    conn = sqlite3.connect(sqldbname)
    cur = conn.cursor()
    cur.execute("select * from Products where category = ?", (category,))
    products = cur.fetchall()
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


@products.route("/product")
def get_products_with_limit():
    limit = request.args.get("limit")
    conn = sqlite3.connect(sqldbname)
    cur = conn.cursor()
    cur.execute("select * from Products limit 0, ?", (limit,))
    products = cur.fetchall()
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


@products.route("/discount_products", methods=["GET"])
def get_all_discount_products():
    conn = sqlite3.connect(sqldbname)
    cur = conn.cursor()
    cur.execute("select * from Products where discount > 0")
    products = cur.fetchall()
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


@products.route("/sale_products", methods=["GET"])
def get_sale_products():
    limit = request.args.get("limit", default=1, type=int)
    conn = sqlite3.connect(sqldbname)
    cur = conn.cursor()
    cur.execute("select * from Products where discount > 0 limit 0,?", (limit,))
    products = cur.fetchall()
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

@products.route("/products/category")
def get_category():
    conn = sqlite3.connect(sqldbname)
    cur = conn.cursor()
    cur.execute("select distinct category from Products")
    category = cur.fetchall()
    return jsonify(category)


@products.route("/products/search/<search>", methods=["GET"])
def search(search):
    conn = sqlite3.connect(sqldbname)
    cur = conn.cursor()
    cur.execute(
        "select * from Products where title like ? or category like ?",
        ("%" + search + "%", "%" + search + "%"),
    )
    products = cur.fetchall()
    search_list = []
    for product in products:
        search_list.append(
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
    return jsonify(search_list)


# INSERT INTO Products
# (title, price, rating, stocks, category, thumbnail, description, totalRating, discount, thumbnail2, thumbnail3, thumbnail4)
# VALUES
# ('25W 10,000 mAh Battery Pack, Beige',
# 34.99,
# 4.2,
# 10,
# 'accessories',
# 'https://image-us.samsung.com/us/smartphones/galaxy-s23-ultra/accessories/images/battery/beige/1.jpg?$product-details-jpg$',
# 'Power up at a moment’s notice. Whether it’s your phone, buds or both, you can quickly charge whenever you need with a fast and powerful battery pack.',
# 9,
# 0,
# 'https://image-us.samsung.com/us/smartphones/galaxy-s23-ultra/accessories/images/battery/beige/2.jpg?$product-details-jpg$',
# 'https://image-us.samsung.com/us/smartphones/galaxy-s23-ultra/accessories/images/battery/beige/4.jpg?$product-details-jpg$',
# 'https://image-us.samsung.com/us/smartphones/galaxy-s23-ultra/accessories/images/battery/beige/5.jpg?$product-details-jpg$'
# )

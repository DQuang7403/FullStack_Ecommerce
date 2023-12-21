from flask import Blueprint, request, session, jsonify
import sqlite3
from flask_cors import CORS


products = Blueprint("products", __name__)
sqldbname = "backend/Ecommerce.db"
CORS(products, origins="http://localhost:5173")


@products.route("/products", methods=["GET"])
def getproduct():
    conn = sqlite3.connect(sqldbname)
    cur = conn.cursor()
    cur.execute("select * from Products")
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
    cur.execute("select * from Products where id = ?", (id,))
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


# INSERT INTO Products
# (title, price, rating, stocks, category, thumbnail, description, totalRating, discount, thumbnail2, thumbnail3, thumbnail4)
# VALUES
# ('Galaxy Z Flip5',
# 600,
# 4.5,
# 59,
# 'smartphones',
# 'https://image-us.samsung.com/us/smartphones/galaxy-z-flip5/Mint/1.jpg?$product-details-jpg$',
# 'The Wide Camera on Galaxy Z Flip5 brings more of the scene into frame whether open or closed. Plus, with Nightography video at 60 fps, losing sunlight does not mean losing out on quality.',
# 20,
# 0,
# 'https://image-us.samsung.com/us/smartphones/galaxy-z-flip5/configurator/02-Zflip5-Configurator-800x600.jpg?$product-details-jpg$',
# 'https://image-us.samsung.com/us/smartphones/galaxy-z-flip5/configurator/01-Zflip5-Configurator-800x600.jpg?$product-details-jpg$',
# 'https://image-us.samsung.com/SamsungUS/PIM/Gallery-B5-800x600_1-Launch_______2.jpg?$product-details-jpg$'
# )

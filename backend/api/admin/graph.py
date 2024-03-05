from flask import Blueprint, jsonify
from flask_cors import CORS
import sqlite3

graphInfo = Blueprint("graphInfo", __name__)
sqldbname = "backend/Ecommerce.db"
CORS(graphInfo, origins="http://localhost:3000", supports_credentials=True)


@graphInfo.route("/trending_products", methods=["GET"])
def get_trending_products():
    conn = sqlite3.connect(sqldbname)
    cur = conn.cursor()
    product_list = []
    sqlcommand = "SELECT product_id, title, stocks, price from Products where Products.title in (select DISTINCT product_name from Order_details group by product_name order by  count(*) DESC limit 0, 6)"
    cur.execute(sqlcommand)
    products = cur.fetchall()
    for product in products:
        product_list.append(
            {
                "id": product[0],
                "title": product[1],
                "stocks": product[2],
                "price": product[3],
            }
        )
    conn.close()
    return jsonify(product_list)


@graphInfo.route("/best_selling_products", methods=["GET"])
def get_best_selling():
    conn = sqlite3.connect(sqldbname)
    cursor = conn.cursor()
    sqlcommand = """
    SELECT product_id, title, price, stocks, 
    (SELECT COUNT(product_name) FROM Order_details WHERE product_name = Products.title) AS totalOrder
    FROM Products
    WHERE title IN (
    SELECT product_name FROM Order_details GROUP BY product_name ORDER BY COUNT(*) DESC LIMIT 6 )
    """
    cursor.execute(sqlcommand)
    products = cursor.fetchall()
    product_list = []
    for product in products:
        product_list.append(
            {
                "id": product[0],
                "title": product[1],
                "price": product[2],
                "stocks": product[3],
                "totalOrder": product[4],
            }
        )
    conn.close()
    return jsonify(product_list)

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
    sqlcommand = """
    SELECT product_id, title, price, stocks, 
        (SELECT COUNT(product_name) FROM Order_details WHERE product_name = Products.title) AS totalOrder
    FROM Products
    WHERE title IN (
        SELECT product_name 
        FROM Order_details 
        GROUP BY product_name 
        ORDER BY COUNT(*) DESC 
        LIMIT 6
    )
    ORDER BY totalOrder DESC;
    """
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
        SELECT product_name 
        FROM Order_details 
        GROUP BY product_name 
        ORDER BY COUNT(*) DESC 
        LIMIT 6
    )
    ORDER BY totalOrder DESC;
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


@graphInfo.route("/top_category", methods=["GET"])
def get_top_category():
    conn = sqlite3.connect(sqldbname)
    cursor = conn.cursor()
    sqlcommand = """
    SELECT category, count(category) as total from Products where Products.title in(SELECT product_name from Order_details)
    group by category order by count(category) desc LIMIT 4
    """
    cursor.execute(sqlcommand)
    products = cursor.fetchall()
    product_list = []
    for product in products:
        product_list.append({"category": product[0], "total_order": product[1]})
    conn.close()
    return jsonify(product_list)


@graphInfo.route("/total_users", methods=["GET"])
def get_users():
    conn = sqlite3.connect(sqldbname)
    cursor = conn.cursor()
    cursor.execute(
        "select STRFTIME('%d/%m', create_at), count(*) as user_list from User group by date(create_at) limit 6"
    )
    users = cursor.fetchall()
    user_list = []
    for user in users:
        user_list.append({"name": user[0], "stat": user[1]})
    cursor.execute("select count(*) as total_user from User")
    totals = cursor.fetchone()
    conn.close()
    return jsonify({"user_list": user_list, "total_user": totals[0]})


@graphInfo.route("/total_profit", methods=["GET"])
def get_profit():
    conn = sqlite3.connect(sqldbname)
    cursor = conn.cursor()
    cursor.execute(
        "select  STRFTIME('%d/%m',Orders.order_id), sum(price) as totalProfit from Order_details, Orders where Order_details.order_id = Orders.order_id group by create_at ORDER by create_at LIMIT 7"
    )
    profit = cursor.fetchall()
    profit_by_days = []
    for day in profit:
        profit_by_days.append({"name": day[0], "stat": day[1]})
    cursor.execute("select round(sum(price)) as totalProfit from Order_details")
    totals = cursor.fetchone()
    conn.close()
    return jsonify({"profit_by_days": profit_by_days, "total_profit": totals[0]})


@graphInfo.route("/total_order", methods=["GET"])
def get_order():
    conn = sqlite3.connect(sqldbname)
    cursor = conn.cursor()
    cursor.execute(
        "select STRFTIME('%d/%m',Orders.order_id), count(*) from Order_details, Orders where Order_details.order_id = Orders.order_id group by create_at ORDER by create_at LIMIT 7"
    )
    totals = cursor.fetchall()
    order_by_days = []
    for day in totals:
        order_by_days.append({"name": day[0], "stat": day[1]})
    cursor.execute("select count(*) from Order_details")
    totals = cursor.fetchone()
    conn.close()
    return jsonify({"order_by_days": order_by_days, "total_order": totals[0]})

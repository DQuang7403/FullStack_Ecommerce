from flask import Blueprint, jsonify
from flask_cors import CORS
import sqlite3

admin_order = Blueprint("admin_order", __name__)
sqldbname = "Ecommerce.db"
CORS(admin_order, origins="http://localhost:3000", supports_credentials=True)


@admin_order.route("/orders")
def get_orders():
    conn = sqlite3.connect(sqldbname)
    cursor = conn.cursor()
    cursor.execute(
        "SELECT Orders.order_id, username, status, create_at, SUM(price) as Totals from Orders, Order_details where Orders.order_id = Order_details.order_id GROUP BY Orders.order_id"
    )
    orders = cursor.fetchall()
    orders_list = []
    for order in orders:
        orders_list.append(
            {
                "order_id": order[0],
                "username": order[1],
                "status": order[2],
                "create_at": order[3],
                "totals": order[4],
            }
        )
    return jsonify(orders_list), 200


@admin_order.route("/orders/<int:id>")
def get_order_by_id(id):
    conn = sqlite3.connect(sqldbname)
    cursor = conn.cursor()
    sqlcommand = "select * from Orders where order_id = ?"
    cursor.execute(sqlcommand, (id,))
    general_details = cursor.fetchone()
    personal_details = {
        "order_id": general_details[0],
        "username": general_details[1],
        "email": general_details[2],
        "address": general_details[3],
        "phone": general_details[4],
        "status": general_details[5],
        "create_at": general_details[6],
    }

    sqlcommand = "select product_name, price, quantity from Orders, Order_details where Orders.order_id = Order_details.order_id and Order_details.order_id = ?"
    cursor.execute(sqlcommand, (id,))
    order_details_list = []
    details = cursor.fetchall()
    cursor.close()
    for item in details:
        order_details_list.append(
            {
                "product_name": item[0],
                "price": item[1],
                "quantity": item[2],
            }
        )

    return jsonify({"personal": personal_details, "details": order_details_list})



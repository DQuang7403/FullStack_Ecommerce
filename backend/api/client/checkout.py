from flask import Blueprint, request, jsonify, session
from flask_cors import CORS
import os
from dotenv import load_dotenv
import stripe
import sqlite3
import json
import datetime

checkout = Blueprint("checkout", __name__)
sqldbname = "backend/Ecommerce.db"
CORS(checkout, origins="http://localhost:5173", supports_credentials=True)

load_dotenv()
stripe_keys = {
    "secret_key": os.getenv("STRIPE_SECRET_KEY"),
    "public_key": os.getenv("STRIPE_PUBLIC_KEY"),
    "endpoint_secret": os.getenv("ENDPOINT_SECRET"),
}
stripe.api_key = stripe_keys["secret_key"]
def connect_db():
    conn = sqlite3.connect(sqldbname)
    cursor = conn.cursor()
    return conn, cursor
def map_items(current_cart):
    return [
        {
            "price_data": {
                "currency": "usd",
                "product_data": {
                    "name": item["title"],
                    "images": [item["thumbnail"]],
                },
                "unit_amount": round(item["price"] * 100),
            },
            "quantity": item["quantity"],
        }
        for item in current_cart
    ]


@checkout.route("/create-checkout-session", methods=["POST"])
def payment():
    current_cart = session.get("cart", [])
    print("Its still working")
    checkoutSession = stripe.checkout.Session.create(
        line_items=map_items(current_cart),
        mode="payment",
        success_url=f"{os.getenv('CLIENT_URL')}/",
        cancel_url=f"{os.getenv('CLIENT_URL')}/yourcart",
        phone_number_collection={"enabled": True},
        shipping_address_collection={"allowed_countries": ["VN", "US"]},
    )

    return jsonify({"url": checkoutSession.url}), 200


endpoint_secret = stripe_keys["endpoint_secret"]


@checkout.route("/webhook", methods=["POST"])
def webhook():
    event = None
    payload = request.data
    try:
        event = json.loads(payload)
    except json.decoder.JSONDecodeError as e:
        print("Webhook error while parsing basic request." + str(e))
        return jsonify(success=False)
    if endpoint_secret:
        # Only verify the event if there is an endpoint secret defined
        # Otherwise use the basic event deserialized with json
        sig_header = request.headers.get("STRIPE_SIGNATURE")
        try:
            event = stripe.Webhook.construct_event(payload, sig_header, endpoint_secret)
        except stripe.error.SignatureVerificationError as e:
            print("Webhook signature verification failed." + str(e))
            return jsonify(success=False)

    # Handle the event
    if event["type"] == "checkout.session.completed":
        print("Webhook received!", flush=True)
        conn, cursor = connect_db()
        cursor.execute(
            "INSERT INTO Orders (username, email, address, phone, status, create_at) VALUES (?, ?, ?, ?, ?, ?)",
            (
                event["data"]["object"]["customer_details"]["name"],
                event["data"]["object"]["customer_details"]["email"],
                event["data"]["object"]["customer_details"]["address"]["line1"],
                event["data"]["object"]["customer_details"]["phone"],
                "Paid",
                datetime.datetime.now(),
            ),
        )
        conn.commit()
        order_id = cursor.lastrowid
        checkoutSession = stripe.checkout.Session.retrieve(
            event["data"]["object"]["id"],
            expand=["line_items"],
        )
        line_items = checkoutSession.line_items
        session.pop("cart", None)
        for item in line_items["data"]:
            print(
                order_id,
                item["description"],
                (item["amount_total"] / 100),
                item["quantity"],
                flush=True,
            )
            sqlcommand = "INSERT INTO Order_details (order_id, product_name, price, quantity) VALUES (?, ?, ?, ?)"
            cursor.execute(
                sqlcommand,
                (
                    order_id,
                    item["description"],
                    (item["amount_total"] / 100),
                    item["quantity"],
                ),
            )  
            cursor.execute(
                "Update Products set stocks = stocks - ? where title = ?", (item["quantity"], item["description"]),
            )
        conn.commit()
        conn.close()

    elif event["type"] == "checkout.session.expired":
        checkoutSession = event["data"]["object"]
    else:
        return "Received unknown event type", 400

    return jsonify(success=True), 200


@checkout.route("/orders/<email>", methods=["GET"])
def get_orders_by_email(email):
    order_overview = []
    conn, cursor = connect_db()
    cursor.execute(
        "select Orders.order_id, status, create_at, SUM(price) as Totals from Orders, Order_details where Order_details.order_id = Orders.order_id and Orders.email = ? GROUP BY Orders.order_id",
        (email,),
    )
    orders = cursor.fetchall()
    for order in orders:
        order_overview.append(
            {
                "order_id": order[0],
                "status": order[1],
                "create_at": order[2],
                "total": order[3],
            }
        )
    conn.close()
    return jsonify(order_overview)


@checkout.route("/order-details/<int:id>", methods=["GET"])
def get_order_details(id):
    order_details = []
    conn, cursor = connect_db()
    cursor.execute("SELECT * FROM Orders WHERE order_id = ?", (id,))
    orderOverview = cursor.fetchone()
    cursor.execute(
        "SELECT Order_details.price AS order_price, quantity, thumbnail, Products.price AS product_price, title FROM Order_details, Products WHERE Order_details.product_name = Products.title AND Order_details.order_id = ?",
        (id,),
    )
    order = cursor.fetchall()
    for item in order:
        order_details.append(
            {
                "total_price": item[0],
                "quantity": item[1],
                "thumbnail": item[2],
                "price": item[3],
                "title": item[4],
            }
        )
    conn.close()
    return jsonify({"Order_details": order_details, "Order_overview": orderOverview})


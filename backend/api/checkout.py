from flask import Blueprint, request, jsonify, session
from flask_cors import CORS
import os
from dotenv import load_dotenv
import stripe
import sqlite3
import json

checkout = Blueprint("checkout", __name__)
sqldbname = "backend/Ecommerce.db"
CORS(checkout, origins="http://localhost:5173", supports_credentials=True)

load_dotenv()
stripe_keys = {
    "secret_key": os.getenv("STRIPE_SECRET_KEY"),
    "public_key": os.getenv("STRIPE_PUBLIC_KEY"),
}
stripe.api_key = stripe_keys["secret_key"]


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


endpoint_secret = "whsec_P5ZiCVDa4aTSBpXPyjpMMoBSqtPJZEb8"


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
        conn = sqlite3.connect(sqldbname)
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO Orders (username, email, address, phone, status) VALUES (?, ?, ?, ?, ?)",
            (
                event["data"]["object"]["customer_details"]["name"],
                event["data"]["object"]["customer_details"]["email"],
                event["data"]["object"]["customer_details"]["address"]["line1"],
                event["data"]["object"]["customer_details"]["phone"],
                1,
            ),
        )
        conn.commit()

        print(
            event["data"]["object"]["customer_details"]["name"],
            event["data"]["object"]["customer_details"]["email"],
            event["data"]["object"]["customer_details"]["address"]["line1"],
            event["data"]["object"]["customer_details"]["phone"],
            flush=True,
        )
        order_id = cursor.lastrowid
        checkoutSession = stripe.checkout.Session.retrieve(
            event["data"]["object"]["id"],
            expand=["line_items"],
        )
        # session.pop("cart-fb3d482f-f9b1-4596-8778-2b2693e1c5b0", None)
        line_items = checkoutSession.line_items

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
        conn.commit()
        conn.close()
        session.pop("cart", None)

    elif event["type"] == "checkout.session.expired":
        checkoutSession = event["data"]["object"]
    else:
        return "Received unknown event type", 400

    return jsonify(success=True), 200

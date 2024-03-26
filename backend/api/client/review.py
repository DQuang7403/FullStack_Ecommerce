from flask import Flask, Blueprint, request, jsonify
import sqlite3
from flask_cors import CORS
import datetime

review = Blueprint("review", __name__)
sqldbname = "Ecommerce.db"
CORS(review, origins="http://localhost:5173", supports_credentials=True)


def checkOrder(email, product_name):
    conn = sqlite3.connect(sqldbname)
    cursor = conn.cursor()
    sqlcommand = "Select product_name, email from Order_details, Orders where Orders.order_id = Order_details.order_id and Order_details.product_name = ? and Orders.email = ?"
    cursor.execute(sqlcommand, (product_name, email))
    order = cursor.fetchone()
    conn.close()
    if order:
        return True
    else:
        return False


@review.route("/review/add", methods=["POST"])
def add_review():
    product_name = request.json["product_name"]
    rating = request.json["rating"]
    email = request.json["email"]
    comment = request.json["comment"]
    if checkOrder(email, product_name):
        conn = sqlite3.connect(sqldbname)
        cursor = conn.cursor()
        sqlcommand = "INSERT INTO Reviews (product_name, rating, email, comment, create_at) VALUES (?, ?, ?, ?, ?)"
        cursor.execute(
            sqlcommand, (product_name, rating, email, comment, datetime.datetime.now())
        )
        conn.commit()
        conn.close()
        return jsonify({"message": "Review added successfully"}), 200
    else:
        return jsonify({"message": "You have not ordered yet"}), 400


@review.route("/review/get/<name>", methods=["GET"])
def get_reviews(name):
    all_reviews = []
    conn = sqlite3.connect(sqldbname)
    cursor = conn.cursor()
    sqlcommand = "SELECT * FROM Reviews WHERE product_name = ?"
    cursor.execute(sqlcommand, (name,))
    reviews = cursor.fetchall()
    for row in reviews:
        cursor.execute("Select username from User where email = ?", (row[1],))
        username = cursor.fetchone()[0]
        all_reviews.append(
            {
                "id": row[0],
                "email": row[1],
                "username": username,
                "product_name": row[2],
                "rating": row[3],
                "comment": row[4],
                "create_at": row[5],
            }
        )
    conn.close()
    return jsonify(all_reviews)


@review.route("/review/report", methods=["POST"])
def report_review():
    review_id = request.json["review_id"]
    email = request.json["user_email"]
    reason = request.json["report_reason"]
    conn = sqlite3.connect(sqldbname)
    cursor = conn.cursor()
    cursor.execute(
        "Insert into Reported_reviews (review_id, user_email, reason, status, report_timestamp) values (?, ?, ?, ?, ? )",
        (review_id, email, reason, "Pending", datetime.datetime.now()),
    )
    conn.commit()
    conn.close()
    return jsonify({"message": "Reported successfully"}), 200


@review.route("/review/report/get/<email>", methods=["GET"])
def get_review_reports(email):
    user_reported_reviews = []
    conn = sqlite3.connect(sqldbname)
    cursor = conn.cursor()
    cursor.execute("Select * from Reported_reviews where user_email = ?", (email,))
    reports = cursor.fetchall()
    for row in reports:
        user_reported_reviews.append(
            {
                "id": row[0],
                "review_id": row[1],
                "email": row[2],
                "reason": row[3],
                "status": row[4],
                "report_timestamp": row[5],
            }
        )
    conn.close()
    return jsonify(user_reported_reviews)


@review.route("/review/user/get/<email>", methods=["GET"])
def get_user_reviews(email):
    user_reviews = []
    conn = sqlite3.connect(sqldbname)
    cursor = conn.cursor()
    cursor.execute("Select * from Reviews where email = ?", (email,))
    reviews = cursor.fetchall()
    for row in reviews:
        user_reviews.append(
            {
                "id": row[0],
                "email": row[1],
                "product_name": row[2],
                "rating": row[3],
                "comment": row[4],
                "create_at": row[5],
                "product_id": row[6],
            }
        )
    conn.close()
    return jsonify(user_reviews)

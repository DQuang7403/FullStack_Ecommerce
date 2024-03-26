import sqlite3
from flask import Blueprint, jsonify, request
from flask_cors import CORS

reviews = Blueprint("reviews", __name__)
sqldbname = "Ecommerce.db"
CORS(reviews, origins="http://localhost:3000", supports_credentials=True)


@reviews.route("/get_reviews", methods=["GET"])
def get_reviews():
    conn = sqlite3.connect(sqldbname)
    cursor = conn.cursor()
    sqlcommand = "SELECT review_id, email, rating, comment, create_at FROM Reviews"
    cursor.execute(sqlcommand)
    reviews = cursor.fetchall()
    all_reviews = []
    for row in reviews:
        cursor.execute(
            "SELECT reason, report_timestamp FROM Reported_reviews JOIN Reviews On Reviews.review_id = Reported_reviews.review_id WHERE Reported_reviews.review_id = ?",
            (row[0],),
        )
        report = cursor.fetchall()
        all_reviews.append(
            {
                "review_id": row[0],
                "email": row[1],
                "rating": row[2],
                "comment": row[3],
                "create_at": row[4],
                "report_details": report,
            }
        )
    conn.close()
    return jsonify(all_reviews)

@reviews.route("/delete_review/<int:id>", methods=["DELETE"])
def delete_review(id):
    conn = sqlite3.connect(sqldbname)
    cursor = conn.cursor()
    cursor.execute("Delete from Reviews where review_id = ?", (id,))
    conn.commit()
    cursor.execute("Delete from Reported_reviews where review_id = ?", (id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Review deleted successfully"}), 201

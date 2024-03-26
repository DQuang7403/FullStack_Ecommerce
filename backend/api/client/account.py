from flask import jsonify, Blueprint, request
import sqlite3
from flask_cors import CORS
from werkzeug.security import generate_password_hash

account = Blueprint("account", __name__)
sqldbname = "Ecommerce.db"
CORS(account, origins="http://localhost:5173", supports_credentials=True)


@account.route("/get_user/<email>", methods=["GET"])
def get_user(email):
    conn = sqlite3.connect(sqldbname)
    cur = conn.cursor()
    cur.execute("Select * from User where email = ?", (email,))
    user = cur.fetchone()
    if user:
        data = {
            "id": user[0],
            "username": user[1],
            "email": user[2],
            "password": user[3],
            "firstname": user[4],
            "lastname": user[5],
            "address": user[6],
            "phone": user[7],
        }
        return jsonify(data), 200
    return jsonify({"message": "User not found"}), 404


@account.route("/update", methods=["PUT"])
def update_user():
    conn = sqlite3.connect(sqldbname)
    cur = conn.cursor()
    password = request.json["password"]
    if password != "":
        new_password = generate_password_hash(
            password, method="pbkdf2:sha1", salt_length=8
        )
        cur.execute(
            "Update User set username = ?, email = ?, password = ?, firstname = ?, lastname = ?, address = ?, phone = ?, pwd = ? where user_id = ?",
            (
                request.json["username"],
                request.json["email"],
                new_password,
                request.json["firstname"],
                request.json["lastname"],
                request.json["address"],
                request.json["phone"],
                request.json["id"],
                password,
            ),
        )
    else:
        cur.execute(
            "Update User set username = ?, email = ?, firstname = ?, lastname = ?, address = ?, phone = ? where user_id = ?",
            (
                request.json["username"],
                request.json["email"],
                request.json["firstname"],
                request.json["lastname"],
                request.json["address"],
                request.json["phone"],
                request.json["id"],
            ),
        )
    conn.commit()
    conn.close()
    if cur.rowcount > 0:
        return jsonify({"message": "User updated successfully"}), 200
    else:
        return "user not found", 404


@account.route("/contact", methods=["POST"])
def contact():
    conn = sqlite3.connect(sqldbname)
    cur = conn.cursor()
    email = request.json["email"]
    name = request.json["name"]
    message = request.json["message"]
    phone = request.json["phone"]
    cur.execute(
        "INSERT INTO Contact (email, message, name, phone) VALUES (?, ?, ?, ?)",
        (email, message, name, phone),
    )
    conn.commit()
    conn.close()
    return jsonify({"message": "Contact created successfully"}), 201

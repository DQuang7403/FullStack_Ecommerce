from flask import Blueprint, jsonify, request
import sqlite3
from flask_cors import CORS
from werkzeug.security import generate_password_hash

users = Blueprint("users", __name__)
CORS(users, origins="http://localhost:3000", supports_credentials=True)
sqldbname = "backend/Ecommerce.db"


@users.route("/users", methods=["GET"])
def get_users():
    conn = sqlite3.connect(sqldbname)
    cursor = conn.cursor()
    cursor.execute(
        "SELECT user_id, username, email, firstname, lastname, address, phone, create_at from User"
    )
    users = cursor.fetchall()
    user_list = []
    for user in users:
        user_list.append(
            {
                "user_id": user[0],
                "username": user[1],
                "email": user[2],
                "firstname": user[3],
                "lastname": user[4],
                "address": user[5],
                "phone": user[6],
                "create_at": user[7],
            }
        )
    cursor.close()
    return jsonify(user_list)


@users.route("/users/<id>", methods=["GET"])
def get_user_by_id(id):
    conn = sqlite3.connect(sqldbname)
    cursor = conn.cursor()
    cursor.execute(
        "SELECT user_id, username, email, firstname, lastname, address, phone, pwd, create_at from User where user_id = ?",
        (id,),
    )
    user = cursor.fetchone()
    if user:
        data = {
            "user_id": user[0],
            "username": user[1],
            "email": user[2],
            "firstname": user[3],
            "lastname": user[4],
            "address": user[5],
            "phone": user[6],
            "pwd": user[7],
            "create_at": user[8],
        }
        return jsonify(data), 200
    return jsonify({"message": "User not found"}), 404


@users.route("/users/update/<id>", methods=["PUT"])
def update_user(id):
    conn = sqlite3.connect(sqldbname)
    cur = conn.cursor()
    password = request.json["pwd"]
    new_password = generate_password_hash(password, method="pbkdf2:sha1", salt_length=8)
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
            password,
            id,
        ),
    )
    conn.commit()
    conn.close()
    if cur.rowcount > 0:
        return jsonify({"message": "User updated successfully"}), 200
    else:
        return "User not found", 404


@users.route("/users/delete/<id>", methods=["DELETE"])
def delete_user(id):
    conn = sqlite3.connect(sqldbname)
    cur = conn.cursor()
    cur.execute("DELETE FROM User WHERE user_id = ?", (id,))
    conn.commit()
    conn.close()
    if cur.rowcount > 0:
        return jsonify({"message": "User deleted successfully"}), 200
    else:
        return "User not found", 404
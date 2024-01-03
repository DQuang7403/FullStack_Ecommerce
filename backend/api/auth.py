from flask import Blueprint, request, jsonify
import sqlite3
from functools import wraps
from flask_cors import CORS
from datetime import datetime
from flask_jwt_extended import (
    create_access_token,
    get_jwt,
    get_jwt_identity,
    jwt_required,
    create_refresh_token,
)

auth = Blueprint("auth", __name__)
sqldbname = "backend/Ecommerce.db"
CORS(auth, origins="http://localhost:5173", supports_credentials=True)


def authenticated_user(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        conn = sqlite3.connect(sqldbname)
        cursor = conn.cursor()
        jti = get_jwt()["jti"]
        cursor.execute("SELECT 1 FROM revoked_tokens WHERE jti=?", (jti,))
        if cursor.fetchone():
            return jsonify({"msg": "Invalid token"}), 401
        return f(*args, **kwargs)

    return decorated_function


def register_user(username, email, password):
    conn = sqlite3.connect(sqldbname)
    cur = conn.cursor()
    cur.execute("Select * from User where email = ?", (email,))
    exsited = cur.fetchone()
    if exsited:
        return False
    sqlcommand = "Insert into User (username, email, password) values (?, ?, ?)"
    cur.execute(sqlcommand, (username, email, password))
    conn.commit()
    conn.close()
    return True


def get_user(email, password):
    result = []
    conn = sqlite3.connect(sqldbname)
    cur = conn.cursor()
    sqlcommand = "Select * from User where email = ? and password = ? "
    cur.execute(sqlcommand, (email, password))
    obj_user = cur.fetchone()
    if obj_user:
        result = obj_user
    conn.close()
    return result


@auth.route("/register", methods=["POST"])
def register():
    username = request.json["username"]
    email = request.json["email"]
    password = request.json["password"]
    if register_user(username, email, password):
        return jsonify({"msg": "User created successfully"}), 201
    return jsonify({"msg": "Email already exists"}), 409


@auth.route("/login", methods=["POST"])
def create_token():
    email = request.json["email"]
    password = request.json["password"]
    user = get_user(email, password)
    if not user:
        return jsonify({"msg": "Please check your login details"}), 401
    access_token = create_access_token(identity=email)
    refresh_token = create_refresh_token(identity=email)
    return (
        jsonify({"access_token": access_token, "refresh_token": refresh_token}),
        200,
    )


@auth.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh_access():
    identity = get_jwt_identity()
    conn = sqlite3.connect(sqldbname)
    cur = conn.cursor()
    jwt = get_jwt()
    jti = jwt["jti"]
    cur.execute(
        """
        INSERT INTO Revoked_tokens (jti, blacklisted_on)
        VALUES (?, ?)
        """,
        (jti, datetime.now()),
    )
    conn.commit()
    # expiry_limit = datetime.datetime.now() - datetime.timedelta(days=30)
    # cur.execute("DELETE FROM revoked_tokens WHERE blacklisted_on < ?", (expiry_limit,))
    new_access_token = create_access_token(identity=identity)

    return jsonify({"access_token": new_access_token}), 200


@auth.route("/user", methods=["GET"])
@jwt_required()
@authenticated_user
def index():
    response_body = {
        "name": "Felix",
        "about": "Hello! I'm a full stack developer that loves python and javascript",
    }
    return response_body

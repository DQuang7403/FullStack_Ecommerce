import datetime
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    get_jwt,
    get_jwt_identity,
    jwt_required,
)
from flask_cors import CORS
from flask import Blueprint, jsonify, request
import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash

adminAuth = Blueprint("adminAuth", __name__)
sqldbname = "backend/Ecommerce.db"
CORS(adminAuth, origins="http://localhost:3000", supports_credentials=True)


def connect_db():
    conn = sqlite3.connect(sqldbname)
    cursor = conn.cursor()
    return conn, cursor


def get_employee(email):
    conn, cursor = connect_db()
    cursor.execute("Select * from Employee where email = ?", (email,))
    employee = cursor.fetchone()
    if employee:
        return employee
    conn.close()
    return False


def register_employee(
    email, hash_password, password, address, phone, firstname, lastname
):
    conn, cursor = connect_db()
    cursor.execute("Select * from Employee where email = ?", (email,))
    exsited = cursor.fetchone()
    if exsited:
        return False
    sqlcommand = "Insert into Employee (email, password, pwd, address, phone, firstname, lastname) values (?, ?, ?, ?, ?, ?, ?)"
    cursor.execute(
        sqlcommand,
        (email, hash_password, password, address, phone, firstname, lastname),
    )
    conn.commit()
    conn.close()
    return True


@adminAuth.route("/login", methods=["POST"])
def login_employee():
    email = request.json["email"]
    password = request.json["password"]
    employee = get_employee(email)
    if not employee or not check_password_hash(password=password, pwhash=employee[2]):
        return jsonify({"msg": "Please check your login details"}), 401
    access_token = create_access_token(identity=email)
    refresh_token = create_refresh_token(identity=email)
    return jsonify({"access_token": access_token, "refresh_token": refresh_token}), 200


@adminAuth.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh_access():
    conn, cursor = connect_db()
    identity = get_jwt_identity()
    jwt = get_jwt()
    jti = jwt["jti"]
    cursor.execute(
        """
        INSERT INTO Revoked_tokens (jti, blacklisted_on)
        VALUES (?, ?)
        """,
        (jti, datetime.datetime.now()),
    )
    conn.commit()
    expiry_limit = datetime.datetime.now() - datetime.timedelta(days=5)
    cursor.execute(
        "DELETE FROM revoked_tokens WHERE blacklisted_on < ?", (expiry_limit,)
    )
    conn.commit()
    conn.close()
    new_access_token = create_access_token(identity=identity)

    return (
        jsonify({"access_token": new_access_token}),
        200,
    )


@adminAuth.route("/add_employee", methods=["POST"])
def create_new_employee():
    email = request.json["eEmail"]
    password = request.json["ePassword"]
    address = request.json["address"]
    phone = request.json["phone"]
    firstname = request.json["Fname"]
    lastname = request.json["Lname"]
    hash_password = generate_password_hash(
        password=password, method="pbkdf2:sha1", salt_length=8
    )
    if register_employee(
        email, hash_password, password, address, phone, firstname, lastname
    ):
        return jsonify({"msg": "Employee created successfully"}), 201
    return jsonify({"msg": "Email already exists"}), 409


@adminAuth.route("/get_employee", methods=["GET"])
def get_employee_details():
    conn, cursor = connect_db()
    cursor.execute("Select * from Employee")
    employees = cursor.fetchall()
    employee_list = []
    for employee in employees:
        employee_list.append(
            {
                "employee_id": employee[0],
                "email": employee[1],
                "address": employee[6],
                "phone": employee[7],
                "firstname": employee[4],
                "lastname": employee[5],
                "password": employee[3],
            }
        )
    conn.close()
    return jsonify(employee_list)


@adminAuth.route("/delete_employee/<int:id>", methods=["DELETE"])
def delete_employee(id):
    conn, cursor = connect_db()
    cursor.execute("Delete from Employee where employee_id = ?", (id,))
    conn.commit()
    conn.close()
    if cursor.rowcount > 0:
        return jsonify({"message": "Employee deleted successfully"}), 201
    return "Employee not found", 404


@adminAuth.route("/edit_employee/<int:id>", methods=["PUT"])
def edit_employee(id):
    conn, cursor = connect_db()
    email = request.json["email"]
    address = request.json["address"]
    phone = request.json["phone"]
    firstname = request.json["firstname"]
    lastname = request.json["lastname"]
    password = request.json["password"]
    hash_password = generate_password_hash(
        password=password, method="pbkdf2:sha1", salt_length=8
    )
    cursor.execute("Select * from Employee where employee_id = ?", (id,))
    exsited = cursor.fetchone()
    if exsited:
        sqlcommand = "Update Employee set email = ?, address = ?, phone = ?, firstname = ?, lastname = ? , pwd = ?, password = ? where employee_id = ?"
        cursor.execute(
            sqlcommand,
            (
                email,
                address,
                phone,
                firstname,
                lastname,
                password,
                hash_password,
                id,
            ),
        )
        conn.commit()
        conn.close()
        return jsonify({"message": "Employee updated successfully"}), 201
    else:
        return "Employee not found", 404

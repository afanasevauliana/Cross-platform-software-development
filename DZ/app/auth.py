from flask import Blueprint, jsonify, request, session
from werkzeug.security import check_password_hash, generate_password_hash
from .database import get_connection

auth_blueprint = Blueprint("auth", __name__)

@auth_blueprint.post("/register")
def register():
    data = request.get_json() or {}
    username = data.get("username", "").strip()
    password = data.get("password", "")

    if not username or not password:
        return jsonify({"message": "Заполните логин и пароль"}), 400

    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute("SELECT id FROM users WHERE username = %s", (username,))
            if cursor.fetchone():
                return jsonify({"message": "Такой пользователь уже существует"}), 409

            cursor.execute(
                "INSERT INTO users (username, password_hash) VALUES (%s, %s)",
                (username, generate_password_hash(password)),
            )
            user_id = cursor.lastrowid

    session["user_id"] = user_id
    session["username"] = username
    return jsonify({"username": username}), 201


@auth_blueprint.post("/login")
def login():
    data = request.get_json() or {}
    username = data.get("username", "").strip()
    password = data.get("password", "")

    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT id, username, password_hash FROM users WHERE username = %s",
                (username,),
            )
            user = cursor.fetchone()

    if not user or not check_password_hash(user["password_hash"], password):
        return jsonify({"message": "Неверный логин или пароль"}), 401

    session["user_id"] = user["id"]
    session["username"] = user["username"]
    return jsonify({"username": user["username"]})


@auth_blueprint.get("/me")
def current_user():
    if "user_id" not in session:
        return jsonify({"message": "Требуется авторизация"}), 401
    return jsonify({"username": session["username"]})


@auth_blueprint.post("/logout")
def logout():
    session.clear()
    return jsonify({"message": "Вы вышли из системы"})

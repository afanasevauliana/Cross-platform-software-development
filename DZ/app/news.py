from flask import Blueprint, jsonify, request, session
from .database import get_connection

news_blueprint = Blueprint("news", __name__)

def unauthorized_response():
    return jsonify({"message": "Требуется авторизация"}), 401

@news_blueprint.get("")
def get_news():
    if "user_id" not in session:
        return unauthorized_response()

    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT news.id, news.title, news.category,
                       news.published_date AS date, users.username AS author
                FROM news
                JOIN users ON users.id = news.author_id
                ORDER BY news.id DESC
                """
            )
            items = cursor.fetchall()

    for item in items:
        item["date"] = item["date"].isoformat()
    return jsonify(items)


@news_blueprint.post("")
def add_news():
    if "user_id" not in session:
        return unauthorized_response()

    data = request.get_json() or {}
    title = data.get("title", "").strip()
    category = data.get("category", "")
    published_date = data.get("date", "")

    if not title or not category or not published_date:
        return jsonify({"message": "Заполните все поля"}), 400

    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                INSERT INTO news (title, category, published_date, author_id)
                VALUES (%s, %s, %s, %s)
                """,
                (title, category, published_date, session["user_id"]),
            )

    return jsonify({"message": "Новость добавлена"}), 201


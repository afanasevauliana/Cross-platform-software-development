import json
import secrets
from pathlib import Path
import pymysql
from flask import current_app
from werkzeug.security import generate_password_hash

INITIAL_NEWS_FILE = Path(__file__).resolve().parent.parent / "news.json"
EDITOR_USERNAME = "\u0420\u0435\u0434\u0430\u043a\u0446\u0438\u044f"

def get_connection():
    return pymysql.connect(
        host=current_app.config["MYSQL_HOST"],
        port=current_app.config["MYSQL_PORT"],
        user=current_app.config["MYSQL_USER"],
        password=current_app.config["MYSQL_PASSWORD"],
        database=current_app.config["MYSQL_DATABASE"],
        charset="utf8mb4",
        cursorclass=pymysql.cursors.DictCursor,
        autocommit=True,
    )


def init_database():
    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                CREATE TABLE IF NOT EXISTS users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    username VARCHAR(50) UNIQUE NOT NULL,
                    password_hash VARCHAR(255) NOT NULL
                )
                """
            )
            cursor.execute(
                """
                CREATE TABLE IF NOT EXISTS news (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    title VARCHAR(200) NOT NULL,
                    category VARCHAR(50) NOT NULL,
                    published_date DATE NOT NULL,
                    author_id INTEGER NOT NULL REFERENCES users(id)
                )
                """
            )
            cursor.execute(
                """
                SELECT COUNT(*) AS count
                FROM news JOIN users ON users.id = news.author_id
                WHERE users.username = %s
                """,
                (EDITOR_USERNAME,),
            )
            if cursor.fetchone()["count"] == 0:
                add_initial_news(cursor)


def add_initial_news(cursor):
    cursor.execute(
        """
        INSERT IGNORE INTO users (username, password_hash)
        VALUES (%s, %s)
        """,
        (EDITOR_USERNAME, generate_password_hash(secrets.token_urlsafe(32))),
    )
    cursor.execute("SELECT id FROM users WHERE username = %s", (EDITOR_USERNAME,))
    author_id = cursor.fetchone()["id"]

    with INITIAL_NEWS_FILE.open("r", encoding="utf-8") as file:
        initial_news = json.load(file)

    rows = []
    for item in initial_news:
        rows.append((item["title"], item["category"], item["date"], author_id))

    cursor.executemany(
        """
        INSERT INTO news (title, category, published_date, author_id)
        VALUES (%s, %s, %s, %s)
        """,
        rows,
    )

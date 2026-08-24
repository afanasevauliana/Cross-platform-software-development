import os

from flask import Flask

from .database import init_database


def create_app():
    app = Flask(__name__)
    app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "student-secret-key")
    app.config["MYSQL_HOST"] = os.environ.get("MYSQL_HOST", "127.0.0.1")
    app.config["MYSQL_PORT"] = int(os.environ.get("MYSQL_PORT", "3306"))
    app.config["MYSQL_USER"] = os.environ.get("MYSQL_USER", "root")
    app.config["MYSQL_PASSWORD"] = os.environ.get("MYSQL_PASSWORD", "")
    app.config["MYSQL_DATABASE"] = os.environ.get("MYSQL_DATABASE", "news_portal")

    from .auth import auth_blueprint
    from .news import news_blueprint

    app.register_blueprint(auth_blueprint, url_prefix="/api/auth")
    app.register_blueprint(news_blueprint, url_prefix="/api/news")

    with app.app_context():
        init_database()

    return app

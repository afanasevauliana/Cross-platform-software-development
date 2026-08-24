from flask import Flask, jsonify, render_template, request
from .model import add_news as save_news, get_news
app = Flask(__name__)
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/economics")
def economics():
    return render_template("economics.html")

@app.route("/culture")
def culture():
    return render_template("culture.html")

@app.route("/news/add")
def add_news():
    return render_template("adding_news.html")

@app.route("/api/news", methods=["GET", "POST"])
def news_api():
    if request.method == "GET":
        return jsonify(get_news())
    data = request.get_json()
    if not data or not data.get("title", "").strip() or not data.get("category") or not data.get("date"):
        return jsonify({"message": "Заполните все поля"}), 400

    news_item = {
        "title": data["title"].strip(),
        "category": data["category"],
        "date": data["date"]
    }
    save_news(news_item)

    return jsonify({"message": "Новость добавлена"}), 201

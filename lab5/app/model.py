import json
from pathlib import Path

NEWS_FILE = Path(__file__).resolve().parent.parent / "news.json"

def get_news():
    """Возвращает список новостей из JSON-файла."""
    with NEWS_FILE.open("r", encoding="utf-8") as file:
        return json.load(file)

def add_news(news_item):
    """Добавляет новость и сохраняет обновлённый список в JSON-файл."""
    news = get_news()
    news.append(news_item)
    with NEWS_FILE.open("w", encoding="utf-8") as file:
        json.dump(news, file, ensure_ascii=False, indent=4)

<?php
    require_once "auth_check.php";
?>


<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Добавление новости</title>
    <link rel="icon" href="favicon.ico">
    <link rel="stylesheet" href="style.css">
    <script src="js/news.js" defer></script>
</head>
<body>
    <p class="navigation">
        <a href="index.php">Главная</a>
        <a href="economics.php">Экономика</a>
        <a href="culture.php">Культура</a>
        <a href="adding_news.php">Добавить новость</a>
        <a href="logout.php">Выйти</a>
    </p>

    <img src="c.webp" width="100%" height="210">

    <h2 id="main-title">Добавление новостей</h2>
    <p>Здесь вы можете добавить свою новость.</p>

    <form id="news-form">
        <p>
            <label for="title">Название новости:</label><br>
            <input type="text" id="title" name="title" required>
        </p>
        <p>
            <label for="category">Категория:</label><br>
            <select id="category" name="category" required>
                <option value="">Выберите категорию</option>
                <option value="Экономика">Экономика</option>
                <option value="Культура">Культура</option>
                <option value="Город">Город</option>
                <option value="Общество">Общество</option>
                <option value="Политика">Политика</option>
                <option value="Наука">Наука</option>
                <option value="Технологии">Технологии</option>
                <option value="Спорт">Спорт</option>
                <option value="Происшествия">Происшествия</option>
            </select>
        </p>
        <p>
            <label for="date">Дата:</label><br>
            <input type="date" id="date" name="date" required>
        </p>

        <input type="submit" value="Добавить новость">
    </form>

    <p id="message"></p>

</body>
</html>

<?php
    // Читаем всё содержимое файла news.json.
    $str = file_get_contents("news.json");

    // Если файл не удалось прочитать, останавливаем программу.
    if ($str === false)
    {
        die("Не удалось прочитать файл с новостями");
    }

    // Преобразуем текст из JSON-файла в обычный PHP-массив.
    $news = json_decode($str, true);

    // Обработка полученной формы
    // Этот блок выполняется только после отправки формы методом POST
    if ($_SERVER["REQUEST_METHOD"] == "POST")
    {
        $title = $_POST["title"];
        $category = $_POST["category"];
        $date = $_POST["date"];

        // Проверяем, что пользователь заполнил все поля.
        if ($title != "" && $category != "" && $date != "")
        {
            // Создаём новую новость в виде массива.
            $newItem = [
                "title" => $title,
                "category" => $category,
                "date" => $date
            ];

            // Добавляем новую новость в конец массива существующих новостей.
            $news[] = $newItem;

            // Открываем JSON-файл в режиме записи.
            // Режим w заменяет старое содержимое файла новым.
            $fd = fopen("news.json", "w")
                or die("Не удалось открыть файл для записи");

            // Преобразуем PHP-массив обратно в JSON и записываем его в файл.
            // JSON_UNESCAPED_UNICODE сохраняет русские буквы в обычном виде.
            // JSON_PRETTY_PRINT делает содержимое файла удобным для чтения.
            fwrite(
                $fd,
                json_encode($news, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT)
            );
            fclose($fd);
        }
    }
?>


<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Добавление новости</title>
    <link rel="icon" href="favicon.ico">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <p class="navigation">
        <a href="index.php">Главная</a>
        <a href="economics.html">Экономика</a>
        <a href="culture.html">Культура</a>
        <a href="adding_news.php">Добавить новость</a>
    </p>

    <img src="c.webp" width="100%" height="210">

    <h2 id="main-title">Добавление новостей</h2>
    <p>Здесь вы можете добавить свою новость.</p>

    <form method="post" action="adding_news.php">
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

</body>
</html>

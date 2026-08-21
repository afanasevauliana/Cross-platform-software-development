<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Авторизация</title>
    <link rel="icon" href="favicon.ico">
    <link rel="stylesheet" href="style.css">
    <script src="js/auth.js" defer></script>
</head>
<body>
    <h1>Авторизация</h1>

    <form id="login-form">
        <p>
            <label for="login">Логин:</label><br>
            <input type="text" id="login" name="login">
        </p>

        <p>
            <label for="password">Пароль:</label><br>
            <input type="password" id="password" name="password">
        </p>

        <button type="submit">Войти</button>
    </form>

    <p id="message"></p>
    <p><a href="register.php">Зарегистрироваться</a></p>
</body>
</html>

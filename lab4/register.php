<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Регистрация</title>
    <link rel="icon" href="favicon.ico">
    <link rel="stylesheet" href="style.css">
    <script src="js/auth.js" defer></script>
</head>
<body>
    <h1>Регистрация</h1>

    <form id="register-form">
        <p>
            <label for="login">Логин:</label><br>
            <input type="text" id="login" name="login">
        </p>

        <p>
            <label for="password">Пароль:</label><br>
            <input type="password" id="password" name="password">
        </p>

        <p>
            <label for="password-repeat">Повторите пароль:</label><br>
            <input type="password" id="password-repeat" name="password-repeat">
        </p>

        <button type="submit">Зарегистрироваться</button>
    </form>

    <p id="message"></p>
    <p><a href="login.php">Уже есть учётная запись</a></p>
</body>
</html>

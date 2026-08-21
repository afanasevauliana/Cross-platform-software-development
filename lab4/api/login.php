<?php
header("Content-Type: application/json; charset=utf-8");
session_start();

$data = json_decode(file_get_contents("php://input"), true);
$login = $data["login"];
$password = $data["password"];

$str = file_get_contents("../users.json")
    or die(json_encode(["success" => false, "message" => "Не удалось прочитать файл пользователей"]));

$users = json_decode($str, true);

foreach ($users as $user) {
    if ($user["login"] == $login && $user["password"] == $password) {
        $_SESSION["user"] = $login;

        echo json_encode([
            "success" => true,
            "message" => "Авторизация выполнена"
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }
}

echo json_encode([
    "success" => false,
    "message" => "Неверный логин или пароль"
], JSON_UNESCAPED_UNICODE);

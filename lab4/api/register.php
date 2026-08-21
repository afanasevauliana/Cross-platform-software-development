<?php
// Принимает AJAX-запрос, добавляет пользователя в users.json и возвращает результат
header("Content-Type: application/json; charset=utf-8");

$data = json_decode(file_get_contents("php://input"), true);
$login = $data["login"];
$password = $data["password"];

$usersFile = "../users.json";
$str = file_get_contents($usersFile)
    or die(json_encode(["success" => false, "message" => "Не удалось прочитать файл пользователей"]));

$users = json_decode($str, true);

foreach ($users as $user) {
    if ($user["login"] == $login) {
        echo json_encode([
            "success" => false,
            "message" => "Пользователь с таким логином уже существует"
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }
}

$users[] = [
    "login" => $login,
    "password" => $password
];

$fd = fopen($usersFile, "w")
    or die(json_encode(["success" => false, "message" => "Не удалось открыть файл пользователей"]));

fwrite($fd, json_encode($users, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
fclose($fd);

echo json_encode([
    "success" => true,
    "message" => "Регистрация выполнена"
], JSON_UNESCAPED_UNICODE);

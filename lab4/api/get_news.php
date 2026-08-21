<?php
header("Content-Type: application/json; charset=utf-8");
session_start();

if (!isset($_SESSION["user"])) {
    http_response_code(401);
    echo json_encode(["message" => "Требуется авторизация"], JSON_UNESCAPED_UNICODE);
    exit;
}

$str = file_get_contents("../news.json")
    or die(json_encode(["message" => "Не удалось прочитать файл с новостями"]));

echo $str;

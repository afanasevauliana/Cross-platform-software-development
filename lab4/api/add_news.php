<?php
header("Content-Type: application/json; charset=utf-8");
session_start();

if (!isset($_SESSION["user"])) {
    http_response_code(401);
    echo json_encode(["message" => "Требуется авторизация"], JSON_UNESCAPED_UNICODE);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$newItem = [
    "title" => $data["title"],
    "category" => $data["category"],
    "date" => $data["date"]
];

$newsFile = "../news.json";
$str = file_get_contents($newsFile)
    or die(json_encode(["success" => false, "message" => "Не удалось прочитать файл с новостями"]));

$news = json_decode($str, true);
$news[] = $newItem;

$fd = fopen($newsFile, "w")
    or die(json_encode(["success" => false, "message" => "Не удалось открыть файл с новостями"]));

fwrite($fd, json_encode($news, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
fclose($fd);

echo json_encode([
    "success" => true,
    "message" => "Новость добавлена"
], JSON_UNESCAPED_UNICODE);

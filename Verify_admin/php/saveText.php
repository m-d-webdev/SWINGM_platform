<?php

include "../../MAINPHP/conn.php";
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $text_path = $_POST['text_path'];
    $text = $_POST['text'];
    $file = fopen('../../' . $text_path, 'w');
    fwrite($file, json_encode($text , JSON_UNESCAPED_UNICODE));
    fclose($file);
    echo "done";
}
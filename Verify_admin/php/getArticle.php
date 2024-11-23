<?php
include "../../MAINPHP/conn.php";

if ($_SERVER['REQUEST_METHOD'] == "GET") {
    $article_id= $_GET['article_id'];  
    $sql = "SELECT  a.title, a.article_text, a.article_type , a.date_post , u.first_name , u.last_name  , u.linkPRF FROM articles a , users u WHERE a.writer_id = u.user_id AND article_id = $article_id";
    $result = mysqli_query($con, $sql);
    $data = mysqli_fetch_assoc($result);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
}
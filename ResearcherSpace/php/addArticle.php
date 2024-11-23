<?php
include "C:/xamppn/htdocs/SWINGM2/MAINPHP/conn.php";

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $article_title = $_POST['article_title'];
    $article_content = $_POST['article_text'];
    $type_articl = $_POST['type_articl'];
    $user_id = $_POST['user_id'];
    $query=" INSERT INTO `articles`(`article_id`, `writer_id`, `title`, `article_text` ,`article_type`, `date_post`) VALUES (null,'$user_id','$article_title','$article_content', '$type_articl' ,now())";

    if (mysqli_query($con, $query)) {
        echo "done";
    } else {
        echo "error";
    }

}

<?php
include "../../MAINPHP/conn.php";
if ($_SERVER['REQUEST_METHOD'] == "GET") {
    $new_id = $_GET['new_id'];
    $sql = "SELECT `news_id`, `writer_id`, `title`, `type`, `content`, `link_paths`, `date_post` FROM news WHERE news_id = $new_id";
    $exu =  mysqli_query($con, $sql);
    $data = mysqli_fetch_assoc($exu);
    $data = json_encode($data, JSON_UNESCAPED_UNICODE);

    echo $data;
}

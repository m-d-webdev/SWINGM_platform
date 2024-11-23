<?php
include "conn.php";
if ($_SERVER['REQUEST_METHOD'] == "GET") {
    $user_id = $_GET['user_id'];
    $sql = "SELECT S.saved_id, S.content_type, S.date_saved  ,A.title , A.article_text FROM saved S , articles A WHERE S.saved_id = A.article_id AND S.user_id = '$user_id'";
    $result = mysqli_query($con, $sql);
    $data = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
}

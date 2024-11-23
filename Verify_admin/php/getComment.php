<?php
include "../../MAINPHP/conn.php";
if($_SERVER['REQUEST_METHOD'] == "GET"){

    $comment_id = $_GET['comment_id'];
    $table_name = $_GET['tableName'];
    $columnName = $_GET['columnName'];
    $sql = "SELECT c.* , u.first_name , u.last_name , u.linkPRF FROM $table_name c ,users u WHERE c.user_id = u.user_id AND $columnName = $comment_id";
     $result = mysqli_query($con, $sql);
    $data = mysqli_fetch_assoc($result);
    echo json_encode($data);
    
}
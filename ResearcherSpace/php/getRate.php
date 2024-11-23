<?php
include "../../MAINPHP/conn.php";
if($_SERVER['REQUEST_METHOD'] == "GET"){
    $user_id = $_GET['user_id'];
    $book_id = $_GET['book_id'];
    $query ="SELECT * FROM `ratings` WHERE `user_id` = '$user_id' AND `article_id` = '$book_id'";
    $result = mysqli_query($con, $query);
    if($result){
        $data = mysqli_fetch_assoc($result);
        echo json_encode($data , JSON_UNESCAPED_UNICODE);   
    }else{
        echo "error";
    }
}
<?php
include "../../MAINPHP/conn.php";
if($_SERVER['REQUEST_METHOD'] == "GET"){
    $book_id = $_GET['book_id'];
    $query = "SELECT * FROM `books`  WHERE `book_id` = '$book_id' ";
    $result = mysqli_query($con, $query);
    $data = mysqli_fetch_assoc($result);
    $q = "SELECT r.*  , u.first_name , u.last_name ,u.linkPRF FROM `ratings` r  ,users u WHERE r.`article_id` = '$book_id' AND r.type LIKE 'book' AND  r.user_id = u.user_id LIMIT 25";
    $data['ratings'] =[];
    $execRatings = mysqli_query($con  ,$q);
    while($row = mysqli_fetch_assoc($execRatings)){
        $data['ratings'][] = $row;
    }
    $data = json_encode($data , JSON_UNESCAPED_UNICODE);
    echo $data;
}
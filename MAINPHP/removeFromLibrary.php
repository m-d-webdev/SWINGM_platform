<?php
include "conn.php";
if($_SERVER['REQUEST_METHOD'] == "POST"){
    $user_id = $_POST['user_id'];
    $item_id = $_POST['item_id'];
    $sql = "DELETE FROM `library` WHERE `user_id` = '$user_id' AND `book_id` = '$item_id'";
    if(mysqli_query($con , $sql)){
        echo "success";
    }    
}
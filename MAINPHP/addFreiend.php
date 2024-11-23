<?php
include "conn.php";
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $user_id = $_POST['user_id'];
    $friend_id = $_POST['friend_id'];

    $query = "INSERT INTO  `friends`(`user_id`, `friend_id`, `friendship_date`) VALUES ( '$user_id' , '$friend_id')";
    if(mysqli_query($con , $query)){
        echo "done";
    }else{
        echo "error";
    }
}

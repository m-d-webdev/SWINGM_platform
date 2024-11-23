<?php
include "conn.php";
if($_SERVER['REQUEST_METHOD'] == "POST"){
    $user_id = $_POST['user_id'];
    $followee_id = $_POST['followee_id'];
    $query = "DELETE FROM `followers` WHERE `follower_id` = '$user_id' AND `followee_id` = '$followee_id'";
    if(mysqli_query($con , $query)){
        echo "done";
    }
}
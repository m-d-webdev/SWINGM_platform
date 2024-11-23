<?php
include "conn.php";
if($_SERVER['REQUEST_METHOD'] == "POST"){
    $user_id = $_POST['user_id'];
    $follower_id = $_POST['follower_id'];
    $query = "DELETE FROM `followers` WHERE `followee_id` = '$user_id' AND `follower_id` = '$follower_id'";
    if(mysqli_query($con , $query)){
        echo "done";
    }
}
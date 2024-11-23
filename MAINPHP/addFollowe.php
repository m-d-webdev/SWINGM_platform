<?php
include "conn.php";

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $user_id = $_POST['user_id'];
    $follow_id = $_POST['follow_id'];
    $query = " INSERT INTO `followers`(`follower_id`, `followee_id`, `follow_date`) VALUES ('$user_id','$follow_id',now())";
    if (mysqli_query($con, $query)) {
        echo "done";
    } else {
        echo "error";
    }
}

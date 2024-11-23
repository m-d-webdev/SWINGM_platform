<?php
include "../../MAINPHP/conn.php";
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $user_id = $_POST['user_id'];
    $type_item = $_POST['type_item'];
    $post_id = $_POST['post_id'];
    $qeru = "DELETE FROM `likers` WHERE `liker_id` ='$user_id' AND `item_id`='$post_id' AND `item_type` ='$type_item' ";
    if(mysqli_query($con , $qeru)){
        mysqli_query($con, "UPDATE likes SET num_like = num_like - 1 WHERE item_id = '$post_id'  AND type_item = '$type_item' ");
        echo "done";
    }

}

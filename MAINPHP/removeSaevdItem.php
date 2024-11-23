<?php
include "conn.php";
if($_SERVER['REQUEST_METHOD'] == "POST"){
    $user_id = $_POST['user_id'];
    $item_id = $_POST['item_id'];
    $sql = "DELETE FROM `saved` WHERE `saved_id` = $item_id AND `user_id` = $user_id";
    $result = mysqli_query($con , $sql);
    if($result){
        echo "done";
    }
}
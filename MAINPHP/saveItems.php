<?php
include "./conn.php";

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $user_id = $_POST['user_id'];
    $item_id = $_POST['item_id'];
    $itecontentTypem_id = $_POST['contentType'];
    $qu = "INSERT INTO `saved`(`saved_id`, `content_type`, `user_id`, `date_saved`) VALUES
     ($item_id ,'$itecontentTypem_id' , $user_id ,   now())";
    if(mysqli_query($con, $qu)){
        echo "done";
    }else{
        echo "error";
    }
    
}
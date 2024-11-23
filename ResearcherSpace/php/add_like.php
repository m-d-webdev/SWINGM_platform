<?php
include "../../MAINPHP/conn.php";
if($_SERVER['REQUEST_METHOD'] == "POST"){
    $user_id = $_POST['user_id'];
    $type_item = $_POST['type_item'];
    $post_id = $_POST['post_id'];
    $qeru = "INSERT INTO `likers`(`item_id`,`item_type` , `liker_id`, `time_like`) VALUES ('$post_id' ,'$type_item', '$user_id' , now() )";
    if(mysqli_query($con , $qeru)){
        $query = "SELECT * FROM likes WHERE item_id = '$post_id' AND type_item = '$type_item'";
        $exe =mysqli_query($con , $query);
        if(mysqli_num_rows($exe) > 0){
            mysqli_query($con , "UPDATE likes SET num_like = num_like + 1 WHERE item_id = '$post_id'  AND type_item = '$type_item' ");
            echo "done";
        }else{
            mysqli_query($con , "INSERT INTO `likes`(`item_id`, `type_item`, `num_like`) VALUES  ( '$post_id' , '$type_item' ,1 )");
            echo "done";
        }
    }
}
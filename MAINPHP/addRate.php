<?php
include "conn.php";

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $user_id =$_POST['user_id'] ;
    $item_id =$_POST['item_id'] ;
    $type =$_POST['type'] ;
    $ratting =$_POST['ratting'] ;
    $coment  =$_POST['coment'];
    $query  =  " INSERT INTO `ratings`(`rating_id`, `user_id`, `article_id`, `type` , `rating`, `comment`) VALUES (null,'$user_id','$item_id' , '$type','$ratting','$coment')";
    if( mysqli_query($con, $query)){
        echo "done";
    }else{
        echo "error";
    }
   
}
<?php
include "../../MAINPHP/conn.php";
if($_SERVER['REQUEST_METHOD'] == "POST"){
    $user_id = $_POST['user_id'];  
    $book_id = $_POST['book_id'];
    $qu ="INSERT INTO `library`(`book_id`, `user_id`, `date_add`) VALUES ('$book_id' , '$user_id' , now())";
    if(mysqli_query($con , $qu)){
        echo "done";    
    }   
}
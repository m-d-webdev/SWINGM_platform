<?php 
include "conn.php";
if($_SERVER['REQUEST_METHOD'] == "GET"){
    $user_id = $_GET['user_id'];

    $sql = "SELECT  l.book_id ,   l.date_add  , b.cover_src , b.name  , b.book_id FROM  library l , books b  WHERE l.book_id = b.book_id AND  l.user_id = $user_id";

    $result = mysqli_query($con, $sql);    
    $data = array();
    while($row = mysqli_fetch_assoc($result)){
        $data[] = $row;     
    }

    echo json_encode($data , JSON_UNESCAPED_UNICODE);
}
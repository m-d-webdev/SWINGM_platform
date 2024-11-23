<?php
include "../../MAINPHP/conn.php";
if($_SERVER['REQUEST_METHOD'] == "POST"){
    $rate_id = $_POST['rate_id'];
    $NewDesc = $_POST['coment'];
    $Num_stars = $_POST['ratting'];
    $query ="UPDATE `ratings` SET rating ='$Num_stars' , comment = '$NewDesc' WHERE rating_id = '$rate_id'";
    $result = mysqli_query($con, $query);
    if($result){
        echo "done";
    }else{
        echo "error";
    }
}
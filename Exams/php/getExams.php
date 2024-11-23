<?php
include "../../MAINPHP/conn.php";

if($_SERVER['REQUEST_METHOD'] == "GET"){
    $q = "SELECT * FROM `tutorials` WHERE lesson_type ='EXAM'";

    $data= mysqli_query($con, $q);
    $data = mysqli_fetch_all($data, MYSQLI_ASSOC);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
}
<?php
include "../../MAINPHP/conn.php";
if($_SERVER['REQUEST_METHOD'] == "GET"){
    $q = "SELECT * FROM `tutorials`";
    $query = mysqli_query($con, $q);
    $data = mysqli_fetch_all($query, MYSQLI_ASSOC);
    echo json_encode($data , JSON_UNESCAPED_UNICODE);
}
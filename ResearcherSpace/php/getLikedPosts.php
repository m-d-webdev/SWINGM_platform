<?php
include "../../MAINPHP/conn.php";
if($_SERVER['REQUEST_METHOD'] == "POST"){
    $user_id = $_POST['user_id'];
    $query = "SELECT item_id ,item_type FROM `likers` WHERE liker_id  = '$user_id' ";
    $result = mysqli_query($con, $query);
    $data = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }
    echo json_encode($data);
}
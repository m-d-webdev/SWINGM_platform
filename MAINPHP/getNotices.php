<?php
include "conn.php";
if($_SERVER['REQUEST_METHOD'] == "POST"){
    $user_id = $_POST['user_id'];
    $query = "SELECT * FROM notification WHERE receiver_id = '$user_id' ORDER BY date_receive DESC";
    $result = mysqli_query($con, $query);
    $data = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }
    echo json_encode($data);
}
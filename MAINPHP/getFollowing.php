<?php
include "./conn.php";
if($_SERVER['REQUEST_METHOD'] == "GET"){
    $user_id = $_GET['user_id'];
    $q = "SELECT u . first_name, u . last_name, u . linkPRF, f. followee_id FROM `followers` f , users u WHERE f . followee_id = u . user_id AND f . follower_id = '$user_id'";
    $result = mysqli_query($con, $q);
    $data = array();
    while($row = mysqli_fetch_assoc($result)){
        $data[] = $row;
    }
    echo json_encode($data);
}
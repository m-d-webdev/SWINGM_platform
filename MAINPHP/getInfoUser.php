<?php
include "conn.php";
if($_SERVER['REQUEST_METHOD'] == "POST"){
    $user_id = $_POST['user_id'];
    $q = "SELECT  `first_name`, `last_name`,`linkPRF` ,`job`, `email` ,`phone` FROM `users` WHERE  user_id = '$user_id'";
    $query = mysqli_query($con, $q);
    
    if($data = mysqli_fetch_assoc($query)){
        $countFllow  = "SELECT followee_id  FROM `followers` WHERE `follower_id` = '$user_id'";
        $query2 = mysqli_query($con, $countFllow);
        $following_IDS =[];

        while($d= mysqli_fetch_assoc($query2)){
            array_push($following_IDS , $d['followee_id']);
        }
        $followers_IDS =[];
        $countFolowing  = "SELECT follower_id   FROM `followers` WHERE `followee_id` = '$user_id'";
        $query3 = mysqli_query($con, $countFolowing);

        while($d= mysqli_fetch_assoc($query3)){
            array_push($followers_IDS , $d['follower_id']);
        }        
        $data['Following'] = $following_IDS;
        $data['Followers'] = $followers_IDS;
    }

    echo json_encode($data);
}
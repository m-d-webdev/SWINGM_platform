<?php
include "conn.php";
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $sender_id = $_POST['sender_id'];
    $receiver_id = $_POST['receiver_id'];

    $query = "INSERT INTO `requests`(`id_request`, `sender_request`, `reciever_request`, `date_send`) VALUES (null  ,'$sender_id','$receiver_id' , now());";
    if (mysqli_query($con, $query)) {
        echo "done";
    } else {
        echo "error";
    }
}

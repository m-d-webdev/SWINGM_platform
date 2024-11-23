<?php
include "conn.php";
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $user_id = $_POST['user_id'];
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $job = $_POST['job'];
    $email = $_POST['email'];
    $qu = "UPDATE users SET first_name = '$first_name', last_name = '$last_name', job = '$job' , email = '$email' WHERE user_id = '$user_id'";
    if (mysqli_query($con, $qu)) {
        echo "done";
    } else {
        echo "error";
    }
}

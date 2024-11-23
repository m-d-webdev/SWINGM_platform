<?php
include "./conn.php"
;

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];
    $sql = "INSERT INTO `messagesfromusers`(`userName`, `userEmail`, `object`, `message`) VALUES  ('$name', '$email', '$subject', '$message')";
    if (mysqli_query($con, $sql)) {
        echo "done";
    } else {
        echo "error";
    }
}
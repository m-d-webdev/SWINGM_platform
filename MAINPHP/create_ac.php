<?php
include "conn.php";
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = $_POST["info"];
    // echo ($data);
    // $data = json_decode($data);
    $dataArray = [];
    parse_str($data, $dataArray);
    $first_name = $dataArray["first_name"];
    $last_name = $dataArray["last_name"];
    $email = $dataArray["email"];
    $num_phone = $dataArray["num_phone"];
    $password = password_hash($dataArray["pass"], PASSWORD_DEFAULT);
    $job = $dataArray["job"];

    $Q_insert = "INSERT INTO `users`(`user_id`, `first_name`, `last_name`, `job`, `email`, `password`, `phone`) VALUES ('','$first_name','$last_name','$job','$email','$password','$num_phone')";
    try {
        mysqli_query($con, $Q_insert);
        $info_user = mysqli_fetch_assoc(mysqli_query($con, "SELECT `user_id` FROM users WHERE email LIKE '$email' "));
        $info_user = json_encode($info_user);
        print_r($info_user);
    } catch (\Throwable $th) {
        echo $th;
    }
}

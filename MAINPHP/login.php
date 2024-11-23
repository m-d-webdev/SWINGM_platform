<?php
include "conn.php";
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $email = $_POST['email'];
    $password = json_decode($_POST['password']);
    $q_email = "SELECT password FROM users WHERE email LIKE '$email'";
    try {
        $pass = mysqli_query($con, $q_email);
        if (mysqli_num_rows($pass) > 0) {
            $pass = mysqli_fetch_assoc($pass);
            $password_hashed = $pass['password'];
            if (password_verify($password, $password_hashed)) {
                $q_info = "SELECT user_id FROM users WHERE email LIKE '$email'";
                $user_id = mysqli_fetch_assoc(mysqli_query($con, $q_info));
                $user_id = json_encode($user_id);
                print_r($user_id);
            } else {
                echo json_encode("err_password");
            }
        } else {
            echo json_encode("err_email");
        }
    } catch (\Throwable $th) {
        echo  $th;
    }
}

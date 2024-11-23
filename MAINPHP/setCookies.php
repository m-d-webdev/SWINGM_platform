<?php
include "conn.php";
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $user_id = $_POST['user_id'];
    $q = "SELECT  `first_name`, `last_name`,`linkPRF` FROM `users` WHERE  user_id = '$user_id'";
    try {
        $exec = mysqli_query($con, $q);
        $dataUser = mysqli_fetch_assoc($exec);
        $dataUser = json_encode($dataUser);
        $cipher_method = 'aes-256-cbc';
        $iv_length = openssl_cipher_iv_length($cipher_method);
        $iv = openssl_random_pseudo_bytes($iv_length);
        $encrypted_data = openssl_encrypt($dataUser, $cipher_method, "SY3BDL3ZIZ@123", 0, $iv);
        $encrypted_data_with_iv = base64_encode($iv . $encrypted_data);
        setcookie("SwingM2_USE_RDATA", $encrypted_data_with_iv, time() + 86400 * 30);
        echo 'done';
    } catch (\Throwable $th) {
        echo $th;
    }
}

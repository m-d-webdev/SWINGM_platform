<?php
include "conn.php";
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    if (isset($_COOKIE["SwingM2_USE_RDATA"])) {
        $encyptedData = $_COOKIE["SwingM2_USE_RDATA"];
        $cipher_method = 'aes-256-cbc';
        $data = base64_decode($encyptedData);
        $iv_length = openssl_cipher_iv_length($cipher_method);
        $iv = substr($data, 0, $iv_length);
        $encrypted_data = substr($data, $iv_length);
        $decrypted_data = openssl_decrypt($encrypted_data, $cipher_method, "SY3BDL3ZIZ@123", 0, $iv);
        echo ($decrypted_data);
    } else {
        echo json_encode('not_found');
    }
}

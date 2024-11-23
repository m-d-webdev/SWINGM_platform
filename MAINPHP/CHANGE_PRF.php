<?php
include "conn.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $user_id = $_POST['user_id'];
    $files_img = $_FILES["inp_img"];
    $file_name = $files_img['name'];
    $search = array(
        '#',
        '?',
        '&',
        '/',
        ':',
        '=',
        '#', 
        '?',  
        '&', 
        '/', 
        ':', 
        '@',  
        ';', 
        '=',  
        ' ',  
        '+',  
        '!',  
        '$',
        '(',
        ')',
    );

    $file_name = preg_replace('/[^a-zA-Z]/', '', $file_name);
    $file_name = str_replace(' ', '', $file_name);
    $file_name = str_replace('#', '', $file_name);
    $ftmp_name = $files_img['tmp_name'];
    $filenameNEW = uniqid('', true) . '.' . $file_name;
    $des = '../PHOTOS/' . $filenameNEW;
    try {
        move_uploaded_file($ftmp_name,  $des);
        mysqli_query($con, "UPDATE users SET linkPRF = 'PHOTOS/$filenameNEW' WHERE user_id ='$user_id'");
        echo "done";
    } catch (\Throwable $th) {
        echo $th;
    }
}

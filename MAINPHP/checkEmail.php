<?php
include "./conn.php";
if($_SERVER['REQUEST_METHOD'] == "GET"){
    $email = $_GET['email'];
    $sql = "SELECT * FROM `users` WHERE email LIKE '$email'";
    $result = mysqli_query($con, $sql);
   if(mysqli_num_rows($result) >0){
      echo "true";
   }else if ($result->num_rows == 0){
      echo "false";
   }
}
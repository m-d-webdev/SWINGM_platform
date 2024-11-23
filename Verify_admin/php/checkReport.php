<?php
include "../../MAINPHP/conn.php";
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $report_id = $_POST['id'];
    $q = "UPDATE `reports` SET `ischeck` = 'true' WHERE `reports`.`report_id` = $report_id";
    $query = mysqli_query($con, $q);
    if ($query) {
        echo "done";
    } else {
        echo "false";
    }
}
<?php

include "../../MAINPHP/conn.php";
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $id_column_name = $_POST['id_column_name'];
    $id_value = $_POST['id_value'];
    $tableName = $_POST['tableName'];
    $columnName = $_POST['columnName'];
    $file = $_FILES['file'];

    try {
        $fileName = preg_replace('/[^a-zA-Z.]/', '', $file['name']);
        $file_path = $file["tmp_name"];
        $file_name = uniqid('', true) . '.' . $fileName;
        $targetrfile_path = "PHOTOS/" . $file_name;
        $move =  move_uploaded_file($file_path, "../../" . $targetrfile_path);
        $executeQ = mysqli_query($con, "UPDATE $tableName SET $columnName = '$targetrfile_path' WHERE $id_column_name = '$id_value' ");
        if ($executeQ) {
            echo "done";
        } else {
            echo "error1";
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }
}

<?php
include "../../MAINPHP/conn.php";

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $tableName = $_POST['tableName'];
    $Id_value= $_POST['Id_value'];
    $Id_column_name= $_POST['Id_column_name'];
    $NewValue= $_POST['NewValue'];
    $columnName= $_POST['columnName'];
    $query = "UPDATE $tableName SET `$columnName` = '$NewValue' WHERE $Id_column_name = '$Id_value'";
    $result = mysqli_query($con, $query);
    if($result){
        echo "done";
    }else{
        echo "error";
    }
}
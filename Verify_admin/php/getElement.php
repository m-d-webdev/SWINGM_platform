<?php
include "../../MAINPHP/conn.php";

if ($_SERVER['REQUEST_METHOD'] == "GET") {
  $search = $_GET['search'];
  $tableName = $_GET['tableName'];
  $columnName = $_GET['columnName'];
  $query = "SELECT *  FROM $tableName WHERE `$columnName` LIKE '$search'";
  $result = mysqli_query($con, $query);
  $data = array();
  while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
  }

  echo json_encode($data, JSON_UNESCAPED_UNICODE);
} else if ($_SERVER['REQUEST_METHOD'] == "POST") {
  $search = $_POST['search'];
  $lesson_type= $_POST['lesson_type'];
  $tableName = $_POST['tableName'];
  $columnName = $_POST['columnName'];
  $query = "SELECT *  FROM $tableName WHERE `$columnName` LIKE '$search' AND lesson_type = '$lesson_type'";
  $result = mysqli_query($con, $query);
  $data = array();
  while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
  }
  echo json_encode($data, JSON_UNESCAPED_UNICODE);

}

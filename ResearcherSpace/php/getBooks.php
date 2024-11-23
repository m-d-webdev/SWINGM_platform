<?php
include "C:/xamppn/htdocs/SWINGM2/MAINPHP/conn.php";
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $book_ids = $_POST['books_ids'];
    $book_ids   = json_decode($book_ids);
    $book_ids = implode(',', $book_ids);
    $Qeury1 = "SELECT a.* from  books a  WHERE  a.book_id NOT IN (" . $book_ids . ") ORDER BY a.created_at DESC";
    $result = mysqli_query($con, $Qeury1);
    $data = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $book_id = $row['book_id'];
        $countComemnt = mysqli_fetch_assoc(mysqli_query($con ,"SELECT COUNT(*) FROM `comments` WHERE `content_type` LIKE 'book' AND `content_id` = '$book_id' "));
        $row['countComemnt'] = $countComemnt['COUNT(*)'];
       
        $data[] = $row;
    }
    $data = json_encode($data);
    print_r($data);
}
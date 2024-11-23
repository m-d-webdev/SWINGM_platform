<?php
include "C:/xamppn/htdocs/SWINGM2/MAINPHP/conn.php";
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $book_ids = $_POST['books_ids'];
    $book_ids   = json_decode($book_ids);
    $book_ids = implode(',', $book_ids);
    $Qeury1 = "SELECT a.* , b.linkPRF , b.first_name , b.last_name from  news a , users b WHERE a.writer_id = b.user_id AND a.news_id NOT IN (" . $book_ids . ") ORDER BY a.date_post DESC";
    $result = mysqli_query($con, $Qeury1);
    $data = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $row['date_post'] = date("d-m-Y", strtotime($row['date_post']));
        $row['linkPRF']= json_decode( $row['linkPRF'] ,true);
        $data[] = $row;
    }
    $data = json_encode($data ,JSON_UNESCAPED_UNICODE);
    print_r($data);
}

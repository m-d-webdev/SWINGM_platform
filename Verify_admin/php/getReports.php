<?php
include "../../MAINPHP/conn.php";
if ($_SERVER['REQUEST_METHOD'] == "GET") {
    $q = "SELECT report_id ,  article_id , type_item FROM `reports` WHERE ischeck LIKE 'false'";
    $query = mysqli_query($con, $q);
    $data=[];
    while ($row = mysqli_fetch_assoc($query)) {
        if ($row['type_item'] == "books") {
            $query2 = "SELECT name  FROM `books` WHERE book_id = '$row[article_id]'";
            $exe = mysqli_query($con, $query2);
            $name = mysqli_fetch_assoc($exe)['name'];
            $data[] = ["report_id" => $row["report_id"], "article_id" => $row['article_id'], "message" => '<p dir="rtl"> إبلاغ عن كتاب : ' . $name . '</p>', "type_item" => $row['type_item']];
        } else if ($row['type_item'] == "articles") {
            $query2 = "SELECT title FROM `articles` WHERE article_id = '$row[article_id]'";
            $title = mysqli_fetch_assoc(mysqli_query($con, $query2))['title'];
            $data[] = ["report_id" => $row["report_id"], "article_id" => $row['article_id'], "message" => '<p dir="rtl"> إبلاغ عن مقال بعنوان  : ' . $title . '</p>', "type_item" => $row['type_item']];
        } else if ($row['type_item'] == "comments") {
            $query2 = "SELECT u.first_name , u.last_name FROM  comments c , users u WHERE c.user_id = u.user_id AND comment_id = '$row[article_id]'";
            $first_name = mysqli_fetch_assoc(mysqli_query($con, $query2))['first_name'];
            $last_name = mysqli_fetch_assoc(mysqli_query($con, $query2))['last_name'];
            $data[] = ["report_id" => $row["report_id"], "article_id" => $row['article_id'], "message" => '<p dir="rtl">  إبلاغ عن تعليق ل   : ' . $first_name . ' ' . $last_name . '</p>', "type_item" => $row['type_item']];
        } else if ($row['type_item'] == "replies") {
            $query2 = "SELECT u.first_name , u.last_name FROM  replies c , users u WHERE c.user_id = u.user_id AND reply_id  = '$row[article_id]'";
            $first_name = mysqli_fetch_assoc(mysqli_query($con, $query2))['first_name'];
            $last_name = mysqli_fetch_assoc(mysqli_query($con, $query2))['last_name'];
            $data[] = ["report_id" => $row["report_id"], "article_id" => $row['article_id'], "message" => '<p dir="rtl"> إبلاغ عن رد عن تعليق ل    : ' . $first_name . ' ' . $last_name . '</p>', "type_item" => $row['type_item']];
        } else if ($row['type_item'] == "replyreplies") {
            $query2 = "SELECT u.first_name , u.last_name FROM  replyreplies c , users u WHERE c.user_id = u.user_id AND reply_id  = '$row[article_id]'";
            $first_name = mysqli_fetch_assoc(mysqli_query($con, $query2))['first_name'];
            $last_name = mysqli_fetch_assoc(mysqli_query($con, $query2))['last_name'];
            $data[] = ["report_id" => $row["report_id"], "article_id" => $row['article_id'], "message" => '<p dir="rtl"> إبلاغ عن رد عن تعليق ل    : ' . $first_name . ' ' . $last_name . '</p>', "type_item" => $row['type_item']];
        } else if($row['type_item'] == "news"){ 
            $query2 = "SELECT title FROM `news` WHERE news_id = '$row[article_id]'";
            $title = mysqli_fetch_assoc(mysqli_query($con, $query2))['title'];
            $data[] = ["report_id" => $row["report_id"], "article_id" => $row['article_id'], "message" => '<p dir="rtl"> إبلاغ عن خبر بعنوان   : ' . $title . '</p>', "type_item" => $row['type_item']];
        }
        // $result = mysqli_query($con, $query2);

    }
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
}

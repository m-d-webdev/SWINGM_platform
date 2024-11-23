<?php

include "../../MAINPHP/conn.php";
if ($_SERVER['REQUEST_METHOD'] == "GET") {
    $report_id = $_GET['id'];
    $q = "SELECT * FROM `reports` WHERE report_id = $report_id ";

    $query = mysqli_query($con, $q);
    $result = mysqli_fetch_assoc($query);
    $reporter_id = $result['reported_by'];
    $getUser = mysqli_query($con, "SELECT   first_name , last_name FROM `users` WHERE user_id = $reporter_id");
    $user = mysqli_fetch_assoc($getUser);
    $result['reported_by'] = ["user_id" => $reporter_id, "first_name" => $user['first_name'], "last_name " => $user['last_name']];

    $reported_item = $result['article_id'];
    $tableName = $result['type_item'];

    if ($tableName == "books") {
        $query2 = "SELECT name  FROM `books` WHERE book_id = '$reported_item'";
        $exe = mysqli_query($con, $query2);
        $name = mysqli_fetch_assoc($exe)['name'];
        $result['reported_item'] = $name;
    } else if ($tableName == "articles") {
        $query2 = "SELECT title FROM `articles` WHERE article_id = '$reported_item'";
        $title = mysqli_fetch_assoc(mysqli_query($con, $query2))['title'];
        $result['reported_item'] = $title;
    } else if ($tableName == "comments") {
        $query2 = "SELECT  comment_text FROM  comments   WHERE  comment_id = '$reported_item'";
        $comment_text = mysqli_fetch_assoc(mysqli_query($con, $query2))['comment_text'];
        $result['reported_item'] = $comment_text;
    } else if ($tableName == "replies") {
        $query2 = "SELECT reply_text FROM  replies c  WHERE  reply_id  = '$reported_item'";
        $reply_text = mysqli_fetch_assoc(mysqli_query($con, $query2))['reply_text'];
        $result['reported_item'] = $reply_text;
    } else if ($tableName == "replyreplies") {
        $query2 = "SELECT reply_text FROM  replyreplies  WHERE  reply_id  = '$reported_item'";
        $reply_text = mysqli_fetch_assoc(mysqli_query($con, $query2))['reply_text'];
        $result['reported_item'] = $reply_text;
   } else if($tableName == "news"){
        $query2 = "SELECT title FROM `news` WHERE news_id = '$reported_item'";
        $title = mysqli_fetch_assoc(mysqli_query($con, $query2))['title'];
        $result['reported_item'] = $title;
    }

    $getUser = mysqli_query($con, "SELECT   first_name , last_name FROM `users` WHERE user_id  = $reporter_id");
    $user = mysqli_fetch_assoc($getUser);
    $result['reported_by'] = ["user_id" => $reporter_id, "first_name" => $user['first_name'] , "last_name" => $user['last_name']];



    echo json_encode($result, JSON_UNESCAPED_UNICODE);
}
// SELECT `report_id`, `reported_by`,
//  `report_reason`, `article_id`, `type_item`,
//   `message`, `report_timestamp`, `ischeck`
//    FROM `reports` WHERE 1
<?php
include "../../MAINPHP/conn.php";
if($_SERVER['REQUEST_METHOD'] == "POST"){

    $content_id = $_POST['content_id'];
    $content_type = $_POST['content_type'];
    $comment_text = $_POST['comment_text'];
    $user_id= $_POST['user_id'];
    
    $QUERYINSERT = "INSERT INTO `comments`(`comment_id`, `user_id`, `content_type`, `content_id`, `comment_text`, `created_at`) VALUES
    (
        null,
        '$user_id',
        '$content_type',
        '$content_id',
        '$comment_text',
        now()
    )";
    if(mysqli_query($con , $QUERYINSERT)){
        $realComet = mysqli_fetch_assoc(mysqli_query($con , "SELECT c.* , u.first_name , u.last_name , u.linkPRF  FROM `comments` c , users u  WHERE  c.user_id = u.user_id AND   c.content_id = '$content_id' AND c.user_id = '$user_id' AND `content_type` LIKE '$content_type' order BY c.created_at DESC LIMIT 1") );
        echo json_encode($realComet  , JSON_UNESCAPED_UNICODE);
    }
}
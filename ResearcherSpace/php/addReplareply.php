<?php
include "../../MAINPHP/conn.php";
if($_SERVER['REQUEST_METHOD'] == "POST"){

    $commentt_id = $_POST['comment_id'];
    $comment = $_POST['comment_text'];
    $user_id= $_POST['user_id'];
    $query = "INSERT INTO `replyreplies`(`reply_id`, `origineReply_id`, `user_id`, `reply_text`, `created_at`) VALUES
    (
        null,
        '$commentt_id',
        '$user_id',
        '$comment',
        now()
    )";
    if(mysqli_query($con , $query)){
        mysqli_query($con , "UPDATE  replies SET hasReplay = 'true' WHERE reply_id  = '$commentt_id'");
       $newRepl = mysqli_fetch_assoc(mysqli_query($con , "SELECT r.* , u.first_name , u.last_name , u.linkPRF FROM replyreplies r , users u  WHERE origineReply_id = '$commentt_id' AND r.user_id = u.user_id ORDER BY created_at DESC LIMIT 1"));
       $arr=[];
       $arr['reply'] = $newRepl;
        echo json_encode($arr , JSON_UNESCAPED_UNICODE);
    }else{
        echo "error";
    }
}
<?php
include '../../MAINPHP/conn.php';
if ($_SERVER['REQUEST_METHOD'] == "GET") {
    $reply_id = $_GET['reply_id'];
    $sqlQuery = "SELECT r.* , u.first_name , u.last_name , u.linkPRF FROM replyreplies r , users u  WHERE r.origineReply_id  =$reply_id   AND r.user_id = u.user_id ORDER BY created_at";
    $QUERYreplies = mysqli_query($con, $sqlQuery);
    $replies = [];
    while ($reply = mysqli_fetch_assoc($QUERYreplies)) {
        $replies[] = $reply;
    }
    echo json_encode($replies, JSON_UNESCAPED_UNICODE);
}

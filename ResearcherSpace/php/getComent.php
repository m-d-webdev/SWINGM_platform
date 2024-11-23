<?php
include "../../MAINPHP/conn.php";
if ($_SERVER['REQUEST_METHOD'] == "GET") {
    $item_id = $_GET['item_id'];
    $item_type = $_GET['type'];
    $q = "SELECT c.* , u.first_name , u.last_name , u.linkPRF FROM `comments` c , users u  WHERE  c.user_id = u.user_id AND   c.content_id = '$item_id' AND `content_type` LIKE '$item_type' ORDER BY c.created_at  LIMIT 30";
    $executeQuery = mysqli_query($con, $q);
    $data = array();
    while ($r = mysqli_fetch_assoc($executeQuery)) {
        $comment_id = $r['comment_id'];
        $countlikes = mysqli_fetch_row(mysqli_query($con, "SELECT num_like FROM `likes` WHERE `type_item` LIKE 'comment' AND `item_id` = '$comment_id' "));
        if ($countlikes == null) {
            $countlikes[0] = 0;
        }
        $r["num_likes"] = $countlikes[0];
        $data[] = $r;
        // print_r($r);

    }
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
}

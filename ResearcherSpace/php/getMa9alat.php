<?php
include("C:/xamppn/htdocs/SWINGM2/MAINPHP/conn.php");
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $ma9alat_ids = $_POST['ma9alat_ids'];
    $ma9alat_ids   = json_decode($ma9alat_ids);
    $ma9alat_ids = implode(',', $ma9alat_ids);
    $Qeury1 = "SELECT a.* , b.linkPRF , b.first_name , b.last_name  from  articles a , users b WHERE a.writer_id = b.user_id  AND a.article_id NOT IN (" . $ma9alat_ids . ") ORDER BY a.date_post DESC";
    $result = mysqli_query($con, $Qeury1);
    $data = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $articelId= $row['article_id'];
        $countComemnt = mysqli_fetch_assoc(mysqli_query($con ,"SELECT COUNT(*) FROM `comments` WHERE `content_type` LIKE 'article' AND `content_id` = '$articelId' "));
        $row['countComemnt'] = $countComemnt['COUNT(*)'];
        $countlikes = mysqli_fetch_row(mysqli_query($con ,"SELECT num_like FROM `likes` WHERE `type_item` LIKE 'article' AND `item_id` = '$articelId' "));
        if($countlikes == null){
            $countlikes[0] = 0;
        }

        $row["num_likes"] = $countlikes[0];
        $data[] = $row;
    }
    $data = json_encode($data , JSON_UNESCAPED_UNICODE);
    echo $data;
}

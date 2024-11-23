<?php
include "C:/xamppn/htdocs/SWINGM2/MAINPHP/conn.php";
if ($_SERVER['REQUEST_METHOD'] == "POST") {

    $news_title = $_POST['news_title'];
    $news_content = $_POST['content'];
    $type_news = $_POST['newsTheme'];
    $user_id = $_POST['user_id'];
    $news_imgs = $_FILES['array_imgs'];
    $news_imgs2 = array();
    for ($i = 0; $i < count($news_imgs['name']); $i++) {
        $news_imgs2["img$i"]['name'] = $news_imgs['name'][$i];
        $news_imgs2["img$i"]['tmp_name'] = $news_imgs['tmp_name'][$i];
    }
    try {
        $encoded_aray = [];
        $i = 1;
        foreach ($news_imgs2 as $img) {
            $img_name = preg_replace('/[^a-zA-Z.]/', '', $img['name']);
            $target_dir  = "PHOTOS/" . uniqid(' ', true) . $img_name;
            move_uploaded_file($img['tmp_name'], "C:/xamppn/htdocs/SWINGM2/" . $target_dir);
            $encoded_aray["img$i"] =  $target_dir;
            $i++;
        }
        $encoded_aray = json_encode($encoded_aray);
        $query = " INSERT INTO `news`(`news_id`, `writer_id`, `title`, `type`, `content`, `link_paths`, `date_post`) VALUES 
         (null,'$user_id','$news_title','$type_news','$news_content','$encoded_aray',now())";
        mysqli_query($con, $query);
        echo "done";
    } catch (Throwable $th) {
        echo $th;
    }
}

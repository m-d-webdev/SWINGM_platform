<?php
include "../../MAINPHP/conn.php";
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $new_id= $_POST['new_id'];
    $news_imgs = $_FILES['imgs'];
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
            move_uploaded_file($img['tmp_name'], "../../" . $target_dir);
            array_push($encoded_aray , $target_dir);
            $i++;
        }
        $oldesImg = mysqli_query($con, "SELECT link_paths FROM `news` WHERE `news_id` = '$new_id'");
        $oldesImg = mysqli_fetch_assoc($oldesImg)["link_paths"];
        $oldesImg = json_decode($oldesImg);

        $index1= 1;
        $newArrayImgs = [];
        foreach($oldesImg as $img){
            $newArrayImgs["img$index1"] = $img;
            $index1++;
        }
        foreach($encoded_aray as $img){
            $newArrayImgs["img$index1"] = $img;
            $index1++;
        }
        $newArrayImgs = json_encode($newArrayImgs);

        $query = " UPDATE `news` SET `link_paths`='$newArrayImgs'";
        if (mysqli_query($con, $query)) {
            echo "done";
        }
    } catch (Throwable $th) {
        echo $th;
    }
}

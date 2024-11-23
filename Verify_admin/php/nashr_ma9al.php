<?php
include "conn.php";
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    if ($_POST['gol'] = 'get_info') {
        $user_id = $_POST['user_id'];
        $qu_select = "SELECT *  FROM users WHERE user_id ='$user_id '";
        $data = mysqli_fetch_assoc(mysqli_query($con,  $qu_select));
        $select_img = "SELECT img_path from images_profile WHERE id_img = {$data['id_prf']}";
        $img_link = mysqli_fetch_assoc(mysqli_query($con, $select_img));
        $data['img_path'] = $img_link['img_path'];
        $data = json_encode($data);
        print_r($data);
    }
}

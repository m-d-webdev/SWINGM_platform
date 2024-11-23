<?php
include "../../MAINPHP/conn.php";
if($_SERVER['REQUEST_METHOD'] == "POST"){
    $lesson_title = $_POST['inpNameLessonV'];
    $lesson_area = $_POST['lesson_area'];
    $lesson_level = $_POST['lessonlevel'];
    $lesson_file = $_FILES['VideoLesson'];

    $lesson_file_name = preg_replace('/[^a-zA-Z4.]/', '', $lesson_file['name']);
    $lesson_file_path = $lesson_file["tmp_name"];
    $tagetDir = 'VIDEOS/' . uniqid('', true) . $lesson_file_name;
    if(move_uploaded_file($lesson_file_path,"../../". $tagetDir));
    {
        $query = " INSERT INTO `tutorials`(`lesson_id`, `lesson_name`, `lesson_type`, `level_school`, `lesson_area`, `lesson_path`, `date_post`) VALUES
        (null,'$lesson_title','VIDEO','$lesson_level','$lesson_area','$tagetDir',now())";
        $result = mysqli_query($con, $query);
        if ($result) {
            echo "done";
        } else {
            echo "error";
        }
    }
}
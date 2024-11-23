<?php
include "../../MAINPHP/conn.php";
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $lesson_title = $_POST['inpNameLessonTEXT'];
    $lesson_area = $_POST['lesson_area'];
    $lesson_level = $_POST['lessonlevel'];
    $concept = $_POST['concept'];
    $textLesson = $_POST['textLesson'];
    $dirName = "toturialesFiles/";
    $fileName = str_replace(" ", "", $lesson_title) . '.txt';
    if (!file_exists('../../' . $dirName . $fileName)) {
        $file = fopen('../../' . $dirName . $fileName, 'w');
        if ($file) {
            fwrite($file, $textLesson);
            fclose($file);
            $query = " INSERT INTO `tutorials`(`lesson_id`, `lesson_name`, `lesson_type`, `level_school`, `lesson_area`, `lesson_path`, `date_post`) VALUES
            (null,'$lesson_title','TEXT','$lesson_level','$lesson_area','$dirName$fileName',now())";
            $result = mysqli_query($con, $query);
            if ($result) {
                echo "done";
            } else {
                echo "error query";
            }
        } else {
        }
    } else {
        if ($concept == "replace") {
            $file = file_put_contents('../../' . $dirName . $fileName, $textLesson);
            $query = " INSERT INTO `tutorials`(`lesson_id`, `lesson_name`, `lesson_type`, `level_school`, `lesson_area`, `lesson_path`, `date_post`) VALUES
            (null,'$lesson_title','TEXT','$lesson_level','$lesson_area','$dirName$fileName',now())";
            $result = mysqli_query($con, $query);
            if ($result && $file) {
                echo "replaced";
            } else {
                echo "error query";
            }
        } else {
            echo "exist";
        }
    }
}

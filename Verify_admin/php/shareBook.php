<?php
include "C:/xamppn/htdocs/SWINGM2/MAINPHP/conn.php";
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $book_date_publish = $_POST['book_date_publish'];
    $book_type = $_POST['book_type'];
    $language = $_POST['language'];
    $book_description = $_POST['book_description'];
    $book_name = $_POST['book_name'];
    $book_cover = $_FILES['book_cover'];
    $bookPDEF = $_FILES['bookPDEF'];
    $bookType = $bookPDEF['type'];;
    $bookType = explode("/", $bookType)[1];
    $bookType = strtoupper($bookType);
    $bookSize = $bookPDEF['size'];
    $bookSize = round($bookSize / (1024 * 1024), 2);
    $book_writer = $_POST['book_writer'];
    $writerDefine = $_POST['writerDefine'];
    $writerImg = $_FILES['writerImg'];

    $book_cover_name = preg_replace('/[^a-zA-Z.]/', '', $book_cover['name']);
    $bookPDEF_name = preg_replace('/[^a-zA-Z]./', '', $bookPDEF['name']);
    $writerPic = preg_replace('/[^a-zA-Z.]/', '', $writerImg['name']);
    $book_cover_path = $book_cover["tmp_name"];
    $BookPDF_path = $bookPDEF["tmp_name"];
    $book_cover_name = uniqid('', true) . '.' . $book_cover_name;
    $bookPDEF_name = uniqid('', true) . '.' . $bookPDEF_name;
    $writerPicName = uniqid('', true) . '.' . $writerPic;

    $target_covers = "../../PHOTOS/" . $book_cover_name;
    $target_PDF = "../../pdfs/" . $bookPDEF_name;;
    $target_writerPic = "../../PHOTOS/" . $writerPicName;;

    $query = " INSERT INTO `books`(`book_id`, `name`, `writer_name`, `writerProfilePic`, `writerDefine`, `publication_date`, `genre`, `langue`, `description`, `cover_src`, `pdf_path`, `size`, `type`, `created_at`)
    VALUES   ( null,'$book_name' ,'$book_writer' , 'PHOTOS/$writerPicName' , '$writerDefine'  , '$book_date_publish','$book_type','$language','$book_description' ,'PHOTOS/$book_cover_name','pdfs/$bookPDEF_name', '$bookSize', '$bookType' , now())";
    if (mysqli_query($con, $query)) {
        if (move_uploaded_file($book_cover_path, $target_covers) &&    move_uploaded_file($BookPDF_path, $target_PDF) && move_uploaded_file($writerImg['tmp_name'], $target_writerPic)) {
            echo "done";
        }
    } else {
        echo "eror";
    }
}

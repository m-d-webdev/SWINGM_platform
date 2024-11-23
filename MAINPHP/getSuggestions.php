<?php
include "./conn.php";
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $search  = $_GET['search'];
    $search = explode('&', $search);
    $type  = $_GET['type'];
    $i = 0;
    $resutlSearch = [];

    function fetchResult($query, $table)
    {
        global $resutlSearch;
        global $i;
        global $con;
        $res =  mysqli_query($con, $query);
        while ($row = mysqli_fetch_assoc($res)) {
            $resutlSearch[$table . ",result_num " . $i] = $row;
            $i++;
        }
    }

    function selectFromUsers()
    {
        global $search;
        $table = "users";
        if (is_numeric($search[0])) {
            $query =  "SELECT user_id , first_name, last_name  FROM `$table` WHERE user_id = '$search[0]' ";
        } else {
            $query = "SELECT user_id , first_name, last_name  FROM `$table` WHERE last_name LIKE  '$search[0]%' AND  first_name LIKE '$search[1]%' ";
        }
        fetchResult($query, $table);
    }
    function selectFromArticles()
    {
        global $search;
        $table = "articles";
        if ($search[1] != null) {
            $searchTITLE = implode(" ", $search);
        } else {
            $searchTITLE = $search[0];
        }
        $query = "SELECT a.title , a.article_id  FROM `$table` a   WHERE  a.title LIKE  '$searchTITLE%' ";
        fetchResult($query, $table);
    }

    function selectFromBooks()
    {
        global $search;
        if ($search[1] != null) {
            $searchTITLE = implode(" ", $search);
        } else {
            $searchTITLE = $search[0];
        }
        $table = "books";
        $query = "SELECT a.book_id   , a.name FROM  books a  WHERE  a.name LIKE '$searchTITLE%'  ";
        fetchResult($query, $table);
    }
    function selectFromLessons()
    {
        global $search;
        if ($search[1] != null) {
            $searchTITLE = implode(" ", $search);
        } else {
            $searchTITLE = $search[0];
        }
        $table = "tutorials";
        $query = "SELECT  lesson_id  , lesson_name FROM `$table` WHERE lesson_name LIKE '$searchTITLE%' ";
        fetchResult($query, $table);
    }

    if ($type == "الكل") {
        selectFromUsers();
        selectFromArticles();
        selectFromBooks();
        selectFromLessons();
    } else if ($type == "المقالات") {
        selectFromArticles();
    } else if ($type == "الكتب") {
        selectFromBooks();
    } else if ($type == "أشخاص") {
        selectFromUsers();
    } else if ($type == "الدروس") {
        selectFromLessons();
    }


    if (count($resutlSearch) > 0) {
        echo json_encode($resutlSearch, JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode('No_result');
    }
}

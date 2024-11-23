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
            $resutlSearch[$table][] = $row;
            $i++;
        }
    }
    function selectFromUsers()
    {
        global $search;
        $table = "users";
        if (is_numeric($search[0])) {
            $query =  "SELECT user_id , first_name, last_name ,linkPRF FROM `$table` WHERE user_id = '$search[0]' ";
        } else {
            $query = "SELECT user_id , first_name, last_name ,linkPRF FROM `$table` WHERE last_name LIKE  '$search[0]%' AND  first_name LIKE '$search[1]%' ";
        }
        fetchResult($query, $table);
    }
    function selectFromArticles()
    {
        global $type;
        global $search;
        $table = "articles";
        if ($search[1] != null) {
            $searchTITLE = implode(" ", $search);
        } else {
            $searchTITLE = $search[0];
        }
        $query = "SELECT a.* , u.user_id , u.first_name , u.last_name , u.linkPRF FROM `$table` a  , users u WHERE a.writer_id = u.user_id AND a.title LIKE '$searchTITLE%' ";
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
        $query = "SELECT a.* FROM  books a  WHERE a.name LIKE '$searchTITLE%'  ";
        fetchResult($query, $table);
    }
    function selectFromLessons()
    {
        global $search;
        if ($search[1] != null) {
            $searchTITLE = implode(" ", $search);
        } else {
            $searchTITLE = $search[0];
        }        $table = "tutorials";
        $query = "SELECT * FROM `$table` WHERE lesson_name LIKE '$searchTITLE%' ";
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
    echo json_encode($resutlSearch, JSON_UNESCAPED_UNICODE);
}

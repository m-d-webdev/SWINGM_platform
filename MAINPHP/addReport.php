<?php
include "conn.php";
if($_SERVER['REQUEST_METHOD'] == "POST"){
    $reporder_id = $_POST['reporder_id'];
    $reason = $_POST['reason'];
    $reasonSTR= implode('+',  $reason);
    $desc = $_POST['desc'];
    $item_id = $_POST['item_id'];
    $type = $_POST['type'];
    try{

        $query =" INSERT INTO `reports`(`report_id`, `reported_by`, `report_reason`, `article_id`,`type_item` ,  `message`, `report_timestamp`) 
         VALUES (null,'$reporder_id','$reasonSTR','$item_id' ,'$type','$desc',now() ) " ;
         mysqli_query($con , $query);
         echo "done";
         

    }catch(Throwable $th){
        echo $th;
    }
    
}
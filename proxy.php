<?php
header('Access-Control-Allow-Origin: *');  
//echo $_GET['url'];
echo file_get_contents($_GET['url']);
?>
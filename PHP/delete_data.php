<?php
$recodeid = $_POST['Record_id'];

$con=mysql_connect("localhost","root","");
mysql_select_db("contact_infor",$con);

$query = "Delete from contact_form where Record_id='$recodeid'";

if (mysql_query($query)){
	header('Location: view_data.php');
}
else{
	echo"error".$recodeid;
}
?>
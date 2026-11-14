<?php
$recordid = $_POST['Update_Record_id'];
$fname = $_POST['txt_firstname'];
$lname = $_POST['txt_lname'];
$email = $_POST['txt_email']; 
$message = $_POST['txt_message'];

$con=mysql_connect("localhost","root","");
mysql_select_db("contact_infor",$con);

$query = "UPDATE contact_form SET 
First_Name='$fname',Last_Name='$lname',Email='$email',Message='$message' where Record_id='$recordid'";
		
if (mysql_query($query)){
	header('Location:view_data.php');
}
else{
	echo"error".$recordid;
}
?>
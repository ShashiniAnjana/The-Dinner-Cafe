<?php
$fname = $_POST['txt_firstname'];
$lname = $_POST['txt_lname'];
$email = $_POST['txt_email']; 
$message = $_POST['txt_message'];

$con=mysql_connect("localhost","root","");
mysql_select_db("contact_infor",$con);

$query = "INSERT INTO contact_form(First_Name,Last_Name,Email,Message)
		VALUES('$fname','$lname','$email','$message')";
		
if(mysql_query($query)) {
			echo"done";
}
else{
			echo"error";
}

?>
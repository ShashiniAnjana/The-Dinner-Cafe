<?php
//Store the values recived from url
$user_name = $_POST['username_para'];
$user_pws = $_POST['password_para'];

$con=mysql_connect("localhost","root","");
mysql_select_db("contact_infor",$con);


	$query = "SELECT * FROM login WHERE User_Name='$user_name' and Password='$user_pws'";
	$result = mysql_query($query);
	//read the quried result 
	$row = mysql_fetch_array($result);	
	$count = mysql_num_rows($result);



//echo $row['user_name'];
if ($count == 1){
	
	if($user_name == 'admin'){
		header('Location: view_data.php');
	}
	else{
		header('Location: Contact Us.html');
	}
	
}
else{
	header('Location: Error.html');
}


?>

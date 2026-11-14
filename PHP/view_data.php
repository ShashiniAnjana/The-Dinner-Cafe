<?php
@$con=mysql_connect ("localhost","root","");
mysql_select_db("contact_infor",$con);

	$query="Select * from contact_form";
	$result=mysql_query($query);
	
echo"<table border='1' width='100%'>
<tr>
<th width ='5%'>Record_id</th>
<th width ='20%'>First_Name</th>
<th width ='20%'>Last_Name</th>
<th width ='15%'>Email</th>
<th width ='25%'>Message</th>
</tr>";

while($row=mysql_fetch_array($result)) {
echo"<tr>";
echo"<td width='5%'>".$row['Record_id']."</td>";
echo"<td width='20%'>".$row['First_Name']."</td>";
echo"<td width='20%'>".$row['Last_Name']."</td>";
echo"<td width='15%'>".$row['Email']."</td>";
echo"<td width='25%'>".$row['Message']."</td>";
echo"</tr>";
}
echo "</table>";



//Delete
echo"<form method='POST' action='delete_data.php'>
<input type='submit' value='Delete'/>
<input type='text' name='Record_id'/>
</form>";


//Update
echo"<form id='Web' name='contact_form' method='POST' action='update_data.php'>
  <font face='Arial Black ' color='#FFFFFF'><b><u>
  SEND US A MESSAGE
  </b>
  </u>
  </font>
  <br /><br />
  <b>
  <font color='#66FF99' size='2'>
  Your email address will be held strictly confidential. 
  <br />
  Required fields are marked *
  </b>
  </font>
  <br /><br />	
    <label for='fname'><b><font color=''#FFFF00'>First Name</font></b><font color='#FF0000'>*</font></label>
    <input type='text' id='txt_firstname' name='txt_firstname' placeholder='Your first name..''>

    <label for='lname'><b><font color='#FFFF00'>Last Name</font></b><font color='#FF0000'>*</font></label>
    <input type='text' id='txt_lname' name='txt_lname' placeholder='Your last name..''>

    <label for='email'><b><font color='#FFFF00'>E-mail</font></b><font color='#FF0000'>*</font></label>
    <input type='text' id='txt_email' name='txt_email' placeholder='Your e-mail address..'>
    <br /><b>
    <font color='#66FF99' size='2'>
    Please enter your e-mail, So we can follow up with you.
    </font>
    </b>
	<br /><br />

    <label for='txt_message'><b><font color='#FFFF00'>Message</font></b><font color='#FF0000'>*</font></label>
    <textarea id='txt_message' name='txt_message' placeholder='Write a message..' style='height:200px'></textarea>
    
    <input type='submit' name='Update' value='Update' />
	<input type='text' name='Update_Record_id'/>
    
   </form>";

?>
<?php

require '../../knight/lib/vendor/autoload.php';
use Mailgun\Mailgun;
function sendEmail($email,$subject,$body,$sender="noreply",$name="Recovery"){
		
		$mgClient = new Mailgun('key-b1c6efc05b1b0e9af6db668b8e850d70');
		$domain = "knight.center";
		// Make the call to the client.
		$result = $mgClient->sendMessage($domain, array(
		    'from'    => 'Password Recovery <noreply@knight.center>',
		    'to'      => "Chess <${email}>",
		    'subject' => $subject,
		    'html'    => $body
		));
		return $result;
}
/*$data = "<p>Please click <a href=\"https://www.stevenschessclub.com/verify/\">here</a> so I can know
if this message has sent correctly. Thank you</p>";
$success = sendEmail("chess@stevens.edu","TEST EMAIL","<h1>This is a test</h1>");
if(!$success){
	echo "FAILURE";
}
sendEmail("chesslists@lists.stevens.edu","Hello Everyone!",$data);*/
$ip = $_SERVER['REMOTE_ADDR'];
file_put_contents("vistor.txt", "vistor from IP ${ip}\n",FILE_APPEND);
echo "<script>alert('THANK YOU!');</script>";
?>
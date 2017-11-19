<?php
	session_start("chessClub");	
?>
<!DOCTYPE html>
<html lang='en-US'>
	<head>
		<title>Admin Tools</title>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name='description' content = 'The administration page allowing a group of admins to edit certain content on the site'>
		<link rel="shortcut icon" type="image/x-icon" href="https://www.innovativeprogramming.org/stevenschessclub.com/resources/favicon.ico" />
		<link type="text/css" rel="stylesheet" href='https://www.innovativeprogramming.org/stevenschessclub.com/resources/chess.css' />
		<link type="text/css" rel="stylesheet" href='https://www.innovativeprogramming.org/stevenschessclub.com/resources/members.css' />
				<style>
					main{
						width:1000px;
						position:relative;
						margin:auto;
						background-color:white;
						border-radius:6px;
						padding:5px;
						padding-top:50px;
					}
					form{
						width:90%;
						margin:auto;
						border-style:solid;
						border-width:0 0 1px 0;
						padding:0 0 4px 0;
					}
					h1{
						color:white;
						text-align:center;
					}
					textarea{
						width:100%;
						height:500px;
					}
					h2,h3{
						text-align:center;
					}
					label{
						margin-right:5px;
					}
					input.submit{
						display:block;
						margin:auto;
						padding:2px 4px 2px 4px;
					}
					span{
						display:block;
						margin:auto;
						width:400px;
					}
				</style>
	</head> 
	<body class='members'>
	<?php
		$host = 'localhost';
		$username = 'admin172';
		$pass = 'hB1lT^F+,O9T';
		$database = 'chessClub';
		$conn = new  mysqli($host, $username, $pass, $database);
		$result = $conn->query("SELECT * FROM users WHERE Username='".$_SESSION['user']."'");
		if(!$result){
			echo"<script>alert('User does not exist');window.location='https://www.stevenschessclub.com/';</script>";
		}
		$data = $result->fetch_assoc();
		if($_SESSION['key']!=hash('sha256',hash('sha256',$_SESSION['user']).$data['loginSalt'])){
			echo"<script>alert('Unable to confirm Login');window.location='https://www.stevenschessclub.com/';</script>";
			die();
		}
		if($data['Type']!='A'){
			echo"<script>alert('Unauthorized User');window.location='https://www.stevenschessclub.com/';</script>";
			die();
		}
		if(filter_input(INPUT_SERVER,"REQUEST_METHOD",FILTER_SANITIZE_STRING)=="POST"){
			if(isset($_POST['aboutHTML'])){
					file_put_contents("../resources/aboutHTML.txt",$_POST['about']);
				
			}else{
				$css = '';
				$valid = true;
				if(isset($_POST['aboutCSS'])){
					file_put_contents("../resources/aboutCSS.txt",$_POST['about']);
				}
			}
			if(isset($_POST['eventHTML'])){
				file_put_contents("../resources/eventsHTML.txt",$_POST['event']);
			}else{
				if(isset($_POST['eventCSS'])){
					file_put_contents("../resources/eventsCSS.txt",$_POST['event']);
				}
			}

		}
		
	?>
	 <h1>Edit Page content</h1>
	<main>
	 	<nav class='chess'>
			<table>
				<tr class='nav'>
					<td class='nav'><a class='nav' href='https://www.innovativeprogramming.org/stevenschessclub.com/members'>Home</a></td>
					<td class='nav'><a class='nav' href='https://www.stevenschessclub.com/'>Main Page</a></td>
					<td class='nav'><a class='nav' href='https://www.innovativeprogramming.org/stevenschessclub.com/members/play'>Play Chess</a></td>
					<td class='nav'><a class='nav' href='https://orgsync.com/50809/chapter'>Join Us</a></td>
					<td class='nav'><a class='nav' href='https://www.stevenschessclub.com/login/'>Member's Portal</a></td>
					
				</tr>
			</table>
		</nav>
	<h2>About Page HTML</h2>

	<form method='POST' action='https://www.innovativeprogramming.org/stevenschessclub.com/admin/'>
		<textarea name='about'><?php echo file_get_contents("../resources/aboutHTML.txt"); ?></textarea>
				<!--<span><br><label>Please enter your password</label><input type='password' name='pass'></span>-->
				<br><input class='submit' type='submit' name='aboutHTML' value='Update'>
	</form>
	<h2>About Page CSS</h2>
	<form method='POST' action='https://www.innovativeprogramming.org/stevenschessclub.com/admin/'>
		<textarea name='about'><?php echo file_get_contents("../resources/aboutCSS.txt"); ?></textarea>
				<!--<span><br><label>Please enter your password</label><input type='password' name='pass'></span>-->
				<br><input class='submit' type='submit' name='aboutCSS' value='Update'>
	</form>
	<h2>Event HTML</h2>
	<form method='POST' action='https://www.innovativeprogramming.org/stevenschessclub.com/admin/'>
		<textarea name='event'><?php echo file_get_contents("../resources/eventsHTML.txt"); ?></textarea>
				<!--<span><br><label>Please enter your password</label><input type='password' name='pass'></span>-->
				<br><input class='submit' type='submit' name='eventHTML' value='Update' >
	</form>
	<h2>Event CSS</h2>
	<form method='POST' action='https://www.innovativeprogramming.org/stevenschessclub.com/admin/'>
		<textarea name='event'><?php echo file_get_contents("../resources/eventsCSS.txt"); ?></textarea>
				<!--<span><br><label>Please enter your password</label><input type='password' name='pass'></span>-->
				<br><input class='submit' type='submit' name='eventCSS' value='Update'>
		</form>
	</main>
	</body>
</html>
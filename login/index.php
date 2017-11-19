<?php
	require_once "../resources/sql.php";
	require_once "../resources/password.php";
	session_start();

?>
<!DOCTYPE html>
<html lang='en-US'>
    <head>
        <title>Welcome</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="shortcut icon" type="image/x-icon" href="https://www.innovativeprogramming.org//stevenschessclub.com/resources/favicon.ico" />
        <link type="text/css" rel="stylesheet" href='https://www.innovativeprogramming.org//stevenschessclub.com/resources/chess.css' />
        <link type="text/css" rel="stylesheet" href='https://www.innovativeprogramming.org//stevenschessclub.com/resources/login.css' />
    </head>
   
    <body class='members'>
    <script type="application/ld+json"> { 
            "@context" : "http://schema.org/",
            "@type" : "Organization", 
            
            "url":"https://www.innovativeprogramming.org/",
            "email":"services@innovativeprogramming.org",
            "sponsor":{
                "@type":"EducationalOrganization",
                "name":"Steven's Institute of Technology",
                "address":"1 Castle Point Terrace, Hoboken, NJ 07030"
            }
            "member":{
                "@type":"Person",
                "name":"Nathaniel Blakely",
                "jobTitle":"Social Chair",
                "url":"https://www.innovativeprogramming.org"
            }
            "location":"Steven's Institute Of Technology",
            "address":"1 Castle Point Terrace, Hoboken, NJ 07030"
        }
         </script>
    <script src='/chess/resources/login.js'></script>
    <?php
        	
		if(filter_input(INPUT_SERVER, "REQUEST_METHOD", FILTER_SANITIZE_STRING)== "POST" ){
			
			if(!empty($_POST['acc'])){
				
				$pass1 = $user = $email = $fname = $lname = '';
				$valid = true;
				$inputErr = '';
				if(!filter_input(INPUT_POST,'fname',FILTER_SANITIZE_STRING)){
					$valid = false;
					$inputErr = 'Invalid First Name';
				}else{
					$fname = filter_input(INPUT_POST,'fname',FILTER_SANITIZE_STRING);
				}
				if(!filter_input(INPUT_POST,'lname',FILTER_SANITIZE_STRING)){
					$valid = false;
					$inputErr = 'Invalid Last Name';
				}else{
					$lname = filter_input(INPUT_POST,'lname',FILTER_SANITIZE_STRING);
				}
				if(!filter_input(INPUT_POST,'email',FILTER_SANITIZE_STRING)){
					$valid = false;
					$inputErr = 'Invalid Email';
				}else{
					$email = filter_input(INPUT_POST,'email',FILTER_SANITIZE_STRING);
				}
				if(!filter_input(INPUT_POST,'user',FILTER_SANITIZE_STRING)){
					$valid = false;
					$inputErr = 'Invalid Username';
				}else{
					$user = filter_input(INPUT_POST,'user',FILTER_SANITIZE_STRING);
				}
				if(!filter_input(INPUT_POST,'pass1',FILTER_SANITIZE_STRING)){
					$valid = false;
					$InputErr = 'Invalid Password';
				}else{
					$pass1 = filter_input(INPUT_POST,'pass1',FILTER_SANITIZE_STRING);
				}
				if(!filter_input(INPUT_POST,'pass2',FILTER_SANITIZE_STRING)){
					$valid = false;
					$InputErr='Invalid Password';
				}else{
					if($pass1 != filter_input(INPUT_POST,'pass2',FILTER_SANITIZE_STRING)){
						$valid = false;
						$InputErr = 'Passwords do not match';
					}
				}
				if(!$valid){
					echo "<script>alert('".$InputErr."');</script>";
				}else{
					
				}
				if($valid){
					$conn = SQLConn::getConn();
					if ($conn->connect_error) {
						echo "<script>alert('Problem connecting to main server');</script>";
					}
					$stmt = $conn->prepare("SELECT * FROM users WHERE Username=?");
					$stmt->bind_param('s',$user);
					if(SQLConn::getResults($stmt) != NULL){
						$valid = false;
						echo "<script>alert('Username is already taken');</script>";
					}
					$stmt->close();
					if($valid){
						$salt = Password::getNewSalt();
						$password = Password::hash($pass1,$salt);
						$stmt = $conn->prepare("INSERT INTO users (Username, Password,Salt,Email,First_Name,Last_Name,Time) VALUES (?,?,?,?,?,?,?)");
						$stmt->bind_param('ssssssi',$user,$password,$salt,$email,$fname,$lname,time());
						

						if(!$stmt->execute()){
							$valid = false;
							echo "<script>alert(\"".$conn->error."\\n".$stmt->error."\");</script>";
						}
						$stmt->close();
						
						if($conn->error){
							echo "<script>alert('Error Creating Account');</script>";
							$valid = false;
						}
						$conn->close();
					}
            				if($valid){
            				
            					$_SESSION['user']=$user;
            					$_SESSION['ip']= $_SERVER['REMOTE_ADDR'];
            					
            					unset($out,$salt,$password,$result,$user,$fname,$lname);;
            				}
				}else{
					echo "<script>alert('invalid input');</script>";
				}
				if($valid){
					
					echo "<script>window.location='/chess/members/';</script>";
				}
			}else{    /******************************************************BEGIN LOGIN SECTION**************************************************************/
				
				$pass = $user = $password = '';
				$key = null;
				$valid = true;
				$error = 'Error Logging In';
				if(!filter_input(INPUT_POST,'user',FILTER_SANITIZE_STRING)){
					$valid = false;
					$error = "Please enter your username\n";
				}else{
					$user = filter_input(INPUT_POST,'user',FILTER_SANITIZE_STRING);
				}
				if(!filter_input(INPUT_POST,'pass',FILTER_SANITIZE_STRING)){
					$valid = false;
					$error = "Please enter your password";
				}else{
					$pass1 = filter_input(INPUT_POST,'pass',FILTER_SANITIZE_STRING);
				}
				if($valid){
					$conn = SQLConn::getConn();
					$stmt = $conn->prepare("SELECT * FROM users WHERE Username=?");
					$stmt->bind_param('s',$user);
					$result = SQLConn::getResult($stmt);
					$stmt->close();
					$conn->close();
					if($result == NULL){
						$error = 'User does not exist';
						$valid = false;
					}else{
						if(!PasswordVerify::verify($user,$pass1)){
							$valid = false;
							$error = 'Incorrect Password';
						}
					}

				}
				if($valid){
					/*Login Successful   */
					$_SESSION['user'] = $user;
					$_SESSION['ip']= $_SERVER['REMOTE_ADDR'];
					echo "<script>window.location='/chess/members/';</script>";
				}else{
					echo"<script>
						
						alert('".$error."');
						oldUserRetry(".$user.");
					     </script>";
					     
				}
			}
		}
        ?>
        
        
            <h1 class='members'>Steven's Chess Club</h1>
            <nav class='chess'>
            <table>
                <tr class='nav'>
                    <td class='nav'><a class='nav' href='/chess/'>Home</a></td>
                    <td class='nav'><a class='nav' href='/chess/about/'>About</a></td>
                    <td class='nav'><a class='nav' href='/chess/events/'>Events</a></td>
                    <td class='nav'><a class='nav' href='https://orgsync.com/50809/chapter'>Join Us</a></td>
                    <td class='nav'><a class='nav' href='/chess/login/'>Member's Portal</a></td>
                </tr>
            </table>
        </nav>
            <main class='members' id='home'>
            <div id='login' class='welcome'>
                <h2 class='login'>Welcome!</h2>
                <button onclick='newUser()' id='newU'>New User</button>
                <button onclick='oldUser()' id='oldU'>Returning User</button>
                
            </div>
            
            
        </main>
    </body>
</html>

<?php
    require_once "../resources/info.php";
    require_once "../resources/sql.php";
    session_start();

        
?>
<!DOCTYPE html>
<?php
           
                if($_SESSION['ip']!=$_SERVER['REMOTE_ADDR']){
                    echo"<script>alert('Please Log In Again');window.location='/chess/login/';</script>";
                }
                $conn = SQLConn::getConn();
                $stmt = $conn->prepare("SELECT * FROM users WHERE Username = ?");
                $stmt->bind_param('s',$_SESSION['user']);
                $data = SQLConn::getResult($stmt);
                if($data == NULL){
                    echo "<script>alert('Error: User not found');</script>";
                } 
                $stmt->close();
                $conn->close();

        ?>
<html lang='en-US'>
    <head>
        <title>Hello, <?php echo $_SESSION['user'];?></title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name='description' content = 'The members only area of the Stevens Chess Club Website'>
        <link rel="shortcut icon" type="image/x-icon" href="https://www.innovativeprogramming.org/stevenschessclub.com/resources/favicon.ico" />
        <link type="text/css" rel="stylesheet" href='https://www.innovativeprogramming.org/stevenschessclub.com/resources/chess.css' />
        <link type="text/css" rel="stylesheet" href='https://www.innovativeprogramming.org/stevenschessclub.com/resources/members.css' />
    </head>
    <body class='members'>
        <?php Info::getJSON(); ?>
        <h1 class='title'>Chess Club</h1>
        <main class='home' id='memberHome'>
            <nav class='chess'>
            <table>
                <tr class='nav'>
                    <td class='nav'><a class='nav' href='/chess/members/'>Home</a></td>
                    <td class='nav'><a class='nav' href='/chess/'>Homepage</a></td>
                    <td class='nav'><a class='nav' href='/chess/members/play/'>Play Chess</a></td>
                    <td class='nav'><a class='nav' href='/chess/events/'>Events</a></td>
                    <td class='nav'><a class='nav' href='https://orgsync.com/50809/chapter'>Join Us</a></td>
                     <?php
                        if($data['Type']=="A"){
                            echo " <td class='nav'><a class='nav' href='/chess/admin/'>Admin Tools</a></td>";
                        }

                    ?>
                </tr>
            </table>
        </nav>
        
            <div class='stats'>
                <h2 class='user'><?php echo $_SESSION['user']; ?>'s current stats</h2>
                <table class='stats'>
                    <tr>
                        <td class='title'>Bug House</td>
                        <td class='title'>Regular Chess</td>
                    </tr>
                    <tr>
                        <td>Games Played: <?php echo $data['BPlayed']; ?></td>
                        <td>Games Played: <?php echo $data['Played']; ?> </td>
                    </tr>
                    <tr>
                        <td>Games Won: <?php echo $data['BWon']; ?></td>
                        <td>Games Won: <?php echo $data['Won']; ?> </td>
                    </tr>
                   <tr>
                        <td>Draws: <?php echo $data['BDraw']; ?></td>
                        <td>Draws: <?php echo $data['Draw']; ?> </td>
                    </tr>
                    <tr>
                        <td>Games Lost: <?php echo $data['BLost']; ?></td>
                        <td>Games Lost: <?php echo $data['Lost']; ?> </td>
                    </tr>
                </table>
            </div>
        </main>
    </body>
</html>

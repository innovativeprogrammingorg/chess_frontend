<?php 
require_once "../../../resources/sql.php";
require_once "../../../resources/info.php";
session_start();
?>
<!DOCTYPE html>
<html>
    <head>
        <?php Info::getHeader("Bug House",'Play Chess online with other club members!','chess.css','members.css','bhouse.css');  ?>
    </head>
   <body class='members' onload='autoChat()'>
   <?php
        
       
        if($_SESSION['ip']!=$_SERVER['REMOTE_ADDR']){
            echo"<script>alert('Please Log In Again');window.location='/login/';</script>";
            $_SESSION = array();
            exit();
        }
        
        if(!isset($_SESSION['game'])&&isset($_SESSION['lobby'])) {
            $conn = SQLConn::getConn();
            $stmt = $conn->prepare("SELECT * FROM chessgame WHERE (White = ? OR Black = ?) AND LID = ?");
            $stmt->bind_param('ssi',$_SESSION['user'],$_SESSION['user'],$_SESSION['lobby']);
            $data = SQLConn::getResult($stmt);
            $stmt->close();
            $conn->close();
            $_SESSION['game'] = $data['ID'];
        }
        
    ?>
        <h1 class='title'>Chess Club Member's Area</h1>
        <main class='home' id='memberHome'>
            <nav class='chess'>
                <table>
                    <tr class='nav'>
                        <td class='nav'><a class='nav' href='/members/'>Home</a></td>
                        <td class='nav'><a class='nav' href='/'>Main Page</a></td>
                        <td class='nav'><a class='nav' href='/members/play/'>Play Chess</a></td>
                        <td class='nav'><a class='nav' href='/members/'>Profile</a></td>
                    </tr>
                </table>
            </nav>
            <iframe src='/resources/bug_house_infopanel_board_combination.php' class='board'></iframe>
            <iframe src='/resources/smallboard.php' class='board2'></iframe>
            <div class='chat' id='chat' onkeypress='chatHandle(event)'>
               <div onscroll='scroll();' id='messages' class='messages'>
               </div>
                   <input id='msg' type='text' name='message' class='chat' autocomplete="off">
                   <input onclick='send()' type='button' name='chat' class='submit' value='Send'>
           </div>
           <script src='/resources/bhchat.js'></script>
        </main>
    </body>
</html>

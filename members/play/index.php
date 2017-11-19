<?php 
require_once "../../resources/sql.php";
require_once "../../resources/info.php";
session_start();
?>
<!DOCTYPE html>
<html lang='en-US'>
    <head>
        <?php Info::getHeader("Play Chess",'Play Chess online with other club members!','chess.css','members.css','play.css');  ?>
    </head>
    <body onload='start()' class='members'>
        <?php   Info::getJSON(); 
                Info::basic_init($_SESSION['user']);
        ?>
        <script src="/chess/resources/play.js"></script>
       <h1 class='title'>Chess Club Member's Area</h1>
       <main class='home' id='memberHome'>
            <nav class='chess'>
                <table>
                    <tr class='nav'>
                        <td class='nav'><a class='nav' href='/chess/members/'>Home</a></td>
                        <td class='nav'><a class='nav' href='/chess/'>Main Page</a></td>
                        <td class='nav'><a class='nav' href='/chess/members/play/'>Play Chess</a></td>
                        <td class='nav'><a class='nav' href='/chess/members/'>Profile</a></td>
                    </tr>
                </table>
                
            </nav>
            
            <?php
                if($_SESSION['ip']!=$_SERVER['REMOTE_ADDR']){
                    echo"<script>alert('Please Log In Again');window.location='/chess/login/';</script>";
                    $_SESSION = array();
                    exit();
                }
            ?>

            <div class='join'>
                <h2 class='title'>Join a Game</h2>
                <div id = 'join' class='games'>
                </div>
            </div>
            <div class='resume'>
                <h2 class='title'>Resume a Game</h2>
                <div id = 'resume' class='games'>
                <?php
                    $conn = SQLConn::getConn();
                    $stmt = $conn->prepare("SELECT * FROM chessgame WHERE White=? OR Black=? LIMIT 20");
                    $stmt->bind_param('ss',$_SESSION['user'],$_SESSION['user']);
                    $results = SQLConn::getResults($stmt);
                    $stmt->close();
                    if($results != NULL){
                        foreach($results as $row){
                            $x = 0;
                            echo"<div class='game'>
                            <span>".$row['White']." vs ".$row['Black']."</span>
                            <span> ".$row['Type']." </span>
                            <form method='GET' action='/chess/members/game/chess/index.php?id=".$row['ID']."'>
                            <button class='join' type='submit' name='id' value='".$row['ID']."'>Join</button>
                            </form>
                        </div>";
                        } 
                    }
                   
                    $conn->close();
                ?>  
                </div>
            </div>
            <div id='online' class='online'></div>
            <div class='create'>
                <h2 class='title'>Create a Game</h2>
                <div class='form'>
                    <label>Game Type</label>
                    <select id='type' name='type'>
                        <option>Regular</option>
                        <option>Bug House</option>
                    </select><br>

                    <label>Time Limit</label>
                    <select id='timeMin' name='timeMin'>
                        <option></option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>5</option>
                        <option>10</option>
                        <option>15</option>
                        <option>20</option>
                        <option>30</option>
                        <option>60</option>
                    </select>

                    <label id='timeHelp'> : </label>
                    <select id='timeSec' name='timeSec'>
                        <option></option>
                        <option>00</option>
                        <option>15</option>
                        <option>30</option>
                        <option>45</option>
                    </select><br>
                    <label>Increment</label>
                    <input id ='inc' type='number' min='0' max='15' name='increment' value='0'><br>

                    <label>Side </label>
                    <select id='side' name='player'>
                        <option>Random</option>
                        <option>White</option>
                        <option>Black</option>
                    </select><br>

                    <button onclick='create()' class='create'>Create Game</button>
                </div>
            </div>
            <div class='chat' id='chat' onkeypress='chatHandle(event)'>
               <div onscroll='scroll();' id='messages' class='messages'>
               </div>
                   <input id='msg' type='text' name='message' class='chat' autocomplete="off">
                   <input onclick='send()' type='button' name='chat' class='submit' value='Send'>
           </div>
       </main>
    </body>
</html>

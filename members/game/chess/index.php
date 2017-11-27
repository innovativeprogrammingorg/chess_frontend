<?php 
require_once "../../../resources/sql.php";
require_once "../../../resources/info.php";
session_start();
?>
<!DOCTYPE html>
<html>
    <head>
        <?php Info::getHeader("SCC game",'Play Chess online with other club members!','chess.css','members.css','bhouse.css','BHIBC.css','board.css');  ?>
        <style>
            #pieceHolder{
                background-color:transparent;
                border-style:solid;
                border-color:transparent;
                position:absolute;
                width:823px;
                height:823px;
            }
            #undoHolder{
                position:absolute;
                z-index: 20;
                bottom:-200px;
                left:27%;
            }
            #drawHolder{
                width:200px;
                position:absolute;
                top:40px;
                left:-50px;
            }
            #undo{
                padding:3px 6px 3px 6px;
            }
            #resign, #offerDraw{
                padding:3px 6px 3px 6px;
                margin:4px 10px 4px 10px;
            }
            #acceptDraw{
                background-color: green;
                color:white;
                padding:3px 6px 3px 6px;
            }
            #declineDraw{
                background-color: red;
                color:white;
                padding:3px 6px 3px 6px;
            }
            #promotion{
                z-index:-10;
                position:absolute;
                top:0;
                right:0;
                width:101px;
            }
            #main{
                position:relative;
                margin: 5% 0 10% 2%;
                user-select: none;
            }
        </style>
    </head>
    <body class='members'>
    
    <?php
        Info::getJSON();
        Info::initWebsocket($_SESSION['user'],intval($_GET['id']));
        if($_SESSION['ip']!=$_SERVER['REMOTE_ADDR']){
            echo"<script>alert('Please Log In Again');window.location='/chess/login/';</script>";
        }
        $_SESSION['game'] = intval($_GET['id']);
    ?>
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
            <div id="debug">
                <p id="out_row">X</p>
                <p id="out_col">X</p>
            </div>
            <div id="main" class="board">
                <div onmousemove = 'mouseLocation(event)'  id='pieceHolder'></div>
                <div id ='promotion'></div>
                <table id='board' class='board' id='board'>
                    <?php
                        for($i=0;$i<8;$i++){
                            echo "<tr>";
                            for($j=0;$j<8;$j++){
                                    echo "<td class='tile'></td>";                        
                            }
                            echo "</tr>";
                        }
                    ?>
                </table>

                <div class='infopanel'>
                    <h2 id='turn' class='info'>White's Turn</h2>
                    <div class='history'>
                        <table id ='white_moves' class='history'>
                            <tr>
                                <th>White</th>
                               
                            </tr>
                        </table>
                        <table id ='black_moves' class='history'>
                            <tr>
                                <th>Black</th>
                               
                            </tr>
                        </table>
                        </div>
                    <h2 class='time'>Time</h2>
                    <p id ='WTime' class='time'>White -:--</p>
                    <p id ='BTime' class='time'>Black -:--</p>
                    <div id='WPieces' class='pieces'></div>
                    <div id='BPieces' class='pieces'></div>
                    <div id='undoHolder'>
                        <button onclick='undo()' id='undo' >Undo</button>
                        <button onclick='resign()' id='resign'>Resign</button>
                        <button onclick='offerDraw()' id='offerDraw'>Offer Draw</button>
                        
                    </div>
                </div>
                <script src='/chess/resources/chess.js'></script>
            </div> 
            <div class='chat' id='chat' onkeypress='chatHandle(event)'>
               <div onscroll='scroll();' id='messages' class='messages'>
               </div>
                   <input id='msg' type='text' name='message' class='chat' autocomplete="off">
                   <input onclick='send()' type='button' name='chat' class='submit' value='Send'>
           </div>
           <script src='/chess/resources/chat.js'></script>
        </main>
        
    </body>
</html>
        var height = 264;
        var width = 264;
        var xshift = 11;
        var yshift = 12;
        function updateOnce(){
             var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200){
                        drawBoard(this.responseText);
                }};
            xmlhttp.open("GET", "https://www.innovativeprogramming.org/stevenschessclub.com/resources/small_board_update.php", true);
            xmlhttp.send();
            setTimeout(updateOnce,1000);
        }
        function getCharAt(string,index){
                 return string.substr(index,1);                
            }
        function drawBoard(FEN){
            var out = '';
            var inp = FEN;
            while(inp.search("/")!=-1){
                inp = inp.replace("/","");
            }

            for(var i = 0;i<8;i++){
                for(var j = 0; j<8;j++){
                    var piece = getCharAt(inp,(i*8)+j);
                        
                    var x = xshift + Math.floor(((width/8))*j);
                    var y = yshift + Math.floor((height/8))*i;
                    switch(piece){
                        case "K":
                            out = out.concat("<img draggable='false' class='piece' alt=\"whiteKing\" style=\"position:absolute; width: 30px; left:"+x+"px; top:"+y+"px;\" src =\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/wKing.svg\">");
                            break;
                        case "Q":
                        case "T":
                            out = out.concat("<img draggable='false' class='piece' alt=\"whiteQueen\" style=\"position:absolute; width: 30px; left:"+x+"px; top:"+y+"px;\" src =\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/wQueen.svg\">");
                            break;
                        case "R":
                        case "S":
                            out = out.concat("<img draggable='false' class='piece' alt=\"whiteRook\" style=\"position:absolute; width: 30px; left:"+x+"px; top:"+y+"px;\" src =\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/wRook.svg\">");
                            break;
                        case "B":
                        case "A":
                            out = out.concat("<img draggable='false' class='piece' alt=\"whiteBishop\" style=\"position:absolute; width: 30px; left:"+x+"px; top:"+y+"px;\" src =\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/wBishop.svg\">");
                            break;
                        case "N":
                        case "O":
                            out = out.concat("<img draggable='false' class='piece' alt=\"whiteKnight\" style=\"position:absolute; width: 30px; left:"+x+"px; top:"+y+"px;\" src =\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/wKnight.svg\">");
                            break;
                        case "P":
                            out = out.concat("<img draggable='false' class='piece' alt=\"whitePawn\" style=\"position:absolute; width: 30px; left:"+x+"px; top:"+y+"px;\" src =\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/wPawn.svg\">");
                            break;
                        case "k":
                            out = out.concat("<img draggable='false' class='piece' alt=\"blackKing\" style=\"position:absolute; width: 30px; left:"+x+"px; top:"+y+"px;\" src =\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/bKing.svg\">");
                            break;
                        case "q":
                        case "t":
                            out = out.concat("<img draggable='false' class='piece' alt=\"blackQueen\" style=\"position:absolute; width: 30px; left:"+x+"px; top:"+y+"px;\" src =\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/bQueen.svg\">");
                            break;
                        case "r":
                        case "s":
                            out = out.concat("<img draggable='false' class='piece' alt=\"blackRook\" style=\"position:absolute; width: 30px; left:"+x+"px; top:"+y+"px;\" src =\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/bRook.svg\">");
                            break;
                        case "b":
                        case "a":
                            out = out.concat("<img draggable='false' class='piece' alt=\"blackBishop\" style=\"position:absolute; width: 30px; left:"+x+"px; top:"+y+"px;\" src =\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/bBishop.svg\">");
                            break;
                        case "n":
                        case "o":
                            out = out.concat("<img draggable='false' class='piece' alt=\"blackKnight\" style=\"position:absolute; width: 30px; left:"+x+"px; top:"+y+"px;\" src =\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/bKnight.svg\">");
                            break;
                        case "p":
                            out = out.concat("<img draggable='false' class='piece' alt=\"blackPawn\" style=\"position:absolute; width: 30px; left:"+x+"px; top:"+ y +"px;\" src =\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/bPawn.svg\">");
                            break;
                        default:
                            break;
                    }
                }
            }

            document.getElementById("pH").innerHTML = out;
            return;
        }
            var turn;
            var side;
            var timeUpdate;
            var pieceUpdate;
            var moveUpdate;
            var turnUpdate;
            var sR = '';
            var sC = '';
            var placed = false;
            var piece = '';
            var updater;
            var bTimeMinutes;
            var bTimeSeconds;
            var wTimeSeconds;
            var wTimeMinutes;
            var e;
            var height = 840;
            var width = 823;
            var m; //the variable that contains the movement refresh timeout
            var XPOS;
            var YPOS;
            var xshift = 850;
            var yshift = 540;
            var bshift = 120;
            var xoffset = 50;
            var yoffset = 70;
            var lastMoveRow = -1;
            var lastMoveCol = -1;
            function start(){
                getTime();
                setInterval(tick,1000);
                autoTurn();
                autoMoves();
                
                updateOnce();
                setInterval(updatePiecesOnce,5000);
                change();
            }
            function setSide(s){
                side = s;
            }
            function setEvent(event){
                e = event;
            }
            function stop(){
                clearTimeout(m);
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
                for(var k = 0;k<8;k++){
                    for(var l = 0; l<8;l++){
                        var piece = '';
                        var i = 0;
                        var j = 0;
                        if(side=='b'){
                            piece = getCharAt(inp,(inp.length-((k*8)+l))-1);
                            i = 7-k;
                            j = 7-l;
                        }else{
                            piece = getCharAt(inp,(k*8)+l);
                            i = k;
                            j = l;
                        }
                        var x = Math.floor(((width/8))*l);
                        var y = Math.floor((height/8)-2)*k;
                        switch(piece){
                            case "K":
                                out = out.concat("<img draggable='false' onmousedown='movement(this,"+(9-(i+1))+","+(j+1)+")' onmouseup='move2(this)' class='piece' alt=\"whiteKing\" style=\"position:absolute; width: 100px; left:"+x+"px; top:"+y+"px;\" src =\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/wKing.svg\">");
                                break;
                            case "Q":
                            case "T":
                                out = out.concat("<img draggable='false' onmousedown='movement(this,"+(9-(i+1))+","+(j+1)+")' onmouseup='move2(this)' class='piece' alt=\"whiteQueen\" style=\"position:absolute; width: 100px; left:"+x+"px; top:"+y+"px;\" src =\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/wQueen.svg\">");
                                break;
                            case "R":
                            case "S":
                                out = out.concat("<img draggable='false' onmousedown='movement(this,"+(9-(i+1))+","+(j+1)+")' onmouseup='move2(this)' class='piece' alt=\"whiteRook\" style=\"position:absolute; width: 100px; left:"+x+"px; top:"+y+"px;\" src =\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/wRook.svg\">");
                                break;
                            case "B":
                            case "A":
                                out = out.concat("<img draggable='false' onmousedown='movement(this,"+(9-(i+1))+","+(j+1)+")' onmouseup='move2(this)' class='piece' alt=\"whiteBishop\" style=\"position:absolute; width: 100px; left:"+x+"px; top:"+y+"px;\" src =\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/wBishop.svg\">");
                                break;
                            case "N":
                            case "O":
                                out = out.concat("<img draggable='false' onmousedown='movement(this,"+(9-(i+1))+","+(j+1)+")' onmouseup='move2(this)' class='piece' alt=\"whiteKnight\" style=\"position:absolute; width: 100px; left:"+x+"px; top:"+y+"px;\" src =\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/wKnight.svg\">");
                                break;
                            case "P":
                                out = out.concat("<img draggable='false' onmousedown='movement(this,"+(9-(i+1))+","+(j+1)+")' onmouseup='move2(this)' class='piece' alt=\"whitePawn\" style=\"position:absolute; width: 100px; left:"+x+"px; top:"+y+"px;\" src =\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/wPawn.svg\">");
                                break;
                            case "k":
                                out = out.concat("<img draggable='false' onmousedown='movement(this,"+(9-(i+1))+","+(j+1)+")' onmouseup='move2(this)' class='piece' alt=\"blackKing\" style=\"position:absolute; width: 100px; left:"+x+"px; top:"+y+"px;\" src =\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/bKing.svg\">");
                                break;
                            case "q":
                            case "t":
                                out = out.concat("<img draggable='false' onmousedown='movement(this,"+(9-(i+1))+","+(j+1)+")' onmouseup='move2(this)' class='piece' alt=\"blackQueen\" style=\"position:absolute; width: 100px; left:"+x+"px; top:"+y+"px;\" src =\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/bQueen.svg\">");
                                break;
                            case "r":
                            case "s":
                                out = out.concat("<img draggable='false' onmousedown='movement(this,"+(9-(i+1))+","+(j+1)+")' onmouseup='move2(this)' class='piece' alt=\"blackRook\" style=\"position:absolute; width: 100px; left:"+x+"px; top:"+y+"px;\" src =\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/bRook.svg\">");
                                break;
                            case "b":
                            case "a":
                                out = out.concat("<img draggable='false' onmousedown='movement(this,"+(9-(i+1))+","+(j+1)+")' onmouseup='move2(this)' class='piece' alt=\"blackBishop\" style=\"position:absolute; width: 100px; left:"+x+"px; top:"+y+"px;\" src =\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/bBishop.svg\">");
                                break;
                            case "n":
                            case "o":
                                out = out.concat("<img draggable='false' onmousedown='movement(this,"+(9-(i+1))+","+(j+1)+")' onmouseup='move2(this)' class='piece' alt=\"blackKnight\" style=\"position:absolute; width: 100px; left:"+x+"px; top:"+y+"px;\" src =\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/bKnight.svg\">");
                                break;
                            case "p":
                                out = out.concat("<img draggable='false' onmousedown='movement(this,"+(9-(i+1))+","+(j+1)+")' onmouseup='move2(this)' class='piece' alt=\"blackPawn\" style=\"position:absolute; width: 100px; left:"+x+"px; top:"+ y +"px;\" src =\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/bPawn.svg\">");
                                break;
                            case "c":
                                out = out.concat("<img draggable='false' onmousedown='bkmovement(this,"+(9-(i+1))+","+(j+1)+")' onmouseup='move2(this)' class='piece' alt=\"blackKing\" style=\"position:absolute; width: 100px; left:"+x+"px; top:"+y+"px;\" src =\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/bKingCheck.svg\">");
                                break;
                            case "C":
                                out = out.concat("<img draggable='false' onmousedown='wkmovement(this,"+(9-(i+1))+","+(j+1)+")' onmouseup='move2(this)' class='piece' alt=\"whiteKing\" style=\"position:absolute; width: 100px; left:"+x+"px; top:"+y+"px;\" src =\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/wKingCheck.svg\">");
                                break;
                            default:
                                break;
                        }
                    }
                }
                out = out.concat("<div id='WPieces' class='pieces'></div><div id='BPieces' class='pieces'></div>");
                document.getElementById("pieceHolder").innerHTML = out;
                updatePiecesOnce();
                return;
            }
            function drawWhitePieces(input){
                var out = '';
                var x = 0;
                var y = 0;
                for(var i = 0; i<input.length;i++){
                    var p = getCharAt(input,i);
                    y = yshift;
                    if(i>4){
                        y = (((i- i%4)/4)*40)+yshift;
                    }
                    x = ((i%4)*40)+xshift;
                    switch(p){
                        case "k":
                            out = out.concat("<img draggable='false' onmouseup='place2(this)' onmousedown=\"placemove(this,'k')\"  style=\"width:40px; position:absolute; left:"+x+"px; top:"+y+"px;\" class='piece' alt='blackKing' src=\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/bKing.svg\">");
                            break;
                        case "q":
                            out = out.concat("<img draggable='false' onmouseup='place2(this)' onmousedown=\"placemove(this,'q')\"  style=\"width:40px; position:absolute; left:"+x+"px; top:"+y+"px;\" class='piece' alt='blackQueen' src=\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/bQueen.svg\">");
                            break;
                        case "r":
                            out = out.concat("<img draggable='false' onmouseup='place2(this)' onmousedown=\"placemove(this,'r')\"  style=\"width:40px; position:absolute; left:"+x+"px; top:"+y+"px;\" class='piece' alt='blackRook' src=\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/bRook.svg\">");
                            break;
                        case "b":
                            out = out.concat("<img draggable='false' onmouseup='place2(this)' onmousedown=\"placemove(this,'b')\"  style=\"width:40px; position:absolute; left:"+x+"px; top:"+y+"px;\" class='piece' alt='blackBishop' src=\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/bBishop.svg\">");
                            break;
                        case "n":
                            out = out.concat("<img draggable='false' onmouseup='place2(this)' onmousedown=\"placemove(this,'n')\"  style=\"width:40px; position:absolute; left:"+x+"px; top:"+y+"px;\" class='piece' alt='blackKnight' src=\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/bKnight.svg\">");
                            break;
                        case "p":
                            out = out.concat("<img draggable='false' onmouseup='place2(this)' onmousedown=\"placemove(this,'p')\"  style=\"width:40px; position:absolute; left:"+x+"px; top:"+y+"px;\" class='piece' alt='blackPawn' src=\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/bPawn.svg\">");
                            break;
                    }
                }
                document.getElementById("WPieces").innerHTML = out;
                return;
            } 
            function drawBlackPieces(input){
                var out = '';
                var x = 0;
                var y = 0;
                for(var i = 0; i<input.length;i++){
                    var p = getCharAt(input,i);
                    y = yshift+bshift;
                    if(i>4){
                        y = (((i- i%4)/4)*40)+yshift+bshift;
                    }
                    x = ((i%4)*40)+xshift;
                    switch(p){
                        case "K":
                            out = out.concat("<img draggable='false' onmouseup='place2(this)' onmousedown=\"placemove(this,'K')\"  style=\"width:40px; position:absolute; left:"+x+"px; top:"+y+"px;\" class='piece' alt='whiteKing' src=\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/wKing.svg\">");
                            break;
                        case "Q":
                            out = out.concat("<img draggable='false' onmouseup='place2(this)' onmousedown=\"placemove(this,'Q')\"  style=\"width:40px; position:absolute; left:"+x+"px; top:"+y+"px;\" class='piece' alt='whiteQueen' src=\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/wQueen.svg\">");
                            break;
                        case "R":
                            out = out.concat("<img draggable='false' onmouseup='place2(this)' onmousedown=\"placemove(this,'R')\"  style=\"width:40px; position:absolute; left:"+x+"px; top:"+y+"px;\" class='piece' alt='whiteRook' src=\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/wRook.svg\">");
                            break;
                        case "B":
                            out = out.concat("<img draggable='false' onmouseup='place2(this)' onmousedown=\"placemove(this,'B')\"  style=\"width:40px; position:absolute; left:"+x+"px; top:"+y+"px;\" class='piece' alt='whiteBishop' src=\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/wBishop.svg\">");
                            break;
                        case "N":
                            out = out.concat("<img draggable='false' onmouseup='place2(this)' onmousedown=\"placemove(this,'N')\"  style=\"width:40px; position:absolute; left:"+x+"px; top:"+y+"px;\" class='piece' alt='whiteKnight' src=\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/wKnight.svg\">");
                            break;
                        case "P":
                            out = out.concat("<img draggable='false' onmouseup='place2(this)' onmousedown=\"placemove(this,'P')\"  style=\"width:40px; position:absolute; left:"+x+"px; top:"+y+"px;\" class='piece' alt='whitePawn' src=\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/wPawn.svg\">");
                            break;
                    }
                }
                
                document.getElementById("BPieces").innerHTML = out;
                return;
            } 
            function movement(element, row, col){
                if(lastMoveCol!=-1&&lastMoveRow!=-1){
                            removeLastMoveDraw();
                        }
                if(sC==''){
                    sR = row;
                    sC = col;
                    element.style.zIndex= "20";
                    setTimeout(movementCont,100,element);
                }else{
                    sR = '';
                    sC = '';
                }
            }
            function placemove(element,p){
                if(placed){
                    placed = false;
                    piece = '';
                    updatePiecesOnce();
                }else{
                    placed = true;
                    piece = p;
                    element.style.position="absolute";
                    element.style.width = "100px";
                    setTimeout(movementCont,100,element);
                }
            }
            function bkmovement(element,row,col){
                element.src = "https://www.innovativeprogramming.org/stevenschessclub.com/resources/bKing.svg";
                movement(element,row,col);
            }
            function wkmovement(element,row,col){
                element.src = "https://www.innovativeprogramming.org/stevenschessclub.com/resources/wKing.svg";
                movement(element,row,col);
            }
            function mouseLocation(event){
                XPOS = event.clientX;
                YPOS = event.clientY;
            }
            function movementCont(element){
                element.style.top = (YPOS -yoffset) + "px";
                element.style.left = (XPOS - xoffset) + "px";
                m = setTimeout(movementCont,50,element);
            }     
            function place(row,col){
                updatePiecesOnce();
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        if(this.responseText=="Success"){
                            updateOnce();
                            updatePiecesOnce();
                            autoTurn();
                            autoMoves();
                        }
                        piece = '';
                        placed = false;
                    }};
                xmlhttp.open("GET", "https://www.innovativeprogramming.org/stevenschessclub.com/resources/bug_house_control.php?row="+row+"&col="+col+
                    "&sCol="+sC+"&sRow="+sR+"&placed=1&piece="+piece, true);
                xmlhttp.send();
            }
            function place2(element){
                clearTimeout(m);
                var row = 0;
                var col = 0;
                if(side=='b'){
                    row = 1+((YPOS - (YPOS%(height/8)))/(height/8));
                    col = 9-((XPOS- (XPOS%(width/8)))/(width/8)+1);
                }else{
                    row = 8- ((YPOS - (YPOS%(height/8)))/(height/8));
                    col = ((XPOS- (XPOS%(width/8)))/(width/8) + 1);
                }
                if(col<9&&col>0&&row>0&&row<9){
                     place(row,col);
                 }else{
                    updatePiecesOnce();
                 }
               
            }
            function move(row,col){
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        if(this.responseText=="Success"){
                            updateOnce();
                            autoTurn();
                            autoMoves();
                        }
                        sR = '';
                        sC = '';
                    }};
                xmlhttp.open("GET", "https://www.innovativeprogramming.org/stevenschessclub.com/resources/bug_house_control.php?row="+row+"&col="+col+
                    "&sCol="+sC+"&sRow="+sR+"&placed=0", true);
                xmlhttp.send();
            }     
            function move2(element){
                clearTimeout(m);
                element.style.zIndex = "0";
                var col = 0;
                var row = 0;
                if(side=='b'){
                    row = 1+((YPOS - (YPOS%(height/8)))/(height/8));
                    col = 9-((XPOS- (XPOS%(width/8)))/(width/8)+1);
                }else{
                    row = 8- ((YPOS - (YPOS%(height/8)))/(height/8));
                    col = ((XPOS- (XPOS%(width/8)))/(width/8) + 1);
                }
                move(row,col);
                updateOnce();
            }       
            function change(){
                var xmlhttp = new XMLHttpRequest();
                    xmlhttp.onreadystatechange = function() {
                        if (this.readyState == 4 && this.status == 200) {
                            if(this.responseText =="true"){
                                
                                updateOnce();
                                updatePiecesOnce();
                                autoTurn();
                                autoMoves();
                            }else if(this.responseText=="end"){
                                clearTimeout(updater);
                            }
                        }};
                    xmlhttp.open("GET", "https://www.innovativeprogramming.org/stevenschessclub.com/resources/change_check.php", true);
                    xmlhttp.send();
                    updater = setTimeout(change, 500);
            } 
            function updateOnce(){
                 var xmlhttp = new XMLHttpRequest();
                    xmlhttp.onreadystatechange = function() {
                        if (this.readyState == 4 && this.status == 200){
                                drawBoard(this.responseText);
                        }};
                    xmlhttp.open("GET", "https://www.innovativeprogramming.org/stevenschessclub.com/resources/update.php", true);
                    xmlhttp.send();
            }
                
            function explode(seperator,string){
                s = string;
                out = new Array();
                while(s.indexOf(seperator)!=-1){
                    out.push(s.substring(0,s.indexOf(seperator)));
                    s = s.substring(s.indexOf(seperator)+1);
                }
                out.push(s);
                if(out.length == 1){
                    out.push("");
                }
                return out;
            } 
            function autoTurn(){
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function() {
                    if(this.readyState == 4 && this.status == 200) {
                        document.getElementById("turn").innerHTML = this.responseText;
                        if(this.responseText=="White's Turn"){
                            turn = 'w';
                        }if(this.responseText=="Black's Turn"){
                            turn = 'b';
                        }else{
                            clearTimeout(timeUpdate);
                            clearTimeout(pieceUpdate);
                            clearTimeout(moveUpdate);
                            clearTimeout(turnUpdate);
                        }
                    }};
                xmlhttp.open("GET", "https://www.innovativeprogramming.org/stevenschessclub.com/resources/turn.php", true);
                xmlhttp.send();
            }
            function autoTime(){
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        time = explode("|",this.responseText);
                        document.getElementById("WTime").innerHTML = "White "+time[0];
                        document.getElementById("BTime").innerHTML = "Black "+time[1];
                        if(time[0]=="-:--"){
                            clearTimeout(timeUpdate);
                        }
                    }};
                xmlhttp.open("GET", "https://www.innovativeprogramming.org/stevenschessclub.com/resources/time.php", true);
                xmlhttp.send();
                timeUpdate = setTimeout(autoTime, 1000);
            }
            function undo(){
                 var xmlhttp = new XMLHttpRequest();
                    xmlhttp.onreadystatechange = function() {
                        if (this.readyState == 4 && this.status == 200){
                                
                        }};
                    xmlhttp.open("GET", "https://www.innovativeprogramming.org/stevenschessclub.com/resources/undo.php", true);
                    xmlhttp.send();
            }   
            function tick(){
                if(turn=='w'){
                    wTimeSeconds--;
                    if(wTimeSeconds<0){
                        wTimeSeconds = 59;
                        wTimeMinutes--;
                    }
                    if(wTimeSeconds<10){
                        document.getElementById("WTime").innerHTML = "White " + wTimeMinutes + ":0" + wTimeSeconds; 
                    }else{
                        document.getElementById("WTime").innerHTML = "White " + wTimeMinutes + ":" + wTimeSeconds; 
                    }
                }else{
                    bTimeSeconds--;
                    if(bTimeSeconds<0){
                        bTimeSeconds = 59;
                        bTimeMinutes--;
                    }
                    if(wTimeSeconds<10){
                        document.getElementById("BTime").innerHTML = "Black " + bTimeMinutes + ":0" + bTimeSeconds; 
                    }else{
                        document.getElementById("BTime").innerHTML = "Black " + bTimeMinutes + ":" + bTimeSeconds; 
                    }
                }
            }
            function getTime(){
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        time = explode("|",this.responseText);
                        tw = explode(":",time[0]);
                        tb = explode(":",time[1]);
                        wTimeMinutes = parseInt(tw[0]);
                        wTimeSeconds = parseInt(tw[1]);
                        bTimeSeconds = parseInt(tb[1]);
                        bTimeMinutes = parseInt(tb[0]);
                    }};
                xmlhttp.open("GET", "https://www.innovativeprogramming.org/stevenschessclub.com/resources/time.php", true);
                xmlhttp.send();
                timeUpdate = setTimeout(getTime, 10000);
            }
            function updatePiecesOnce(){
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        piece = explode("%",this.responseText);
                        drawBlackPieces(piece[0]);
                        drawWhitePieces(piece[1]); 
                    }};
                xmlhttp.open("GET", "https://www.innovativeprogramming.org/stevenschessclub.com/resources/bug_house_get_pieces.php", true);
                xmlhttp.send();
            }

            function drawMoves(moves){

                var out = "<tr><th>White</th><th>Black</th></tr>";
                var history = explode(',',moves);

                var whistory = new Array();
                var bhistory = new Array();
                for(var i = 0;i<Math.floor(history.length/2);i++){
                    whistory.push(history[2*i]);
                    if(i*2+1>=history.length){
                        bhistory.push('');
                    }else{
                        bhistory.push(history[2*i+1]);
                    }
                }

                
                for(i = 0; i<whistory.length;i++){
                    out = out.concat("<tr><td>"+whistory[i]+"</td><td>"+bhistory[i]+"</td></tr>");
                }

                
                document.getElementById("moves").innerHTML = out;
                if(history.length>1){
                    if(history[history.length-2]=="o-o"||history[history.length-2]=="o-o-o"){
                        if(lastMoveCol!=-1&&lastMoveRow!=-1){
                                removeLastMoveDraw();
                        }
                        return;
                    }else{
                        drawLastMove(history[history.length-2].substr(2,1),history[history.length-2].substr(1,1));
                    }
                }
                
            }
            function drawLastMove(row,col){
                var columns = ["a","b","c","d","e","f","g"];
                
                var tiles = document.getElementsByClassName("tile");
                
                
                if(side=='w'){
                    lastMoveCol = columns.indexOf(col)+1;//0-7
                    lastMoveRow = 8-parseInt(row); 

                }else{
                    lastMoveCol = (8 - columns.indexOf(col));//0-7
                    lastMoveRow = parseInt(row)-1; //0-7
                }
                
                var element = tiles[((lastMoveRow)*8)+lastMoveCol-1];
                if(lastMoveRow%2==0){
                    if(lastMoveCol%2==0){
                        element.style.backgroundColor = "#D2D48C";
                    }else{
                        element.style.backgroundColor = "#CCFFCC";
                    }
                }else{
                     if(lastMoveCol%2==1){
                        element.style.backgroundColor = "#D2D48C";
                    }else{
                        element.style.backgroundColor = "#CCFFCC";
                    }
                } 
            }
            function removeLastMoveDraw(){
                var tiles = document.getElementsByClassName("tile");
                var element = tiles[((lastMoveRow)*8)+lastMoveCol-1];
                element.style.opacity = "1";
                if(lastMoveRow%2==0){
                    if(lastMoveCol%2==0){
                        element.style.backgroundColor = "#D2B48C";
                    }else{
                        element.style.backgroundColor = "#FFFFFF";
                    }
                }else{
                     if(lastMoveCol%2==1){
                        element.style.backgroundColor = "#D2B48C";
                    }else{
                        element.style.backgroundColor = "#FFFFFF";
                    }
                } 
            }                 
            function autoMoves(){
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        if(lastMoveCol!=-1&&lastMoveRow!=-1){
                            removeLastMoveDraw();
                        }
                        drawMoves(this.responseText);
                        
                    }};
                xmlhttp.open("GET", "https://www.innovativeprogramming.org/stevenschessclub.com/resources/moves.php", true);
                xmlhttp.send();

            }
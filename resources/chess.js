var side;
var timeUpdate;
var sR = '';
var sC = '';
var updater;
var height = 830;
var width = 811;
var m;
var XPOS;
var YPOS;
var xorig;
var yorig;
var lastMoveRow = -1;
var lastMoveCol = -1;
var count = 0;
var draw = false;
var moveBlock = false;
var black_moves = 0;
var white_moves = 0;
var turn = 'n';



conn.onmessage = function(evt){
    console.log(evt);
    var msg = evt.data;
    msg = msg.substr(4);
    var data = explode(command_sep,msg);
    var command = data[0];
    data = data[1];
    switch(command){
        case "LOGGED_IN":
            var resp = prepare_message("GET_GAME_ALL",game_id);
            conn.send(resp);
            console.log(resp);
            break;
         case "CHAT":
            drawChat(data,false);
            break;
        case "CHAT_ALL":
            if(data != "none"){
                drawChat(data,true);
            } 
            break;
        case "MOVE":
            draw_move(data);
            break;
        case "MOVES_ALL":
            drawMoves(data);
            break;
        case "RESIGN":
            clearTimeout(timeUpdate);
            break;
        case "DRAW_OFFERED":
            break;
        case "SIDE":
            side = data;
            break;
        case "BOARD":
            console.log("Update board called");
            drawBoard(data);
            break;
        case "DRAW_DECLINED":
            break;
        case "TURN":
            turn = data;
            break;
        case "DRAW_ACCEPTED":
            break;
        case "TIME":
            drawTime(data);
            break;

                
    }
};

function start(){
    /*autoTime();
    autoTurn();
    autoMoves();
    updatePiecesOnce();
    updateOnce();
    change();*/
    init_game();
}
/******************************** sets the side of the current user**********************************/
function setSide(s){
    side = s;
}
/******************************** stops the current dragging process **********************************/
function stop(){
    clearTimeout(m);
}
/******************************** Easy way to retrieve a character in a string**********************************/
function getCharAt(string,index){
     return string.substr(index,1);                
    
}
/******************************** Creates the board based on the given FEN **********************************/
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
    document.getElementById("pieceHolder").innerHTML = out;
    return;
}
/******************************** sets the start location of the piece being moved, and then the calls
    movementCont to start the drag action
 **********************************/
function movement(element, row, col){
    if(side!=turn){
        return;
    }
    if(lastMoveCol!=-1&&lastMoveRow!=-1){ //only calls this function is there is a highlight
        removeLastMoveDraw(); //removes highlight when moving a piece
    }
    xorig = XPOS;
    yorig = YPOS;
    if(sC==''){
        sR = row;
        sC = col;
        element.style.zIndex= "20"; //makes sure the dragged piece won't go underneath other objects while being dragged
        m = setTimeout(movementCont,60,element);
    }else{
        sR = '';
        sC = '';
    }
}
/*******************************Changes the checked black king to the normal king when moved***********************************/
function bkmovement(element,row,col){
    
     element.src = "https://www.stevenschessclub.com/resources/bKing.svg";
     movement(element,row,col);
}
/*******************************Changes the checked white king to the normal king when moved***********************************/
function wkmovement(element,row,col){
    element.src = "https://www.stevenschessclub.com/resources/wKing.svg";
    movement(element,row,col);
}
/*******************************Stores the location of the mouse relative to the container***********************************/
function mouseLocation(event){
    XPOS = event.clientX;
    YPOS = event.clientY;
}
/******************************** Continues the dragging of the piece **********************************/
function movementCont(element){
    element.style.transform = "translate("+(XPOS-xorig)+"px,"+(YPOS-yorig)+"px)";
    m = setTimeout(movementCont,40,element);
}
/******************************** Sends the move data to the server **********************************/
function move(row,col){
    var msg = prepare_message("MOVE",game_id,sR,9-sC,row,9-col);
    conn.send(msg);
}
/******************************** Converts the raw position data into coordinates then calls move with the coords **********************************/
function move2(element){
    clearTimeout(m);
    element.style.zIndex = "0";
    element.style.transform = "translate(0px,0px)";
    var newy = parseInt(element.style.top) + (YPOS-yorig);
    var newx = parseInt(element.style.left) + (XPOS-xorig);
    //console.log("Y="+newy+" X="+newx);
    element.style.top = newy +"px";
    element.style.left = newx+"px";
    var col = 0;
    var row = 0;
    var dR = ((YPOS-yorig)-(YPOS-yorig)%100)/100;
    var dC = ((XPOS-xorig)-(XPOS-xorig)%100)/100;
    //console.log("dC="+dC + "  dR="+dR);
    //console.log("dX="+(XPOS-xorig)+" dy="+(YPOS-yorig))
    if(side=='b'){
        row = sR + dR; //          1+((YPOS - (YPOS%(height/8)))/(height/8));
        col = sC - dC;//9-((XPOS- (XPOS%(width/8)))/(width/8)+1);
    }else{
        row = sR - dR;
        col = sC - dC;
    }
    console.log("Move is row="+row+" col="+col);
    move(row,col);
}
/******************************** Sends a request to the server to see if the game state has changed **********************************/      
function change(){
    var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                if(this.responseText =="true1"||this.responseText=="true0"){
                    /*If the game state has changed, update everything*/
                    if(lastMoveCol!=-1&&lastMoveRow!=-1){
                        removeLastMoveDraw();
                    }
                    updateOnce();
                    updatePiecesOnce();
                    autoTurn();
                    autoMoves();
                }else if(this.responseText=="end"){
                    /*If the game is over, then stop checking for change*/
                    clearTimeout(updater);
                    
                }
                if(this.responseText=="true1"||this.responseText=="false1"){
                    drawOffered();
                }else{
                    draw = false;
                }
            }};
        xmlhttp.open("GET", "https://www.innovativeprogramming.org/stevenschessclub.com/resources/change_check.php", true);
        xmlhttp.send();
        updater = setTimeout(change, 500);
}
/******************************** Retrieves the FEN from the server, then calls drawboard with the FEN **********************************/ 
function updateOnce(){
    conn.send("BOARD");
}
/******************************** Sends a request to the server to undo a move **********************************/ 
function undo(){
     conn.send("TAKE_BACK");
}
/**********************************Sends a request to resign to the server**************************************/
function resign(){
    conn.send("RESIGN");
}
/**********************************Sends a request to declare the game a draw**************************************/
function offerDraw(){
    draw = true;
    conn.send("OFFER_DRAW");
}
/**********************************Sends a request to accept the draw**************************************/
function drawOffered(){
    if(draw){
        return;
    }
    document.getElementById("undoHolder").innerHTML="<button onclick='undo()' id='undo' >Undo</button>"+
        "<button onclick='resign()' id='resign'>Resign</button>"+
        "<div id='drawHolder'>"+
            "<button onclick='acceptDraw()' id='acceptDraw'>Accept Draw</button>"+
            "<button onclick='declineDraw()' id='declineDraw'>Decline Draw</button>"+
        "</div>";
}
function clearDraw(){
    document.getElementById("undoHolder").innerHTML="<button onclick='undo()' id='undo' >Undo</button>"+
        "<button onclick='resign()' id='resign'>Resign</button>"+
        "<button onclick='offerDraw()' id='offerDraw'>Offer Draw</button>";
}
function acceptDraw(){
    clearDraw();
    conn.send("ACCEPT_DRAW");
}
function declineDraw(){
    clearDraw();
    conn.send("DECLINE_DRAW");
}
/******************************** Works similar to the PHP function explode **********************************/       
function explode(seperator,string){
    s = string;
    out = new Array();
    if(s.indexOf(seperator)==-1){
        out.push(s);
        return out;
    }
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


/******************************** Updates the Turn display **********************************/
function autoTurn(){
    conn.send("TURN");
}
/******************************** Updates the current time of the game **********************************/
function drawTime(data){

    var time = explode(data_sep,data);
    document.getElementById("WTime").innerHTML = "White "+time[0];
    document.getElementById("BTime").innerHTML = "Black "+time[1];
}
/******************************** Generates the display of pieces taken by White **********************************/
function drawWhitePieces(input){
    var out = '';
    for(var i = 0; i<input.length;i++){
        var p = getCharAt(input,i);
        
        switch(p){
            case "k":
                out = out.concat("<img draggable='false' style='width:40px;' class='piece' alt='blackKing' src=\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/bKing.svg\">");
                break;
            case "q":
                out = out.concat("<img draggable='false' style='width:40px;' class='piece' alt='blackQueen' src=\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/bQueen.svg\">");
                break;
            case "r":
                out = out.concat("<img draggable='false' style='width:40px;' class='piece' alt='blackRook' src=\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/bRook.svg\">");
                break;
            case "b":
                out = out.concat("<img draggable='false' style='width:40px;' class='piece' alt='blackBishop' src=\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/bBishop.svg\">");
                break;
            case "n":
                out = out.concat("<img draggable='false' style='width:40px;' class='piece' alt='blackKnight' src=\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/bKnight.svg\">");
                break;
            case "p":
                out = out.concat("<img draggable='false' style='width:40px;' class='piece' alt='blackPawn' src=\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/bPawn.svg\">");
                break;
        }
    }
    document.getElementById("WPieces").innerHTML = out;
    return;
} 
/******************************** Generates the display of pieces taken by black **********************************/
function drawBlackPieces(input){
    var out = '';
    for(var i = 0; i<input.length;i++){
        var p = getCharAt(input,i);
        switch(p){
            case "K":
                out = out.concat("<img draggable='false' style='width:40px;' class='piece' alt='whiteKing' src=\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/wKing.svg\">");
                break;
            case "Q":
                out = out.concat("<img draggable='false' style='width:40px;' class='piece' alt='whiteQueen' src=\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/wQueen.svg\">");
                break;
            case "R":
                out = out.concat("<img draggable='false' style='width:40px;' class='piece' alt='whiteRook' src=\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/wRook.svg\">");
                break;
            case "B":
                out = out.concat("<img draggable='false' style='width:40px;' class='piece' alt='whiteBishop' src=\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/wBishop.svg\">");
                break;
            case "N":
                out = out.concat("<img draggable='false' style='width:40px;' class='piece' alt='whiteKnight' src=\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/wKnight.svg\">");
                break;
            case "P":
                out = out.concat("<img draggable='false' style='width:40px;' class='piece' alt='whitePawn' src=\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/wPawn.svg\">");
                break;
        }
    }
    
    document.getElementById("BPieces").innerHTML = out;
    return;
}
/******************************** Retrieves the data on pieces taken**********************************/ 
function updatePiecesOnce(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            piece = explode("%",this.responseText);
            drawBlackPieces(piece[0]);
            drawWhitePieces(piece[1]); 
        }};
    xmlhttp.open("GET", "/resources/get_pieces.php", true);
    xmlhttp.send();
}
/******************************** Generates the move table, and sends the last move to be drawn**********************************/
function drawMoves(moves){
    var history = explode(data_sep,moves);
    var whistory = "<tr><th>White</th></tr>";
    var bhistory = "<tr><th>Black</th></tr>";
    white_moves = 0;
    black_moves = 0;
    for(var i = 0;i<Math.floor(history.length/2);i++){
        whistory += "<tr><td>"+history[2*i] + "</td></tr>";
        white_moves++;
        if((i*2+1)<history.length){
            black_moves++;
            bhistory += "<tr><td>"+history[2*i + 1] + "</td></tr>";
        }
    }

    document.getElementById("white_moves").innerHTML = whistory;
    document.getElementById("black_moves").innerHTML = bhistory;
    if(history.length>1){
        if(history.length>1){
            if(history[history.length-2]=="o-o"||history[history.length-2]=="o-o-o"){
                if(lastMoveCol!=-1&&lastMoveRow!=-1){
                        removeLastMoveDraw();
                }
                return;
            }else{

                if(history[history.length-2].indexOf("+")!=-1){
                    history[history.length-2] = history[history.length-2].substring(0,3);
                   
                }
                drawLastMove(history[history.length-2].substr(2,1),history[history.length-2].substr(1,1));
            }
        }
    }
}

function drawMove(move){
    if(white_moves > black_moves){
        document.getElementById("black_moves").innerHTML += "<tr><td>"+move + "</td></tr>";
        black_moves++;
    }else{
        document.getElementById("white_moves").innerHTML += "<tr><td>"+move + "</td></tr>";
        white_moves++;
    }
}
/******************************** Highlights the last move **********************************/
function drawLastMove(row,col){
    var columns = ["a","b","c","d","e","f","g","h"];
    var tiles = document.getElementsByClassName("tile");
    if(side=='w'){
        lastMoveCol = columns.indexOf(col)+1;//0-7
        lastMoveRow = 8-parseInt(row); 

    }else{
        lastMoveCol = (8 - columns.indexOf(col));//0-7
        lastMoveRow = parseInt(row)-1; //0-7
    }
    if(lastMoveCol==0 && lastMoveRow==0){
        lastMoveCol = 7; 
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
/******************************** Clears the current highlight to make way for the next highlight **********************************/
function removeLastMoveDraw(){
    var tiles = document.getElementsByClassName("tile");
    var element = tiles[((lastMoveRow)*8)+lastMoveCol-1];
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
/******************************** Retrieves the previous moves from the server *********************************/               
function autoMoves(){
    conn.send("REQUEST_MOVES");
}
function clear_promotion(){
    var element = document.getElementById("promotion");
    element.innerHTML = "";
    element.style.zIndex = "-30";
    moveBlock = false;
}
function promotion(row,col){
    var xp = 0;
    var yp = 0;
    var element = document.getElementById("promotion");
    out = '';
    if(side=='b'){
        xp = 8-col;
        yp = 8-row;
        out = out.concat("<img draggable='false' style='width:100px;' class='piece' alt='blackQueen' onclick=\"promotion_protocol("+row+","+col+",'t')\" src=\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/bQueenPromote.svg\">");
        out = out.concat("<img draggable='false' style='width:100px;' class='piece' alt='blackRook'  onclick=\"promotion_protocol("+row+","+col+",'s')\" src=\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/bRookPromote.svg\">");
        out = out.concat("<img draggable='false' style='width:100px;' class='piece' alt='blackBishop'  onclick=\"promotion_protocol("+row+","+col+",'a')\" src=\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/bBishopPromote.svg\">");
        out = out.concat("<img draggable='false' style='width:100px;' class='piece' alt='blackKnight'  onclick=\"promotion_protocol("+row+","+col+",'o')\" src=\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/bKnightPromote.svg\">");
    }else{
        xp = col-1;
        yp = row-1;
        out = out.concat("<img draggable='false' style='width:100px;' class='piece' alt='whiteQueen'  onclick=\"promotion_protocol("+row+","+col+",'T')\" src=\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/wQueenPromote.svg\">");
        out = out.concat("<img draggable='false' style='width:100px;' class='piece' alt='whiteRook'  onclick=\"promotion_protocol("+row+","+col+",'S')\" src=\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/wRookPromote.svg\">");
        out = out.concat("<img draggable='false' style='width:100px;' class='piece' alt='whiteBishop'  onclick=\"promotion_protocol("+row+","+col+",'A')\" src=\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/wBishopPromote.svg\">");
        out = out.concat("<img draggable='false' style='width:100px;' class='piece' alt='whiteKnight'  onclick=\"promotion_protocol("+row+","+col+",'O')\" src=\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/wKnightPromote.svg\">");
    }
    element.style.left = Math.floor(((width/8))*xp)+"px";
    element.style.zIndex = "40";
    element.innerHTML = out;
    moveBlock = true;
}
function promotion_protocol(row,col,piece){
    var msg = prepare_message("PROMOTION",row,col,piece);
    conn.send(msg);
}
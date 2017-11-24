var side;
var sR = '';
var sC = '';
var height = 830;
var width = 811;
var m;
var XPOS;
var YPOS;
var xorig;
var yorig;
var last_move_row = -1;
var last_move_col = -1;
var count = 0;
var draw = false;
var moveBlock = false;
var black_moves = 0;
var white_moves = 0;
var turn = 'n';
var oldy = 0;
var oldx = 0;
var last_element;


function msg_trim(msg){
    var i;
    var out = msg;
    while(out.charCodeAt(0)<65){
        out = out.substr(1);
    }
    return out;
}

conn.onmessage = function(evt){
    console.log(evt);
    var msg = evt.data;
    msg = msg_trim(msg);
    var data = explode(command_sep,msg);
    var command = data[0];
    data = data[1];
    console.log(command);
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
            drawMove(data);
            break;
        case "MOVES_ALL":
            drawMoves(data);
            break;
        case "INVALID_MOVE":
            revert_move();
            break;
        case "RESIGN":
            clearTimeout(timeUpdate);
            break;
        case "DRAW_OFFERED":
            drawOffered();
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
            turn_swap(data);
            break;
        case "DRAW_ACCEPTED":
            break;
        case "TIME":
            drawTime(data);
            break;
        case "PROMOTION":
            promotion(data);
            break;
        case "PROMOTED":
            clear_promotion();
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

function turn_swap(turn){
    if(turn == 'w'){
        document.getElementById("turn").innerHTML = "White's Turn";
    }else{
        document.getElementById("turn").innerHTML = "Black's Turn";
    }
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
            var waction = "";
            var baction = "";
            if(side=='b'){
                piece = getCharAt(inp,(inp.length-((k*8)+l))-1);
                i = 7-k;
                j = 7-l;
                baction = "onmousedown='movement(this,"+(9-(i+1))+","+(j+1)+")' onmouseup='move2(this)'";
            }else{
                piece = getCharAt(inp,(k*8)+l);
                i = k;
                j = l;
                waction = "onmousedown='movement(this,"+(9-(i+1))+","+(j+1)+")' onmouseup='move2(this)'";
            }

            var x = Math.floor(((width/8))*l);
            var y = Math.floor((height/8)-2)*k;
            switch(piece){
                case "K":

                    out = out.concat("<img draggable='false' "+waction+" class='piece' alt=\"whiteKing\" style=\"position:absolute; width: 100px; left:"+x+"px; top:"+y+"px;\" src =\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/wKing.svg\">");
                    break;
                case "Q":
                case "T":
                    out = out.concat("<img draggable='false' "+waction+" class='piece' alt=\"whiteQueen\" style=\"position:absolute; width: 100px; left:"+x+"px; top:"+y+"px;\" src =\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/wQueen.svg\">");
                    break;
                case "R":
                case "S":
                    out = out.concat("<img draggable='false' "+waction+" class='piece' alt=\"whiteRook\" style=\"position:absolute; width: 100px; left:"+x+"px; top:"+y+"px;\" src =\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/wRook.svg\">");
                    break;
                case "B":
                case "A":
                    out = out.concat("<img draggable='false' "+waction+" class='piece' alt=\"whiteBishop\" style=\"position:absolute; width: 100px; left:"+x+"px; top:"+y+"px;\" src =\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/wBishop.svg\">");
                    break;
                case "N":
                case "O":
                    out = out.concat("<img draggable='false' "+waction+" class='piece' alt=\"whiteKnight\" style=\"position:absolute; width: 100px; left:"+x+"px; top:"+y+"px;\" src =\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/wKnight.svg\">");
                    break;
                case "P":
                    out = out.concat("<img draggable='false' "+waction+" class='piece' alt=\"whitePawn\" style=\"position:absolute; width: 100px; left:"+x+"px; top:"+y+"px;\" src =\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/wPawn.svg\">");
                    break;
                case "k":
                    out = out.concat("<img draggable='false' "+baction+" class='piece' alt=\"blackKing\" style=\"position:absolute; width: 100px; left:"+x+"px; top:"+y+"px;\" src =\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/bKing.svg\">");
                    break;
                case "q":
                case "t":
                    out = out.concat("<img draggable='false' "+baction+" class='piece' alt=\"blackQueen\" style=\"position:absolute; width: 100px; left:"+x+"px; top:"+y+"px;\" src =\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/bQueen.svg\">");
                    break;
                case "r":
                case "s":
                    out = out.concat("<img draggable='false' "+baction+" class='piece' alt=\"blackRook\" style=\"position:absolute; width: 100px; left:"+x+"px; top:"+y+"px;\" src =\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/bRook.svg\">");
                    break;
                case "b":
                case "a":
                    out = out.concat("<img draggable='false' "+baction+" class='piece' alt=\"blackBishop\" style=\"position:absolute; width: 100px; left:"+x+"px; top:"+y+"px;\" src =\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/bBishop.svg\">");
                    break;
                case "n":
                case "o":
                    out = out.concat("<img draggable='false' "+baction+" class='piece' alt=\"blackKnight\" style=\"position:absolute; width: 100px; left:"+x+"px; top:"+y+"px;\" src =\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/bKnight.svg\">");
                    break;
                case "p":
                    out = out.concat("<img draggable='false' "+baction+" class='piece' alt=\"blackPawn\" style=\"position:absolute; width: 100px; left:"+x+"px; top:"+ y +"px;\" src =\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/bPawn.svg\">");
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
    removeLastMoveDraw();
    var msg = prepare_message("MOVE",game_id,sR,9-sC,row,9-col);
    conn.send(msg);
}
/******************************** Converts the raw position data into coordinates then calls move with the coords **********************************/
function move2(element){
    last_element = element;
    clearTimeout(m);
    element.style.zIndex = "0";
    element.style.transform = "translate(0px,0px)";
    oldy = parseInt(element.style.top);
    oldx = parseInt(element.style.left);
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
        col = sC + dC;
    }
    if((dR == 0 && dC == 0) || row == NaN || col == NaN){
        revert_move();
        return;
    }
    console.log("Move is row="+row+" col="+col);
    move(row,col);
}

function revert_move(){
    last_element.style.top = oldy + "px";
    last_element.style.left = oldx + "px";
}

/******************************** Sends a request to the server to undo a move **********************************/ 
function undo(){
    var msg = prepare_message("TAKE_BACK",game_id);
    conn.send(msg);
}
/**********************************Sends a request to resign to the server**************************************/
function resign(){
    var msg = prepare_message("RESIGN",game_id);
    conn.send(msg);
}
/**********************************Sends a request to declare the game a draw**************************************/
function offerDraw(){
    draw = true;
    var msg = prepare_message("OFFER_DRAW",game_id);
    conn.send(msg);
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
/******************************** Generates the move table, and sends the last move to be drawn**********************************/
function drawMoves(moves){
    var history = explode(data_sep,moves);
    console.log("Drawing moves");
    console.log(history);
    var whistory = "<tr><th>White</th></tr>";
    var bhistory = "<tr><th>Black</th></tr>";
    white_moves = 0;
    black_moves = 0;
    for(var i = 0;i<Math.ceil(history.length/2);i++){
        whistory += "<tr><td>"+history[2*i] + "</td></tr>";
        white_moves++;
        if((i*2+1)<history.length){
            black_moves++;
            bhistory += "<tr><td>"+history[2*i + 1] + "</td></tr>";
        }
    }

    document.getElementById("white_moves").innerHTML = whistory;
    document.getElementById("black_moves").innerHTML = bhistory;
    if(history.length>0){
       
        if(history[history.length-1]=="o-o"||history[history.length-1]=="o-o-o"){
            if(last_move_col != -1 && last_move_row != -1){
                    removeLastMoveDraw();
            }
            return;
        }else{

            if(history[history.length-1].indexOf("+")!=-1){
                history[history.length-1] = history[history.length-1].substring(0,3);
               
            }
            console.log(history[history.length-1]);
            if(side == 'w' && white_moves == black_moves){
                 drawLastMove(history[history.length-1].substr(2,1),history[history.length-1].substr(1,1));
            }else if(side =='b'&& white_moves != black_moves){
                 drawLastMove(history[history.length-1].substr(2,1),history[history.length-1].substr(1,1));
            }
           
        }
    
    }
}

function drawMove(move){
    if(white_moves > black_moves){
        document.getElementById("black_moves").innerHTML += "<tr><td>"+move + "</td></tr>";
        black_moves++;
        if(side == 'w'){
            drawLastMove(move[2],move[1]);
        }
    }else{
        document.getElementById("white_moves").innerHTML += "<tr><td>"+move + "</td></tr>";
        white_moves++;
        if(side == 'b'){
             drawLastMove(move[2],move[1]);
        }
    }
}
/******************************** Highlights the last move **********************************/
function drawLastMove(row,col){
    removeLastMoveDraw();
    console.log("Last Move Given: row = "+row + " col = "+col);
    var columns = ["a","b","c","d","e","f","g","h"];
    var tiles = document.getElementsByClassName("tile");
    if(side=='w'){
        last_move_col = columns.indexOf(col);//0-7
        last_move_cow = 8-parseInt(row); 

    }else{
        last_move_col = 7 - columns.indexOf(col);//0-7
        last_move_row = parseInt(row)-1; //0-7
    }
    /*if(lastMoveCol==0 && lastMoveRow==0){
        lastMoveCol = 7; 
    }*/
    console.log("Last Move: row = "+last_move_row + " col = " +  last_move_col);
    var element = tiles[(last_move_row*8)+last_move_col];
     if(element == undefined){
        return;
    }
    if(last_move_row%2==0){
        if(last_move_col%2==0){
            element.style.backgroundColor = "#D2D48C";
        }else{
            element.style.backgroundColor = "#CCFFCC";
        }
    }else{
         if(last_move_col%2==1){
            element.style.backgroundColor = "#D2D48C";
        }else{
            element.style.backgroundColor = "#CCFFCC";
        }
    } 
}
/******************************** Clears the current highlight to make way for the next highlight **********************************/
function removeLastMoveDraw(){
    var tiles = document.getElementsByClassName("tile");
    var element = tiles[((last_move_row)*8)+last_move_col-1];
    if(element == undefined){
        console.log("ERROR: last move is undefined!");
        console.log("LAST MOVE IS : "+last_move_row + " "+last_move_col);
        return;
    }
    if(last_move_row%2==0){
        if(last_move_col%2==0){
            element.style.backgroundColor = "#D2B48C";
        }else{
            element.style.backgroundColor = "#FFFFFF";
        }
    }else{
         if(last_move_col%2==1){
            element.style.backgroundColor = "#D2B48C";
        }else{
            element.style.backgroundColor = "#FFFFFF";
        }
    } 
}
/******************************** Retrieves the previous moves from the server *********************************/               

function clear_promotion(){
    var element = document.getElementById("promotion");
    element.innerHTML = "";
    element.style.zIndex = "-30";
    moveBlock = false;
}
function promotion(msg){
    var data = explode(data_sep,msg);
    var row = parseInt(data[0]);
    var col = parseInt(data[1]);
    var xp = 0;
    var yp = 0;
    var element = document.getElementById("promotion");
    out = '';
    if(side=='b'){
        xp = 8-col;
        yp = 8-row;
        out = out.concat("<img draggable='false' style='width:100px;' class='piece' alt='blackQueen' onclick=\"promotion_protocol('t')\" src=\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/bQueenPromote.svg\">");
        out = out.concat("<img draggable='false' style='width:100px;' class='piece' alt='blackRook'  onclick=\"promotion_protocol('s')\" src=\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/bRookPromote.svg\">");
        out = out.concat("<img draggable='false' style='width:100px;' class='piece' alt='blackBishop'  onclick=\"promotion_protocol('a')\" src=\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/bBishopPromote.svg\">");
        out = out.concat("<img draggable='false' style='width:100px;' class='piece' alt='blackKnight'  onclick=\"promotion_protocol('o')\" src=\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/bKnightPromote.svg\">");
    }else{
        xp = col-1;
        yp = row-1;
        out = out.concat("<img draggable='false' style='width:100px;' class='piece' alt='whiteQueen'  onclick=\"promotion_protocol('T')\" src=\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/wQueenPromote.svg\">");
        out = out.concat("<img draggable='false' style='width:100px;' class='piece' alt='whiteRook'  onclick=\"promotion_protocol('S')\" src=\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/wRookPromote.svg\">");
        out = out.concat("<img draggable='false' style='width:100px;' class='piece' alt='whiteBishop'  onclick=\"promotion_protocol('A')\" src=\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/wBishopPromote.svg\">");
        out = out.concat("<img draggable='false' style='width:100px;' class='piece' alt='whiteKnight'  onclick=\"promotion_protocol('O')\" src=\"https://www.innovativeprogramming.org/stevenschessclub.com/resources/wKnightPromote.svg\">");
    }
    element.style.left = Math.floor(((width/8))*xp)+"px";
    element.style.zIndex = "40";
    element.innerHTML = out;
    moveBlock = true;
}
function promotion_protocol(piece){
    var msg = prepare_message("PROMOTION",game_id,piece);
    conn.send(msg);
}
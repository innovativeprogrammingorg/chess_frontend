var chatData = '';
var onBottom = true;

function start(){
    //autoJoin();
    //autoResume();
    //autoUser();  
}

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

conn.onopen = function(evt) { 
    conn.send("LOGIN"+command_sep+username);
    
};
conn.onerror = function(evt){
    console.log(evt);
};

conn.onmessage = function(evt){
    console.log(evt);
    var msg = evt.data;
    //alert(msg)
    msg = msg.substr(4);
    var command = msg;
    var data;
    if(command.includes(command_sep)){
        data = explode(command_sep,msg);
        command = data[0];
        data = data[1];
    }
    var info = "";
    for(var i = 0;i<command.length;i++){
        info += command.charCodeAt(i) +" ";
    }

    switch(command){
        case "CHAT":
            drawChat(data,false);
            break;
        case "CHAT_ALL":
            if(data != "none"){
                drawChat(data,true);
            }
            
            break;
        case "LOGGED_IN":
            //alert("Logged in");
            conn.send("GET_LOBBY_ALL");
            break;
        case "LOBBY_USERS":
            drawUsers(data);
            break;
        case "LOBBY_GAMES":
            if(data != "none"){
                drawJoin(data);
            }else{
                document.getElementById("join").innerHTML = "";
            }
            
            break;
        case "GAME_START":
            window.location = "/chess/members/game/chess/index.php?id="+data;
            break;
    }
};

function format_time(min,sec){
    var out = min + ":";
    if(parseInt(sec)>9){
        out += sec;
    }else{
        out += "0"+sec;
    }
    return out;
}

function drawJoin(dat){
    var data = explode(data_sep,dat);
    document.getElementById("join").innerHTML = "";
    for(var i = 0;i<data.length/8;i++){
        var type = data[8*i];
        switch(type){
            case "REGULAR":
                type = "Regular";
                break;
        }
        var button;
        if(data[8*i] == "REGULAR"){
            if(data[8*i + 5] == username){
                button = "<button class='join' onclick=\"deleteGame('" + data[8*i + 6] + "')\" >Delete</button>";
            }else{
                button = "<button class='join' onclick=\"regular('" + data[8*i + 6] + "')\">Join</button>";
            }
        }else{
            if(data[8*i + 5] == username){
                button = "<button class='join' onclick=\"deleteGame('" + data[8*i + 6] + "')\" >Delete</button>";
            }else{
                button = "<button class='join' onclick=\"join('" + data[8*i + 6] + "')\">Join</button>";
            }
        }
        console.log(button);
        document.getElementById("join").innerHTML += 
            "<div class='game'>"+
                "<span>" + data[8*i + 5]+ "'s game</span>"+
                "<span>" + type+"</span>"+
                "<span>players ready: " + data[8*i + 7] + " </span>"+
                "<span>Time Limit: " + format_time(data[8*i + 2],data[8*i + 1]) + " + " + data[8*i + 3] +"</span>" + button;
        document.getElementById("join").innerHTML += "</div>"

    }
    
}

function autoResume(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
                document.getElementById("resume").innerHTML = this.responseText;
        }};
    xmlhttp.open("GET", "/chess/resources/resume.php", true);
    xmlhttp.send();
    setTimeout(autoResume, 1000);
}



function send(){

    message  = document.getElementById("msg").value;
    document.getElementById("msg").value = '';
    var message = prepare_message("LOBBY_MESSAGE",message);
    conn.send(message);
   
}

function join(id){
    var msg = prepare_message("JOIN_LOBBY_GAME",id);
    conn.send(msg);
}

function create(){
    var type  = document.getElementById("type").value;
    var min  = document.getElementById("timeMin").value;
    var sec  = document.getElementById("timeSec").value;
    var inc  = document.getElementById("inc").value;
    var side  = document.getElementById("side").value;
    if(side == "Random"){
        side = 'r';
    }else if(side == "White"){
        side = 'w';
    }else{
        side = 'b';
    }
    window.scrollTo(0,0);
    if(sec == "00"){
        sec = "0";
    }
    var msg = prepare_message("CREATE_LOBBY_GAME",type,sec,min,inc,side);
    console.log(msg);
    resetForm();
    conn.send(msg);
}

function deleteGame(id){
    var msg = prepare_message("REMOVE_LOBBY_GAME",id);
    conn.send(msg);
}

function remove(id){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
                
        }};
    xmlhttp.open("GET", "/chess/resources/remove_game.php?id="+id, true);
    xmlhttp.send();
}

function resume(id){ //used for resuming games in the resume section, on success redirects to the game 
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
                if(this.responseText=="Regular"){
                    window.location = "/chess/members/game/chess/";
                }
                if(this.responseText=="Bug House"){
                    window.location = "/chess/game/bug_house/";
                }
        }};
    xmlhttp.open("GET", "/chess/resources/resume_game.php?id="+id, true);
    xmlhttp.send();
}

function regular(id){//used for when a person joins a normal chess game, first creates the game then redirects them to the game
    var msg = prepare_message("JOIN_LOBBY_GAME",id);
    conn.send(msg);
}

function chatHandle(e){//calls the function to send the message when the enter key is press
    if(e.keyCode === 13){
        e.preventDefault();
        send();
    }
}

function drawUsers(dat){
    document.getElementById("online").innerHTML = "<h2 class='online'>Users Online</h2>";
    data = explode(data_sep,dat);
    for(var i = 0;i<data.length;i++){
        if(data[i]==""){
            continue;
        }
        document.getElementById("online").innerHTML += 
            "<div class='user'>" + 
                "<svg height='10' width='10' class='user'>"+
                "<circle cx='5' cy='5' r='5' stroke='green' stroke-width='0' fill='green' />"+
                "</svg>"+
                "<label class='user'>" + data[i] + "</label>"+
                "</div>";
    }
}


function drawChat(data,all){
    var out = "";
   
    var messages = explode(data_sep,data);
    for(var i = 0;i<messages.length/2;i++){
        out += "<p class='chat'><label class='chat'>" + messages[2*i]+":</label>"+messages[2*i+1]+"</p>";
    }
    if(all){
        document.getElementById("messages").innerHTML = out;
    }else{
        document.getElementById("messages").innerHTML += out;
    }
    
    if(onBottom){
        var textarea = document.getElementById('messages');
        textarea.scrollTop = textarea.scrollHeight;
    }
}

function scroll(){
    var element = document.getElementById('messages');
    if((element.innerHeight + element.scrollY) >= element.offsetHeight){
        onBottom = true;
    }else{
        onBottom = false;
    }
}
function resetForm(){
    document.getElementById("type").value = "Regular";
    document.getElementById("timeMin").value = '';
    document.getElementById("timeSec").value = '';
    document.getElementById("inc").value = "0";
    document.getElementById("side").value = 'Random';
}
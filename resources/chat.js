var chatData = '';
var onBottom = true;


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
function chatHandle(e){//calls the function to send the message when the enter key is press
    if(e.keyCode === 13){
        e.preventDefault();
        send();
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
function send(){
    message  = document.getElementById("msg").value;
    document.getElementById("msg").value = '';
    var message = prepare_message("CHESS_MESSAGE",game_id,message);
    conn.send(message);
}
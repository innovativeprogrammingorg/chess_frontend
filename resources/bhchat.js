	var chatData = '';
    var onBottom = true;
    function autoChat(){
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                     
                document.getElementById("messages").innerHTML = this.responseText;
                if(onBottom){
                    var textarea = document.getElementById('messages');
                    textarea.scrollTop = textarea.scrollHeight;
                }
            }};
        xmlhttp.open("GET", "https://www.innovativeprogramming.org/stevenschessclub.com/resources/bug_house_chatUpdate.php", true);
        xmlhttp.send();
        setTimeout(autoChat, 500);
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
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                     
            }};
        xmlhttp.open("GET", "https://www.innovativeprogramming.org/stevenschessclub.com/resources/bug_house_chat.php?msg="+message, true);
        xmlhttp.send();
    }
function htmlEditor(element,text){
    element.innerHTML = text;
}

function newUser(){
    var container = document.getElementById('home');
    
    var content = "<div class='create'>"+
                "<h2 class='login'>Create a free account</h2>"+
                "<form method='POST' action='/chess/login/'>"+
                    "<div id='labels'>"+
                        "<label>First Name</label>"+
                        "<label>Last Name</label>"+
                        "<label>Email</label>"+
                        "<label>Username</label>"+
                        "<label>Password</label>"+
                        "<label>Re-enter Password</label>"+
                    "</div>"+
                    "<div id='inputs'>"+
                        "<input type='text' name='fname' required><br>"+
                        "<input type='text' name='lname' required><br>"+
                        "<input type='text' name='email' required><br>"+
                        "<input type='text' name='user' required><br>"+
                        "<input type='password' name='pass1' required><br>"+
                        "<input id='reenter' type='password' name='pass2' required>"+
                        "</div>"+
                        "<input name='acc' type='submit' id='createAcc' value='Create Account'>"+
                    
                "</form>"+
            "</div>";
    
    htmlEditor(container,content);

}
function newUserRetry(fname,lname,email,user){
    var container = document.getElementById('home');
    var content = "<div class='create'>"+
                "<h2 class='login'>Create a free account</h2>"+
                "<form method='POST' action='/chess/login/'>"+
                    "<div id='labels'>"+
                        "<label>First Name</label>"+
                        "<label>Last Name</label>"+
                        "<label>Email</label>"+
                        "<label>Username</label>"+
                        "<label>Password</label>"+
                        "<label>Re-enter Password</label>"+
                    "</div>"+
                    "<div id='inputs'>"+
                        "<input type='text' name='fname' value='"+fname+"' required><br>"+
                        "<input type='text' name='lname' value='"+lname+"' required><br>"+
                        "<input type='text' name='email' value='"+email+"' required><br>"+
                        "<input type='text' name='user' value='"+user+"' required><br>"+
                        "<input type='password' name='pass1' required><br>"+
                        "<input id='reenter' type='password' name='pass2' required>"+
                        "</div>"+
                        "<input name='acc' type='submit' id='createAcc' value='Create Account'>"+
                    
                "</form>"+
            "</div>";
    
    htmlEditor(container,content);

}
function oldUser(){
    var container = document.getElementById('home');
    var content = "<div class='login'>"+
                "<h2 class='login'>Please Login</h2>"+
            "<form method='POST' action='/chess/login/'>"+
                "<label class='login'>Username</label><input type='text' name='user' class='login'><br>"+
                "<label class='login' id='pass'>Password</label><input type='password' name='pass' class='login'>"+
                "<input type='submit' value='Log In' id='logbutton'>"+
            "</form>"+
            "</div>";
    htmlEditor(container,content);
}
function oldUserRetry(user){
var container = document.getElementById('home');
    var content = "<div class='login'>"+
                "<h2 class='login'>Please Login</h2>"+
            "<form method='POST' action='/chess/login/'>"+
                "<label class='login'>Username</label><input type='text' value='"+user+"' name='user' class='login'><br>"+
                "<label class='login' id='pass'>Password</label><input type='password' name='pass' class='login'>"+
                "<input type='submit' value='Log In' id='logbutton'>"+
            "</form>"+
            "</div>";
    htmlEditor(container,content);
}
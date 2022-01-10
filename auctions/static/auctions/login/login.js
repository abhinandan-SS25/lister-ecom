function authlog() {
    if (document.querySelector("#username").value==="") {
        document.querySelector("#cred_error").style.display="";
        document.querySelector("#cred_error").innerHTML="Please Enter your username";
        return false;
    }
    if (document.querySelector("#password").value==="") {
        document.querySelector("#cred_error").style.display="";
        document.querySelector("#cred_error").innerHTML="Please Enter your password";
        return false;
    }
    else {
        return true;
    }
}
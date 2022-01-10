function authregister() {
    if (document.querySelector("#username").value==="") {
        document.querySelector("#error").style.display="block";
        document.querySelector("#error").innerHTML="Please provide an username";
        return false;
        }
    if (document.querySelector("#username").length==200) {
        document.querySelector("#error").style.display="block";
        document.querySelector("#error").innerHTML="Please provide an username limited to 200 characters";
        return false;
        }
    if (document.querySelector("#password").value==="") {
        document.querySelector("#error").style.display="block";
        document.querySelector("#error").innerHTML="Please provide a password";
        return false;
        }
    if (document.querySelector("#confirmation").value==="") {
        document.querySelector("#error").style.display="block";
        document.querySelector("#error").innerHTML="Please confirm provided password";
        return false;
        }
    if (!(document.querySelector("#password").value===document.querySelector("#confirmation").value)) {
        console.log(document.querySelector("#password").value);
        console.log(document.querySelector("#confirmation").value);
        document.querySelector("#error").style.display="block";
        document.querySelector("#error").innerHTML="Passwords do not match";
        return false;
        }
    else {
        return true;
        }
}
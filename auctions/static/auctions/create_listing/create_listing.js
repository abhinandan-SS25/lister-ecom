function cat_s() {

    var input, filter;
    input = document.querySelector("#new_category");
    filter = input.value.toUpperCase();
    document.querySelectorAll("option").forEach( function(option) {
        var val = option.innerHTML.toUpperCase();
        if (val.indexOf(filter) > -1){
            option.style.display="";
        }
        else {
            option.style.display="none";
        }
    })

    var opc = []
    document.querySelectorAll("option").forEach( function(option) {
        opc.push(option.style.display);
    })
    var t=0;
    for (let i=0; i < opc.length; i++ ){
        if (opc[i]==="none") {
            t++
        }
    }
    if (t==(opc.length)) {
        document.querySelector("#alc").style.color="black";
    }
    else{
        document.querySelector("#alc").style.color="white";
    }
}

function authc_l () {
    if (document.querySelector("#title").value==="") {
        document.querySelector("#error").style.display="";
        document.querySelector("#error").innerHTML="Please enter a Title for your Listing";
        return false;
    }
    if (document.querySelector("#title").value.length>40) {
        document.querySelector("#error").style.display="";
        document.querySelector("#error").innerHTML="Please enter a Title for your Listing limited to 40 characters";
        return false;
    }
    if (document.querySelector("#description").value.length>3000) {
        document.querySelector("#error").style.display="";
        document.querySelector("#error").innerHTML="Please enter a description for your Listing limited to 3000 characters";
        return false;
    }
    if (document.querySelector("#listing_price").value==="") {
        document.querySelector("#error").style.display="";
        document.querySelector("#error").innerHTML="Please enter a starting bid price for your Listing to be listed at";
        return false;
    }
    if (document.querySelector("#description").value==="") {
        document.querySelector("#error").style.display="";
        document.querySelector("#error").innerHTML="Please enter a description for your Listing";
        return false;
    }
    if (document.querySelector("#new_category").value.length>300) {
        document.querySelector("#error").style.display="";
        document.querySelector("#error").innerHTML="Please enter the name for your desired Category limited to 300 characters";
    }
    else {
        return true;
    }
}


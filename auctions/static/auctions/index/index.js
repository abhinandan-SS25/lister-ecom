function search_title () {
    document.querySelector("#spinner").style="display:block; padding:10px;";
    
    var input, filter, li;
    input = document.querySelector("#titleSearch");
    filter = input.value.toUpperCase();
    li = document.querySelectorAll("h2").forEach( function(h2) {
        var val = h2.innerHTML.toUpperCase();
        if (val.indexOf(filter) > -1){
            h2.parentElement.parentElement.parentElement.parentElement.style.display="";
        }
        else {
            h2.parentElement.parentElement.parentElement.parentElement.style.display="none";
        }
    } )

    document.querySelector("#spinner").style="display:none; padding:10px;";
}
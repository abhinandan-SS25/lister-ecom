function searchforcat () {
    var input, filter;
    input = document.querySelector("#searchcategory");
    filter = input.value.toUpperCase();
    document.querySelectorAll(".controlbut").forEach( function(button) {
        var val = button.innerHTML.toUpperCase();
        if (val.indexOf(filter) > -1){
            button.className="btn btn-outline-dark controlbut";
            button.disabled=false;
            
        }
        else {
            button.className="btn btn-outline-light controlbut";
            button.disabled=true;
            document.querySelector(".fe").insertBefore(button, n);
        }
    })
}
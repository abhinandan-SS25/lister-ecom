document.addEventListener("DOMContentLoaded", function () {

    document.querySelector("#todo").onclick = function () {

        button_click=document.querySelector("#todo");

        document.querySelector("#todo").disabled=true;
        fetch('/LISTING', {
            method:"POST",
            body: JSON.stringify({
                operation:button_click.innerHTML,
                listing_name:button_click.dataset.listname,
            })
        }).then( function (response) {
            console.log(response);
        })
        .then( function () {
            if (button_click.innerHTML=="Add To Watchlist") {
                document.querySelector("#todo").disabled=false;
                document.querySelector("#todo").innerHTML="Remove From Watchlist";
            }
            else {
                document.querySelector("#todo").disabled=false;
                document.querySelector("#todo").innerHTML="Add To Watchlist";
            }
        })
    }


    document.querySelector("#new_com_submit").onclick = function () {

    new_comment_body=document.querySelector("#comment_body").value;
    new_comment_title=document.querySelector("#new_com_submit").dataset.title;
    new_comment_by=document.querySelector("#new_com_submit").dataset.by;

    if (new_comment_body==="") {
        var alert_div = document.createElement("div");
        alert_div.innerHTML=`
            <div class="alert alert-danger" role="alert">
                Please enter some text to comment.
            </div>`;
        document.querySelector("#com_alert").append(alert_div);
        return false;
    }

    document.querySelector("#new_com_submit").innerHTML="Adding New Comment ...";
    document.querySelector("#new_com_submit").disabled=true;

    fetch('/LISTING', {
        method:"POST",
        body: JSON.stringify({
            operation:"new_comment",
            commentbody:new_comment_body,
            commentontitle:new_comment_title,
        })
    }).then ( function () {
            var ncdiv = document.createElement("li");
            ncdiv.className="list-group-item list-group-item-light";
            ncdiv.style.borderRadius="25px";
            ncdiv.innerHTML=`
            <p>${new_comment_body}</p> 
            <p class="float-right">-- @ -- ${new_comment_by}</p>`;
            document.querySelector("#commentdiv").append(ncdiv);
        }).then(
            function () {
                document.querySelector("#new_com_submit").innerHTML="Add Comment";
                document.querySelector("#new_com_submit").disabled=false;
                document.querySelector("#comment_body").value="";
            }
        )
    } 


    document.querySelector("#submitbid").onclick = function () {

        current_amount=parseFloat(document.querySelector("#submitbid").dataset.currentbid);
        newbid_title=document.querySelector("#submitbid").dataset.listingname;
        newbid_amount=parseFloat(document.querySelector("#new_bid").value);
        bidby=document.querySelector("#submitbid").dataset.user;

        if (document.querySelector("#new_bid").value=="") {
            document.querySelector("#al").style.display="";
            document.querySelector("#al").innerHTML=`Please enter a bid amount`;
            return false;
        }
        else if (newbid_amount <= current_amount) {
            document.querySelector("#al").style.display="";
            document.querySelector("#al").innerHTML=`Bid placed is lesser than the current price, please enter a bid higher than ${current_amount}`;
            return false;
        }
        else {
            document.querySelector("#al").style.display="none";
            document.querySelector("#submitbid").disabled=true;
            document.querySelector("#submitbid").innerHTML="Placing bid";

            fetch('/LISTING', {
                method:"POST",
                body: JSON.stringify({
                    operation:"new_bid",
                    new_bid:newbid_amount,
                    listing_name:newbid_title,
                })
            }).then( function () {
                    document.querySelector("#bidstat").innerHTML=`
                    Current Bidder: <strong>${bidby}</strong>, bidding at <strong>$ ${newbid_amount}</strong>
                    `;
                    document.querySelector("#curprice").innerHTML=`
                    <strong>Current Price: $ ${newbid_amount}</strong>
                    `;
                }
                ).then ( function ()
                    {
                        document.querySelector("#submitbid").disabled=false;
                        document.querySelector("#submitbid").innerHTML="Enter New bid";
                        document.querySelector("#new_bid").value="";
                    }
                )
        }
    }

    
    
})
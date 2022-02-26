from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.http.response import JsonResponse
from django.shortcuts import render
from django.urls import reverse
import json
import traceback
from django.views.decorators.csrf import csrf_exempt

from .models import *

def index(request):
    return render(request, "auctions/index.html",{
        "items":Listing.objects.all().order_by("listing_open_date").reverse(),
    })

@csrf_exempt 
def LISTING(request):

    if request.method=="POST":

        #add to watchlist#
        try:
            get_data=json.loads(request.body)
            i_ac=get_data["listing_name"]
            i_id=get_data["listing_id"]
            if get_data["operation"]=="Add To Watchlist":
                Watchlist(u_name=request.user,item_id=i_id,item_name=i_ac).save()
                return JsonResponse({"status":"Added to Watchlist"})
            elif get_data["operation"]=="Remove From Watchlist":
                Watchlist.objects.all().filter(u_name=request.user).filter(item_id=i_id).delete()
                return JsonResponse({"status":"Removed from Watchlist"})
            else:
                return JsonResponse({"status":"Problem"})
        except:
            traceback.print_exc()

        message=""

        #new bid#
        try: 
            get_data=json.loads(request.body)
            if get_data["operation"]=="new_bid":

                n_bid=get_data["bid"]["new_bid"]
                g=Listing.objects.get(id=get_data["bid"]["listing_id"])
                g.c_price=n_bid
                g.c_bidder=str(request.user)
                g.save()
                return JsonResponse({"status":"Added new bid"})
        except:
            pass

        #new_comment#
        try:
            get_data=json.loads(request.body)

            if get_data["operation"]=="new_comment":
                Comment(listing=get_data["commentontitle"],usern=request.user,comment=get_data["commentbody"]).save()
            return JsonResponse({"status":"Added new comment"})
        except:
            pass

        #close listing
        try:
            n=Listing.objects.get(id=request.POST["listing_id"])
            n.status=request.POST["status_change"]
            n.save()
            if Listing.objects.get(id=request.POST["listing_id"]).c_bidder==request.user:
                message="BIDDING CLOSED ---- UNSOLD"
            message="BIDDING CLOSED ---- "+Listing.objects.get(id=request.POST["listing_id"]).c_bidder+"Wins!"
        except:
            pass

        w=Watchlist.objects.all().filter(u_name=request.user)
        t="Add To Watchlist"
        for e in w:
            if int(request.POST["listing_id"])==int(e.item_id):
                t="Remove From Watchlist"
                break
            else:
                t="Add To Watchlist"

        return render(request, "auctions/LISTING.html", {
        "listitem":Listing.objects.get(id=request.POST["listing_id"]),
        "c_user":request.user,
        "comnts":Comment.objects.all().filter(listing=request.POST["listing_id"]).order_by("com_on").reverse(),
        "but_message":t,
        "message":message})

    us=request.user
    l_title=request.GET["l_id"]
    w=Watchlist.objects.all().filter(u_name=request.user)
    t="Add To Watchlist"
    for e in w:
        if int(l_title)==int(e.item_id):
            t="Remove From Watchlist"
            print(t)
            break
        else:
            t="Add To Watchlist"

    return render(request, "auctions/LISTING.html",{
        "listitem":Listing.objects.get(id=request.GET["l_id"]),
        "comnts":Comment.objects.all().filter(listing=request.GET["l_id"]).order_by("com_on").reverse(),
        "but_message":t,
        "c_user":request.user})


def categories(request):
    return render(request, "auctions/categories.html",{
        "ctgs":Category.objects.all()
    })


def watchlist(request):
    return render(request,"auctions/watchlist.html",{
        "watching":Watchlist.objects.all().filter(u_name=request.user),
        "items":Listing.objects.all()
    })


def category(request):
    return render(request,"auctions/category.html",{
        "itmsactive":Listing.objects.all().filter(category=Category.objects.get(category=request.GET["category_title"])).filter(status="A"),
        "itmsclose":Listing.objects.all().filter(category=Category.objects.get(category=request.GET["category_title"])).filter(status="C"),
        "c_name": str(request.GET["category_title"])
    })


def create_listing(request):
    if request.method=="POST":
        try:
            if request.POST["n_category"] != "":
                Category(category=request.POST["n_category"]).save()
                c=Category.objects.get(category=request.POST["n_category"])
            else:
                c=Category.objects.get(category=request.POST["cg"])
            if request.POST["pic"]=="":
                p="https://cdn0.iconfinder.com/data/icons/technology-business-and-people/1000/file_light-15-512.png"
            else:
                p=request.POST["pic"]
            Listing(username=request.user,status="A",title=request.POST["ttl"],listing_open_date=datetime.datetime.now().date(), description=request.POST["desc"], l_price=request.POST["l_p"], c_price=request.POST["l_p"], c_bidder=request.user, category=c, picture=p).save()
            return render(request, "auctions/create_listing.html",{
            "catgs": Category.objects.all(),
            "message":"Listing Created"
        })
        except:
            return render(request, "auctions/create_listing.html",{
            "catgs": Category.objects.all(),
            "message":"Error while creating Listing :: Please try again"})
    return render(request, "auctions/create_listing.html",{
        "catgs": Category.objects.all()
    })


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "auctions/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "auctions/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))



def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]
        password = request.POST["password"]
        
        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "auctions/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "auctions/register.html")
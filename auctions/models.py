from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.enums import Choices
from django.db.models.fields import CharField
from django.db.models.fields.related import ForeignKey
import datetime


class User(AbstractUser):
    pass


#Class for sorting into categories
class Category(models.Model):
    category=models.CharField(max_length=60)    
    def __str__(self):
        return self.category
        
    
#Class for listings data in db
class Listing(models.Model):
    username=models.CharField(max_length=200)    #to store username of creator of listing
    status=models.CharField(choices=(("A","ACTIVE"),("C","CLOSE")),max_length=1)    #Status for the listing...close/active
    title=models.CharField(max_length=300)   #title for the listing
    listing_open_date=models.DateField(default=datetime.datetime.now().date())  #to get date of listing
    description=models.TextField(max_length=3000)  #description for the listing
    l_price=models.FloatField() #The initial listing/bidding price
    c_price=models.FloatField(default=0.0) 
    c_bidder=models.CharField(max_length=200)
    category=models.ForeignKey(Category,on_delete=models.CASCADE,related_name="Type")    #category for the listing 
    picture=models.URLField(blank=True,null=True) #image to be provided for the listing
    def __str__(self):
        return f"   Name : {self.title};  Category : {self.category}"

class Comment(models.Model):
    listing=models.IntegerField()
    usern=models.CharField(max_length=200)
    comment=models.TextField()
    com_on=models.DateTimeField(default=datetime.datetime.now().date())

class Watchlist(models.Model):
    u_name=models.CharField(max_length=200)
    item_id=models.IntegerField(default=0)
    item_name=models.CharField(max_length=300)
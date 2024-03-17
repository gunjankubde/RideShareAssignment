from django.urls import path
from .views import *

urlpatterns = [
    path('getReact', ReactView.get, name='getEmp'),
    path('addReact/', ReactView.post, name='addEmp'),
    path('get/', getUsers, name='addUsers'),
    path('add/', addUser, name='addUsers'),
    path('getFeedbacks/', getFeedbacks, name='addUsers'),
    path('addFeedback/', saveFeedbacks, name='addUsers'),
]
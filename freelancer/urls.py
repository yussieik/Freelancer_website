from django.contrib import admin
from django.urls import path
from django.contrib.auth.views import LoginView, LogoutView
from .views import FreelancerListView


urlpatterns = [
    # path('', homepage, name='homepage_url'),
    path('api/freelancers/<str:region>/<str:service>', FreelancerListView.as_view(), name='freelancers_list_url')


    # path('visitors/login/', LoginView.as_view(template_name='visitors_login.html'), name='login'),
    # path('visitors/logout/', LogoutView.as_view(), name='logout'),
    # path('visitors/signup/', SignupView.as_view(), name='signup'),
    # path('booking_info/<int:pk>', booking_info, name='booking_info_url')
]
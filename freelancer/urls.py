from django.contrib import admin
from django.urls import path
from django.contrib.auth.views import LoginView, LogoutView
from .views import (
    FreelancerListView,
    FreelancerDetailView,
    RegionsListView,
    ServicesListView,
    ReviewsListView,
    home,
    freelancer_page
)



urlpatterns = [
    # path('', homepage, name='homepage_url'),
    path('api/freelancers/<int:regionID>/<str:service>', FreelancerListView.as_view(), name='freelancers_list_api'),
    path('api/freelancer/<int:pk>', FreelancerDetailView.as_view(), name='freelancer_detail_api'),
    path('api/regions', RegionsListView.as_view(), name='regions_list_api'),
    path('api/services', ServicesListView.as_view(), name='service_list_api'),
    path('api/reviews/<int:freelancer>', ReviewsListView.as_view(), name='reviews_list_api'),
    path('home', home, name='homepage_url'),
    path('profi/<int:pk>', freelancer_page, name='freelancer_page_url')



    # path('visitors/login/', LoginView.as_view(template_name='visitors_login.html'), name='login'),
    # path('visitors/logout/', LogoutView.as_view(), name='logout'),
    # path('visitors/signup/', SignupView.as_view(), name='signup'),
    # path('booking_info/<int:pk>', booking_info, name='booking_info_url')
]
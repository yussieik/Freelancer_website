from django.shortcuts import render
from rest_framework.permissions import AllowAny


from .models import Freelancer, Region, Service, Review
from .serializers import (
    FreelancerSerializer,
    RegionSerializer,
    ServiceSerializer,
    ReviewSerializer,
    ReviewCreateSerializer
)

from rest_framework import generics


def home(request):
    return render(request, 'index.html')


def freelancer_page(request, pk):
    return render(request, 'freelancer_page.html')


class FreelancerDetailView(generics.RetrieveAPIView):
    serializer_class = FreelancerSerializer
    queryset = Freelancer.objects.all()


class FreelancerListView(generics.ListAPIView):
    serializer_class = FreelancerSerializer

    def get_queryset(self):
        regionID = self.kwargs.get('regionID')
        service = self.kwargs.get('service')
        queryset = Freelancer.objects.filter(regions__id=regionID, services__name__contains=service)
        return queryset


class RegionsListView(generics.ListAPIView):
    queryset = Region.objects.all()
    serializer_class = RegionSerializer


class ServicesListView(generics.ListAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer


class ReviewsListView(generics.ListAPIView):
    serializer_class = ReviewSerializer

    def get_queryset(self):
        freelancer = self.kwargs.get('freelancer')
        queryset = Review.objects.filter(freelancer=freelancer)
        return queryset


class ReviewCreateView(generics.CreateAPIView):
   queryset = Review.objects.all()
   serializer_class = ReviewCreateSerializer
   permission_classes = (AllowAny,)
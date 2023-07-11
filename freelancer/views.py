from django.shortcuts import render

from .models import Freelancer, Region
from .serializers import FreelancerSerializer, RegionSerializer
from rest_framework import generics


def home(request):
    return render(request, 'index.html')


class FreelancerListView(generics.ListAPIView):
    serializer_class = FreelancerSerializer

    def get_queryset(self):
        region = self.kwargs.get('region')
        service = self.kwargs.get('service')
        queryset = Freelancer.objects.filter(regions__name=region, services__name=service)
        return queryset


class RegionsListView(generics.ListAPIView):
    queryset = Region.objects.all()
    serializer_class = RegionSerializer

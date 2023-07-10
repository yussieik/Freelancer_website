from django.shortcuts import render

from .models import Freelancer
from .serializers import FreelancerSerializer
from rest_framework import generics

class FreelancerListView(generics.ListAPIView):
   # queryset = Freelancer.objects.all()
   serializer_class = FreelancerSerializer

   def get_queryset(self):
      region = self.kwargs.get('region')
      service = self.kwargs.get('service')
      queryset = Freelancer.objects.filter(regions__name=region, services__name=service)
      return queryset
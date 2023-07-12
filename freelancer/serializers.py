from .models import Freelancer, User, Region, Service, Review
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'username')


class RegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Region
        fields = ('id', 'name')


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ('id', 'name',)

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('id', 'score', 'text', 'freelancer', 'author', 'date')


class ReviewCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('author', 'score', 'text', 'freelancer')



class FreelancerSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    regions = serializers.SerializerMethodField()
    services = serializers.SerializerMethodField()

    class Meta:
        model = Freelancer
        fields = ('id', 'user', 'details', 'regions', 'services')

    def get_regions(self, obj):
        return RegionSerializer(obj.regions.all(), many=True).data

    def get_services(self, obj):
        return ServiceSerializer(obj.services.all(), many=True).data
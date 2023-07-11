from django.db import models
from django.contrib.auth.models import AbstractUser

SCORES_CHOICES = (
    ("1", 1),
    ("2", 2),
    ("3", 3),
    ("4", 4),
    ("5", 5)
)


class User(AbstractUser):
    pass


class Region(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Service(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Freelancer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="freelancer_profile")
    details = models.TextField(null=True, blank=True)
    regions = models.ManyToManyField(Region)
    services = models.ManyToManyField(Service)

    def __str__(self):
        return self.user.username


class Review(models.Model):
    score = models.IntegerField(choices=SCORES_CHOICES)
    text = models.TextField(null=True, blank=True)
    freelancer = models.ForeignKey(Freelancer, on_delete=models.CASCADE, related_name="reviews")



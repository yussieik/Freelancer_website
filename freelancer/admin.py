from django.contrib import admin

from .models import User, Freelancer, Region, Review, Service

admin.site.register(User)
admin.site.register(Freelancer)
admin.site.register(Region)
admin.site.register(Review)
admin.site.register(Service)

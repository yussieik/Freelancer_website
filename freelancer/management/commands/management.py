from django.core.management.base import BaseCommand
from ...populate_faker_data import create_fake_users

class Command(BaseCommand):
    def handle(self, *args, **options):
        create_fake_users(10)
        print('user created')
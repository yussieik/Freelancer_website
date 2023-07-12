from freelancer.models import User, Freelancer, Service, Region
from faker import Faker
from random import choice
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    def handle(self, *args, **options):
        create_fake_users(1000)
        print('user created')

fake = Faker()


def create_fake_users(num_users):

    for _ in range(int(num_users / 50)):
        fake_job = Service.objects.create(name=fake.job())
        fake_job.save()

    for i in range(num_users):
        print(f'user {i} creation')
        username = fake.user_name()
        if username in [x.username for x in User.objects.all()]:
            continue
        fake_user = User.objects.create_user(
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            username=username,
            email=fake.email(),
            password=fake.password(),
        )
        fake_user.save()

        job1 = choice(Service.objects.all())
        job2 = choice(Service.objects.all())
        region1 = choice(Region.objects.all())
        region2 = choice(Region.objects.all())

        new_freelancer = Freelancer.objects.create(
            user=fake_user,
            # services=job,
            # regions=region,
            details=fake.sentence(variable_nb_words=True))
        new_freelancer.save()
        new_freelancer.services.set([job1, job2])
        new_freelancer.regions.set([region1, region2])






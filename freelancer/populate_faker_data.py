from .models import User, Freelancer
from faker import Faker

fake = Faker()


def create_fake_users(num_users):

    for _ in range(num_users):
        fake_user = User.objects.create_user(
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            username=fake.user_name(),
            email=fake.email(),
            password=fake.password(),
        )
        fake_user.save()

        new_freelancer = Freelancer.objects.create(user=fake_user, ser)






from django.contrib.auth import get_user_model
from faker import Faker

fake = Faker()


def create_fake_users(num_users):
    User = get_user_model()
    fake_users = []

    for _ in range(num_users):
        fake_user = User(
            username=fake.user_name(),
            email=fake.email(),
            password=fake.password(),
        )
        fake_users.append(fake_user)

    User.objects.bulk_create(fake_users)

create_fake_users(1)
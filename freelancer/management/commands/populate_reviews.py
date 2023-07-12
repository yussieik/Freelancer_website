from freelancer.models import Freelancer, Review
from faker import Faker
from random import randint
from django.core.management.base import BaseCommand

fake = Faker()

class Command(BaseCommand):
    def handle(self, *args, **options):
        create_fake_reviews(8)
        print('reviews created')

def create_fake_reviews(max_reviews=10):
    for freelancer in Freelancer.objects.all():
        print(freelancer.id)
        for i in range(0, randint(0, max_reviews)):
            text = fake.paragraph(nb_sentences=10)
            score = randint(1,5)
            author = f'{fake.first_name()} {fake.last_name()}'
            review = Review(
                score=score,
                text=text,
                freelancer=freelancer,
                author=author
            )
            review.save()
            print (review)





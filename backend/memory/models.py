from django.db import models
from django.conf import settings
from accounts.models import UserAccount


# Create your models here.
class Curriculum(models.Model):
    curriculum = models.TextField()
    name = models.TextField()
    imgUrl = models.URLField(null=True)

    user = models.ForeignKey(
    UserAccount,
    null=True,
    related_name="curriculums",
    on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.name

class PracticeProblems(models.Model):
    problems = models.TextField()
    name = models.CharField(max_length=200)
    imgUrl = models.URLField(null=True)

    user = models.ForeignKey(
    UserAccount,
    null=True,
    related_name="PracticeProblems",
    on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.name

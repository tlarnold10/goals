from django.db import models

# Create your models here.
class Goal(models.Model):
    summary = models.CharField(max_length=100)
    details = models.CharField(max_length=1000)

    def __str__(self):
        return self.summary

class Step(models.Model):
    details = models.CharField(max_length=500)
    goal = models.ForeignKey(
        Goal, related_name="steps", on_delete=models.CASCADE)

    def __str__(self):
        return self.details

class Sugar(models.Model):
    grams = models.IntegerField()
    date = models.DateField()

    def __str__(self):
        return self.grams
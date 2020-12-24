from django.db import models

# Create your models here.
class Goal(models.Model):
    summary = models.CharField(max=100)
    details = models.CharField(max=1000)

    def __str__(self):
        return self.summary

# class ActionStep(models.Model):
#     details = models.CharField(max=500)
#     goal = models.ForeignKey(
#         "info.Author", related_name="books", on_delete=models.CASCADE)
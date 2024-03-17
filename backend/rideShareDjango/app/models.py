from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.
class React(models.Model):
  employee = models.CharField(max_length=30)
  department = models.CharField(max_length=200)

class User(models.Model):
  name = models.CharField(max_length=20)
  email = models.CharField(max_length=20)
  role = models.CharField(max_length=20)
  password = models.CharField(max_length=20)

class Feedback(models.Model):
  star = models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(5)])
  comment = models.CharField(max_length=255)
  email = models.CharField(max_length=255)
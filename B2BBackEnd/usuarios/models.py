from django.db import models
from django.contrib.auth.models import User


class Usuarios(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    cedula_usuario = models.CharField(max_length=18)
    
    
    
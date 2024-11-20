from django.db import models
from django.contrib.auth.models import User


class Usuarios(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    cedula_usuario = models.CharField(max_length=18)
    
    
    def __str__(self):
        return self.user.username
    
    
class Roles(models.Model):
    rol = models.CharField(max_length=50) # se asigna el rol
    usuario = models.ForeignKey(Usuarios,on_delete=models.CASCADE) #usuario a quien se le asigna
    
    
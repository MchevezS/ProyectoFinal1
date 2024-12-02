from django.db import models
from django.contrib.auth.models import User


class Usuarios(models.Model):
    ROL_OPCIONES = (
        ("usuario", "USUARIO"),
        ("trabajador","TRABAJADOR"),
        ("propietario","PROPIETARIO"),
        ("recursos_humanos","RECURSOS_HUMANOS")
    )
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    cedula_usuario = models.CharField(max_length=18)
    rol = models.CharField(choices=ROL_OPCIONES,default="usuario",max_length=30) # se asigna el rol
    
    
    def __str__(self):
        return self.user.username
    

    
    
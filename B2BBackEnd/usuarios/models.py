from django.db import models
from django.contrib.auth.models import User

# Opciones para definir el tipo de rol.
class Usuarios(models.Model):
    ROL_OPCIONES = (
        ("usuario", "USUARIO"),
        ("propietario","PROPIETARIO"),
        ("trabajador","TRABAJADOR"),
        ("recursos_humanos", "RECURSOS_HUMANOS")
    )
    user = models.OneToOneField(User,on_delete=models.CASCADE) #modelo user Django.
    cedula_usuario = models.CharField(max_length=18, unique=True)
    rol = models.CharField(choices=ROL_OPCIONES,default="usuario",max_length=30) # Se asigna el rol por defecto usuario.
    imagen_perfil = models.TextField(default="https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png", null= True, blank=True)
     
    
    def __str__(self):
        return self.user.username
    
    
"""
TIPOS DE ROLES Y LA LÓGICA:
Usuario: Tiene la intención de ser Dueño (él mismo se registró en la pág)
*pasa a dueño cuando la empresa es correctamente registrada*
Dueño: Él tiene acceso al dashboard para ver los registros de su empresa, encuestas y
registrar usuarios.
Trabajador: ÉL fue registrado por el rol Dueño, únicamente tiene acceso a ver/responder encuestas. Sus credenciales fueron dadas por el Dueño (igualmente las puede actualizar)
RRHH: ÉL fue registrado por el rol Dueño, únicamente tiene acceso a ver/crear encuestas.
Sus credenciales fueron dadas por el Dueño (igualmente las puede actualizar)
"""
from django.db import models
from django.core.validators import RegexValidator

#validacion para la cedula juridica
cedula_juridica_validator = RegexValidator(
    regex=r'^[1-9]\d{9}$', #la cedula debe de tener 10 digitos, el primero no puede ser 0
    message= "La cedula juridica debe de tener 10 digitos y no puede iniciar en 0"
)
# Create your models here.
class Empresa(models.Model):
    nombre_empresa = models.CharField (max_length = 100)
    #Cédula juridica de la empresa (debe ser unica y valida)
    cedula_juridica = models.CharField(
        max_length = 10, 
        unique=True,
        validators=[cedula_juridica_validator]) 
    correo = models.EmailField(unique=True) 
    #propietario de la empresa(relación con modelo Usuarios)
    propietario = models.ForeignKey("usuarios.Usuarios",on_delete=models.CASCADE)
    
    def __str__(self):
        return self.nombre_empresa
    
    
class AreaTrabajo(models.Model):
    #Responsable del área(relación con modelo Usuarios)
    nombre_area = models.CharField(max_length=100)
    responsable_del_area = models.ForeignKey("usuarios.Usuarios", on_delete=models.CASCADE)
    empresa = models.ForeignKey(Empresa,on_delete=models.CASCADE) # que empresa tiene esa area 
    def __str__(self):
        
        return self.nombre_area
    

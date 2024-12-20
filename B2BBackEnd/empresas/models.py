from django.db import models
from django.core.validators import RegexValidator

#utilizamos expresiones regulares para validar.
#validacion para la cedula juridica
cedula_juridica_validator = RegexValidator(
    regex=r'^[1-9]\d{9}$', #la cedula debe de tener 10 digitos, el primero no puede ser 0
    message= "La cedula juridica debe de tener 10 digitos y no puede iniciar en 0"
)
# Creamos el modelo empresa, damos validaciones y creamos al propietario a traves del modelo usuarios
#conectandolo con la llave foranea.
class Empresa(models.Model):
    nombre_empresa = models.CharField (max_length = 100)
    #Cédula juridica de la empresa (debe ser unica y valida)
    cedula_juridica = models.CharField(
        max_length = 10, 
        unique=True,
        validators=[cedula_juridica_validator]
    ) 
    correo = models.EmailField(unique=True) 
    #propietario de la empresa(relación con modelo Usuarios)
    propietario = models.ForeignKey("usuarios.Usuarios",on_delete=models.CASCADE) #La relacion se hace "app.Modelo"
    activo = models.BooleanField(default=True)  # Este campo indica si la empresa está activa o desactivada
    
    def __str__(self):
        return self.nombre_empresa
    
    
    
    
  #Creamos el modelo que contiene las áreas diponibles para cada empresa, especificamos que no se pueden 
  #añadir otras que no sean las de la tupla y le damos areas a las empresas.
class AreaTrabajo(models.Model):
    AREA_OPCIONES = [
    ('Marketing', 'MARKETING'),
    ('TI', 'TI'),
    ('Atencion al cliente', 'ATENCION_CLIENTE'),
    ('Recursos humanos', 'RECURSOS_HUMANOS'),
    ('Finanzas', 'FINANZAS'),
]
    nombre_area = models.CharField(choices=AREA_OPCIONES,max_length=30)
    empresa = models.ForeignKey(Empresa,on_delete=models.CASCADE) # que empresa tiene esa area 
    
    def __str__(self):
        return self.nombre_area
    
    
    
#Creamos el modelo para asignarle un area de trabajo a un empleado
#utilizando las relaciones Usuarios,AreaTrabajo y Empresa.
class AreaTrabajoUsuarios(models.Model):
    usuario = models.ForeignKey("usuarios.Usuarios", on_delete=models.CASCADE)
    area_trabajo = models.ForeignKey(AreaTrabajo, on_delete=models.CASCADE)
    empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE)


    #Asegura que un usuario no esté duplicado en la misma área dentro de la misma empresa
    class Meta:
        unique_together = ('usuario', 'area_trabajo') 
    
    def __str__(self):
        return f"{self.usuario.nombre} - {self.area_trabajo.nombre_area}"




#Creamos el modelo para asignarle empleados a una empresa.
class Empleados(models.Model):
    trabajador = models.ForeignKey("usuarios.Usuarios", on_delete=models.CASCADE, related_name="trabajador_empresa")
    empresa= models.ForeignKey(Empresa, on_delete=models.CASCADE, related_name="empresa_trabajador")
    
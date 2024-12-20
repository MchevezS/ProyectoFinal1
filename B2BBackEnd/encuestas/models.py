from django.db import models
# Create your models here.

# modelo donde creamos las categorias de cada encuesta. 
#Se realaciona con empresa para tener encuestas exclusivas de cada empresa.
class Encuestas(models.Model):
    ENCUESTAS_CATEGORIAS = [
        ("Salud Mental","Salud Mental"),
        ("Ambiente Laboral","Ambiente Laboral"),
        ("Equilibrio Vida-Trabajo","Equilibrio Vida-Trabajo"),
        ("Beneficios y Compensaciones","Beneficios y Compensaciones"),
        ("Comunicación Interna","Comunicación Interna"),
        ("Oportunidades de Crecimiento","Oportunidades de Crecimiento")
    ]
    categoria_encuesta = models.CharField(choices=ENCUESTAS_CATEGORIAS, max_length=50)
    descripcion_encuesta = models.TextField()
    
    fecha_creacion = models.DateField(auto_now=True)
    empresa = models.ForeignKey("empresas.Empresa", on_delete=models.CASCADE,related_name="encuestas_empresa")
    activo = models.BooleanField(default=True)  # Este campo indica si la empresa está activa o desactivada
    
    def __str__(self):
        return self.categoria_encuesta 
    
    
  # Modelo pregunta contiene la referencia de la encuesta
class Pregunta(models.Model):
    encuesta_referencia = models.ForeignKey(Encuestas, on_delete=models.CASCADE)
    pregunta_texto = models.TextField()
    
    
    def __str__(self):
        return self.pregunta_texto
    
    
#modelo en el que creamos la tupla de respuestas pre definidas.
class Respuesta(models.Model):
    RESPUESTA_ELECCIONES = [
        ("MUY BUENA","Muy buena"),("BUENA","Buena"),("REGULAR","Regular"),("MALA","Mala"),("MUY MALA","Muy mala")
    ]
    encuesta_referencia = models.ForeignKey(Encuestas,on_delete=models.CASCADE) #Encuesta en que se esta rerspondiendo
    pregunta_referencia = models.ForeignKey(Pregunta, on_delete=models.CASCADE) #Pregunta a la que se esta respondiendo
    usuario_referencia = models.ForeignKey("usuarios.Usuarios", on_delete=models.CASCADE,related_name= "usuario_responde")
    respuesta_texto = models.CharField(choices=RESPUESTA_ELECCIONES, max_length = 11) #La respuesta que se dio
    fecha_respuesta = models.DateField(auto_now=True) #la fecha en la que se repondio
    empresa = models.ForeignKey("empresas.Empresa", on_delete=models.CASCADE,related_name="respuestas_empresa")#la empresa a que pertenece esa respuesta

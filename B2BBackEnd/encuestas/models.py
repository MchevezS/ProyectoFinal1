from django.db import models

# Create your models here.

# Modelo padre
class Encuestas(models.Model):
    titulo_encuesta = models.CharField(max_length=200)
    descripcion_encuesta = models.TextField()
    fecha_creacion = models.DateField(auto_now=True)
    
    
    def __str__(self):
        return self.titulo_encuesta 
    
    
  # Modelo pregunta contiene la referencia del la encuesta
class Pregunta(models.Model):
    encuesta_referencia = models.ForeignKey(Encuestas, on_delete=models.CASCADE)
    pregunta_texto = models.TextField()
    
    
    def __str__(self):
        return self.pregunta_texto
    
    
    
class Respuesta(models.Model):
    RESPUESTA_ELECCIONES = [
        ("MUY BUENA","Muy buena"),("BUENA","Buena"),("REGULAR","Regular"),("MALA","Mala"),("MUY MALA","Muy mala")
    ]
    encuesta_referencia = models.ForeignKey(Encuestas,on_delete=models.CASCADE) #En que enncuesta esta la pregunta
    pregunta_referencia = models.ForeignKey(Pregunta, on_delete=models.CASCADE) #A que pregunta esta respondiendo
    usuario_referencia = models.ForeignKey("usuarios.Usuarios", on_delete=models.CASCADE,related_name= "usuario_responde")
    respuesta_texto = models.CharField(choices=RESPUESTA_ELECCIONES, max_length = 11) #La respuesta que se dio
    fecha_respuesta = models.DateField(auto_now=True) #la fecha en la que se repondio
    retroalimentacion = models.TextField(blank=True,null=True) #Retroalimentacion de la respuesta
    

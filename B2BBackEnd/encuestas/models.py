from django.db import models



# Create your models here.
class Encuestas(models.Model):
    descripcion = models.TextField()
    fecha = models.DateField( auto_now= True)
    preguntas = models.ForeignKey("Preguntas.encuentas", on_delete=models.CASCADE)
    Tipo_de_encuestas = models.ForeignKey("Tipo_de_encuentas.encuentas", on_delete=models.CASCADE)
    
    def __str__(self):
        return self.descripcion
    
class Preguntas(models.Model):
    preguntas = models.CharField(max_length=500)
    
    def __str__(self):
        return self.preguntas
    
class Tipo_de_encuestas(models.Model):
    tipo = models.CharField(max_length=400)
    
    def __str__(self):
        return self.tipo
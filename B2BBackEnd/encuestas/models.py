from django.db import models
from datetime import date
from django.core.exceptions import ValidationError


# Create your models here.
class Encuestas(models.Model):
    descripcion = models.TextField()
    fecha = models.DateField( auto_now= True)
    preguntas = models.ForeignKey("Preguntas.encuentas", on_delete=models.CASCADE)
    Tipo_de_encuestas = models.ForeignKey("Tipo_de_encuentas.encuentas", on_delete=models.CASCADE)
    
    def clean(self): # Validaciones para las encuestas
        # Validación para asegurarse de que la descripción no esté vacía
        if not self.descripcion.strip():
            raise ValidationError('La descripción no puede estar vacía.')

        # Validación para asegurar que la fecha no sea en el futuro
        if self.fecha > date.today():
            raise ValidationError('La fecha no puede ser en el futuro.')

        # Validación para comprobar que las relaciones de las claves foráneas existen
        if not self.preguntas:
            raise ValidationError('Debe haber una pregunta asociada a la encuesta.')
        if not self.Tipo_de_encuestas:
            raise ValidationError('Debe haber un tipo de encuesta asociado.')

    def save(self, *args, **kwargs):
        # Llamamos al método clean antes de guardar
         self.clean()
         super().save(*args, **kwargs)
         

class Preguntas(models.Model):
    preguntas = models.TextField
    
    def __str__(self):
        return self.preguntas
    
    def clean(self): # Validaciones para las preguntas
        # Validación para asegurarse de que la pregunta no esté vacía
        if not self.preguntas.strip():
            raise ValidationError('La pregunta no puede estar vacía.')

        # Validación para asegurarse de que la pregunta tenga una longitud mínima de 5 caracteres
        if len(self.preguntas) < 5:
            raise ValidationError('La pregunta debe tener al menos 5 caracteres.')

    def save(self, *args, **kwargs):
        # Llamamos al método clean antes de guardar alguna información
        self.clean()
        super().save(*args, **kwargs)
        

class Tipo_de_encuestas(models.Model):
    tipo = models.CharField(max_length=400)
    
    def __str__(self):
        return self.tipo
    
    def clean(self): # Validaciones para el tipo de encuestas
        # Validación para asegurarse de que el tipo no esté vacío
        if not self.tipo.strip():
            raise ValidationError('El tipo de encuesta no puede estar vacío.')

        # Validación para asegurarse de que el tipo tenga una longitud mínima de 3 caracteres
        if len(self.tipo) < 3:
            raise ValidationError('El tipo de encuesta debe tener al menos 3 caracteres.')

    def save(self, *args, **kwargs):
        # Llamamos al método clean antes de guardar / esto para que las validaciones se ejecuten antes de guardar alguna información
        self.clean()
        super().save(*args, **kwargs)

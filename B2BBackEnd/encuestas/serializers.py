from rest_framework.serializers import ModelSerializer

from.models import Encuestas,Pregunta,Respuesta

from rest_framework import serializers
from encuestas.models import Encuestas

class EncuestaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Encuestas
        fields = '__all__'  # Esto incluirá todos los campos del modelo Encuestas

        
class PreguntaSerializer(ModelSerializer):
    class Meta:
        model = Pregunta
        fields = '__all__'
        
        
class RespuestaSerializer(ModelSerializer):
    class Meta:
        model = Respuesta
        fields = '__all__'
        
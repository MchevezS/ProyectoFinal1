from rest_framework.serializers import ModelSerializer
from.models import Encuestas,Pregunta,Respuesta
from rest_framework import serializers


class EncuestaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Encuestas
        fields = '__all__'  # Esto incluirá todos los campos del modelo Encuestas

class PreguntaSerializer(ModelSerializer):
    class Meta:
        model = Pregunta
        fields = '__all__'
        
        
class RespuestaSerializer(ModelSerializer):
    categoria_encuesta = serializers.CharField(source='encuesta_referencia.categoria_encuesta',read_only=True)#campo para obtener el nombre de la categoria 
    class Meta:
        model = Respuesta
        fields = ['id','encuesta_referencia','pregunta_referencia','usuario_referencia','respuesta_texto','categoria_encuesta','fecha_respuesta','empresa']

        
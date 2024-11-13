from rest_framework import serializers
from .models import Encuestas
from .models import Preguntas
from .models import Tipo_de_encuestas

class EncuentasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Encuestas
        tields = '_all_'
        

class PreguntasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Preguntas        
        tields = '_all_'
        
        
class Tipo_de_encuestasSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Tipo_de_encuestas
        tields = '_all_'
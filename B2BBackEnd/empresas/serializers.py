from rest_framework import serializers
from .models import Empresa, AreaTrabajo, AreaTrabajoUsuarios

# Serializer para el modelo Empresa
class EmpresaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empresa  # Modelo 'Empresa'
        fields = '__all__'  # Incluye todos los campos del modelo 'Empresa'


# Serializer para el modelo AreaTrabajo
class AreaTrabajoSerializer(serializers.ModelSerializer):
    class Meta:
        model = AreaTrabajo  
        fields = '__all__' 


class AreaTrabajoUsuariosSerializer(serializers.ModelSerializer):
    class Meta:
        model = AreaTrabajoUsuarios 
        fields = '__all__'  
        

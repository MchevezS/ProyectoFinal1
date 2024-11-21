from django.contrib.auth.models import User
from .models import Usuarios
from rest_framework.serializers import ModelSerializer
 
# Aqui convertimos los objetos de User en datos que se representan en formato JSON
class UsuariosSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
from rest_framework.serializers import ModelSerializer
from .models import Roles

class RolSerializers(ModelSerializer):
    class Meta: 
        model = Roles
        fields = ["rol","usuario"]

from rest_framework.serializers import ModelSerializer
from .models import Roles

class RolSerializers(ModelSerializer):
    class Meta: 
        model = Roles
        fields = ["rol","usuario"]

from django.shortcuts import render
from rest_framework import generics
from .models import Empresa, AreaTrabajo
from .serializers import EmpresaSerializer, AreaTrabajoSerializer

# Vista para obtener todas las empresas o crear una nueva
class EmpresaListCreateView(generics.ListCreateAPIView):
    queryset = Empresa.objects.all()
    serializer_class = EmpresaSerializer

# Vista para obtener todas las áreas de trabajo o crear una nueva
class AreaTrabajoListCreateView(generics.ListCreateAPIView):
    queryset = AreaTrabajo.objects.all()
    serializer_class = AreaTrabajoSerializer


from django.shortcuts import render
from rest_framework import generics
from .models import Encuestas, Preguntas, Tipo_de_encuestas
from .serializers import EncuentasSerializer, PreguntasSerializer, Tipo_de_encuestasSerializer


class EncuestasListCreate(generics.ListCreateAPIView):
    queryset = Encuestas.objects.all()
    serializer_class = EncuentasSerializer


class EncuestasDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Encuestas.objects.all()
    serializer_class = EncuentasSerializer
    
    

class PreguntasListCreate(generics.ListCreateAPIView):
    queryset = Preguntas.objects.all()
    serializer_class = PreguntasSerializer
    
    
class PreguntasDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Preguntas.objects.all()
    serializer_class = PreguntasSerializer
    
    

class Tipo_de_encuestasListCrreate(generics.ListCreateAPIView):
    queryset = Tipo_de_encuestas.objects.all()
    serializer_class = Tipo_de_encuestas
    
    
class Tipo_de_encuestasDetail(generics.ListCreateAPIView):
    queryset = Tipo_de_encuestas.objects.all()
    serializer_class = Tipo_de_encuestas
    
    
    
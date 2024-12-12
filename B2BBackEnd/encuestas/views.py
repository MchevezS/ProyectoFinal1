from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from encuestas.models import Encuestas, Pregunta,Respuesta
from encuestas.serializers import EncuestaSerializer, PreguntaSerializer, RespuestaSerializer

# Create your views here.
# List create api view = GET/POST.
class EncuestaView(ListCreateAPIView):
    queryset = Encuestas.objects.all()
    serializer_class = EncuestaSerializer
    
class PreguntaView(ListCreateAPIView):
    queryset = Pregunta.objects.all()
    serializer_class = PreguntaSerializer
    
class RespuestaView(ListCreateAPIView):
    queryset = Respuesta.objects.all()
    serializer_class = RespuestaSerializer

    
    
class EncuestaCompleta(APIView):
    def get(self,request,encuesta_id,format=None):
        
        encuesta = Encuestas.objects.get(id = encuesta_id)
        
        preguntas = Pregunta.objects.filter(encuesta_referencia = encuesta)
        
        respuestas = Respuesta.objects.filter(encuesta_referencia = encuesta)
        
        
        pregunta_serializer = PreguntaSerializer(preguntas,many=True)
        respuestas_serializer = RespuestaSerializer(respuestas,many= True) 
        
        
        return Response({
            'encuesta': EncuestaSerializer(encuesta).data, #devuelve los datos de la encuesta.
            'preguntas': pregunta_serializer.data, #devuelve todas las preguntas de la encuesta en especifico (segun el id de la encuesta).
            'respuestas': respuestas_serializer.data #devuelve todas las respuestas de la encuesta en especifico (segun el id de la encuesta).
        })

class TraerEncuestasID(ListCreateAPIView):
    queryset = Encuestas.objects.all()
    serializer_class = EncuestaSerializer
    lookup_field = 'empresa'

    def get_queryset(self):
        empresa = self.kwargs['empresa']
        return self.queryset.filter(empresa=empresa)

class EncuestasRespondidasSinResponderView(APIView):
    def get(self,request):

        encuestas_ids = Respuesta.objects.values_list('encuesta_referencia',flat=True).distinct()

        encuestas_respondidas = Encuestas.objects.filter(id__in = encuestas_ids)

        encuestas_sin_responder = Encuestas.objects.exclude(id__in = encuestas_ids) 

        data = {
            'encuestas_respondidas': EncuestaSerializer(encuestas_respondidas,many=True).data,
            'encuestas_sin_responder': EncuestaSerializer(encuestas_sin_responder,many=True).data
        }

        return Response(data,status=status.HTTP_200_OK)


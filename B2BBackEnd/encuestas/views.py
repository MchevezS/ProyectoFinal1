from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from encuestas.models import Encuestas, Pregunta, Respuesta
from encuestas.serializers import EncuestaSerializer, PreguntaSerializer, RespuestaSerializer
from rest_framework import generics

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
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Encuestas, Pregunta, Respuesta
from .serializers import EncuestaSerializer, PreguntaSerializer, RespuestaSerializer

class EncuestaCompletaEmpresa(APIView):
    def get(self, request, empresa, format=None):
        encuestas = Encuestas.objects.filter(empresa=empresa)
        
        encuestas_serializadas = EncuestaSerializer(encuestas, many=True).data
        
        data_encuestas = []

        for encuesta in encuestas:
            preguntas = Pregunta.objects.filter(encuesta_referencia=encuesta)
            respuestas = Respuesta.objects.filter(encuesta_referencia=encuesta)
            
            pregunta_serializer = PreguntaSerializer(preguntas, many=True).data
            respuestas_serializer = RespuestaSerializer(respuestas, many=True).data

            data_encuestas.append({
                'encuesta': EncuestaSerializer(encuesta).data,
                'preguntas': pregunta_serializer,
                'respuestas': respuestas_serializer
            })

        return Response(data_encuestas)

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


class CambiarEstadoEncuestaView(APIView):
    def patch(self, request, encuesta_id):
        try:
            # Obtener la encuesta por su ID
            encuesta = Encuestas.objects.get(id=encuesta_id)
            # Cambiar el estado de la encuesta (activa/desactiva)
            encuesta.activo = not encuesta.activo  # Cambia el valor de 'activo'
            encuesta.save()
            # Responder con un mensaje de éxito
            return Response({
                'message': f"encuesta {'activada' if encuesta.activo else 'desactivada'} correctamente",
                'encuesta': encuesta.categoria_encuesta,
                'estado_actual': 'activa' if encuesta.activo else 'desactivada'
            }, status=status.HTTP_200_OK)
        except encuesta.DoesNotExist:
            return Response({'error': 'encuesta no encontrada'}, status=status.HTTP_404_NOT_FOUND)

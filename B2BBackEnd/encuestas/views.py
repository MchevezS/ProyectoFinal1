from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView
from rest_framework import status
from encuestas.models import Encuestas, Pregunta, Respuesta
from encuestas.serializers import EncuestaSerializer, PreguntaSerializer, RespuestaSerializer
from rest_framework.views import APIView
from rest_framework.response import Response

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

    
    #trae toda la informacion de la encuesta según su id. (responder encuestas)
class EncuestaCompleta(APIView):
    def get(self,request,encuesta_id,format=None):
        
        encuesta = Encuestas.objects.get(id = encuesta_id)# trae la encuesta del id 
        
        preguntas = Pregunta.objects.filter(encuesta_referencia = encuesta)# trae las preguntas donde la referencia de encuesta sea igual al id que le estoy dando
        
        respuestas = Respuesta.objects.filter(encuesta_referencia = encuesta)# trae las respuessta donde la referencia de encuesta sea igual al id que le estoy dando
        
        
        pregunta_serializer = PreguntaSerializer(preguntas,many=True)#agrupa todas las preguntas
        respuestas_serializer = RespuestaSerializer(respuestas,many= True) #agrupa todas las respuestas
        
        
        return Response({
            'encuesta': EncuestaSerializer(encuesta).data, #devuelve los datos de la encuesta.
            'preguntas': pregunta_serializer.data, #devuelve todas las preguntas de la encuesta en especifico (segun el id de la encuesta).
            'respuestas': respuestas_serializer.data #devuelve todas las respuestas de la encuesta en especifico (segun el id de la encuesta).
        })



    #trae todas las encuestas de una empresa en especifico. (ver encuestas y encuestas respondidas)
class EncuestaCompletaEmpresa(APIView):
    def get(self, request, empresa, format=None):
        encuestas = Encuestas.objects.filter(empresa=empresa)#filtra por el id de la empresa.
        
        encuestas_serializadas = EncuestaSerializer(encuestas, many=True).data#obtenemos la informacion de todas las encuestas 
        
        data_encuestas = [] #por cada recorrido se guarda la info de cada encuesta 

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



# trae las encuestas de cada empresa.
class TraerEncuestasID(ListCreateAPIView):
    queryset = Encuestas.objects.all()
    serializer_class = EncuestaSerializer
    lookup_field = 'empresa'

    def get_queryset(self):
        empresa = self.kwargs['empresa']
        return self.queryset.filter(empresa=empresa)




# trae todos los ids de encuestas que estan dentro del modelo respuestas para filtrar entre encuestas respondidas y sin respoonder.
#(grafico circular)
class EncuestasRespondidasSinResponderView(APIView):
    def get(self,request):

        encuestas_ids = Respuesta.objects.values_list('encuesta_referencia',flat=True).distinct()#traemos las encuestas respondidas

        encuestas_respondidas = Encuestas.objects.filter(id__in = encuestas_ids)

        encuestas_sin_responder = Encuestas.objects.exclude(id__in = encuestas_ids) 

        #agrupa todas las encuestas en respondidas y sin responder.
        data = {
            'encuestas_respondidas': EncuestaSerializer(encuestas_respondidas,many=True).data,
            'encuestas_sin_responder': EncuestaSerializer(encuestas_sin_responder,many=True).data
        }

        return Response(data,status=status.HTTP_200_OK)


#cambia el estado de la encuesta usando el id de la encuesta . (administracion general) 
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

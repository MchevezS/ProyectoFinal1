from django.urls import path
from encuestas import views
from .views import EncuestaView,PreguntaView,RespuestaView,EncuestaCompleta,TraerEncuestasID,EncuestasRespondidasSinResponderView,CambiarEstadoEncuestaView

urlpatterns = [
    path('encuestas/', EncuestaView.as_view()),  # Crear encuestas
    path('preguntas/', PreguntaView.as_view()),  # Crear preguntas
    path('respuestas/', RespuestaView.as_view()),  # Crear respuestas
    path('traerencuestas/<int:encuesta_id>/', EncuestaCompleta.as_view()),  # Ver la encuesta completa
    path("encuestas-empresa/<int:empresa>/", TraerEncuestasID.as_view(), name=""),
    path("encuestas-respondidas-sinresponder/", EncuestasRespondidasSinResponderView.as_view(), name=""),
    path('encuesta/estado/<int:encuesta_id>/', CambiarEstadoEncuestaView.as_view(), name='cambiar-estado-encuesta') # URL para el estado de la encuesta (activa/desactiva)
]

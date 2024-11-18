from django.urls import path
from encuestas.views import EncuestaView, PreguntaView, RespuestaView, EncuestaCompleta

urlpatterns = [
    path('encuestas/', EncuestaView.as_view()),  # Crear encuestas
    path('preguntas/', PreguntaView.as_view()),  # Crear preguntas
    path('respuestas/', RespuestaView.as_view()),  # Crear respuestas
    path('encuestas/<int:encuesta_id>/', EncuestaCompleta.as_view()),  # Ver la encuesta completa
]

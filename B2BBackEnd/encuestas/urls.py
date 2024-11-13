from django.urls import path
from . import views


urlpatterns = [
    path('encuestas/', views.EncuestasListCreate.as_view(), name='encuestas-list'),
    path('encuestas/<int:pk>/', views.EncuestasDetail.as_view(), name='encuestas-detail'),
    
    path('preguntas/', views.PreguntasListCreate.as_view(), name='preguntas-list'),
    path('preguntas/<int:pk>/', views.PreguntasDetail.as_view(), name='preguntas-detail'),
    
    path('tipoEncuesta/', views.EncuestasListCreate.as_view(), name='tipoEncuesta-list'),
    path('tipoEncuesta/<int:pk>/', views.Tipo_de_encuestasDetail.as_view(), name='tipoEncuesta-detail'),
    
]

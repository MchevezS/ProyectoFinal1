from django.contrib import admin
from django.urls import path, include


#Tomamos todas las urls de cada aplicación.
urlpatterns = [
    path('api/', include('usuarios.urls')),
    path("api/", include("empresas.urls")),
    path('api/', include("encuestas.urls")),
]



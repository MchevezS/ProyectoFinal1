from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('api/', include('usuarios.urls')),
    path("api/", include("empresas.urls")),
    path('api/', include("encuestas.urls")),
]



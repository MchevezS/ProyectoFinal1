from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')), # Ruta para la API
    path('api/', include('usuarios.urls')),
    path('api/', include("encuestas.urls")),
    path('api/', include("empresas.urls"))

]
    


from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
<<<<<<<<< Temporary merge branch 1
    path("api/", include('usuarios.urls'))
]
=========
    path("api/", include("usuarios.urls")),
    path('api/', include("encuestas.urls"))
    
]

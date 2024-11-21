from django.urls import path

from .views import AsignarRolesView, LoginView, RegistroView
from .views import LoginView, RegistroView
urlpatterns = [
    path("crear-usuario/", RegistroView.as_view()),
    path("login-usuario/", LoginView.as_view()),
    # path("traer-usuarios/",UsuariosView.as_view()),
    # Este url es para traer un usuario o para crear un usuario nuevo
    path("definir_roles/", AsignarRolesView.as_view())
    
    
]

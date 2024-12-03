from django.urls import path

from .views import LoginView, RegistroView, UsuariosView,RegistroEmpleadoView,ActivarDescactivarUsuarioView
urlpatterns = [
    path("crear-usuario/", RegistroView.as_view()),
    path("login-usuario/", LoginView.as_view()),
    path("traer-usuarios/",UsuariosView.as_view()),
    path("crear-empleado/",RegistroEmpleadoView.as_view()),
    path("estado-usuario/",ActivarDescactivarUsuarioView .as_view()),
    

    # Este url es para traer un usuario o para crear un usuario nuevo
    
]

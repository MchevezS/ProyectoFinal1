from django.urls import path

from .views import LoginView, RegistroView, UsuariosView,RegistroEmpleadoView,ActivarDescactivarUsuarioView,CambiarClaveView,CambiarEstadoUsuarioView,CambiarFotoPerfilView
urlpatterns = [
    path("crear-usuario/", RegistroView.as_view()),
    path("login-usuario/", LoginView.as_view()),
    path("traer-usuarios/",UsuariosView.as_view()),     # Este url es para traer un usuario o para crear un usuario nuevo
    path("crear-empleado/",RegistroEmpleadoView.as_view()),
    path("estado-usuario/",ActivarDescactivarUsuarioView .as_view()),
    path("cambio-clave/", CambiarClaveView.as_view()),
    path("crear-admin/", CambiarClaveView.as_view()),
    path('usuario/estado/<int:usuario_id>/', CambiarEstadoUsuarioView.as_view(), name='cambiar-estado-usuario'), # URL para el estado del usuario (activa/desactiva
    path("cambio-imagen/", CambiarFotoPerfilView.as_view(), name="")


    
]

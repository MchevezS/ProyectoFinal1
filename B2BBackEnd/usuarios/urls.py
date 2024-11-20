from django.urls import path

from .views import AsignarRolesView, LoginView, RegistroView

urlpatterns = [
    path("crear-usuario/", RegistroView.as_view()),
    path("login-usuario/", LoginView.as_view()),
    path("definir_roles/", AsignarRolesView.as_view())
    
    
]

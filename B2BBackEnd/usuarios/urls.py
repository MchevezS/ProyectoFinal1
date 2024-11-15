from django.urls import path

from .views import LoginView, RegistroView

urlpatterns = [
    path("crear-usuario/", RegistroView.as_view()),
    path("login-usuario/", LoginView.as_view())
]

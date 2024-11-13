from django.urls import path

from .views import RegistroView

urlpatterns = [
    path("crear-usuario/", RegistroView.as_view())
]

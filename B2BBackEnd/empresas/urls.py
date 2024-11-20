from django.urls import path
from . import views

urlpatterns = [
    # Rutas para las vistas de Empresa
    path('empresas/', views.EmpresaListCreateView.as_view(), name='empresa-list'),

    # Rutas para las vistas de AreaTrabajo
    path('AreaTrabajo/', views.AreaTrabajoListCreateView.as_view(), name='area-trabajo-list'),
    path('asignar_usuario/', views.AsignarUsuarioAreaTrabajoView.as_view(), name='asignar_usuario'),
]


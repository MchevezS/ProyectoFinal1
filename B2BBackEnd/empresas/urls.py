from django.urls import path
from . import views
from .views import CambiarEstadoEmpresaView

urlpatterns = [
    # Rutas para las empresas
    path('empresas/', views.EmpresaListCreateView.as_view(), name='empresa-list'),
    path('empresas/<int:pk>/', views.EmpresaDetailView.as_view(), name='empresa-detail'),  # URL para detalle de empresa (GET, PUT, DELETE)
     path('empresa/estado/<int:empresa_id>/', CambiarEstadoEmpresaView.as_view(), name='cambiar-estado-empresa'), # URL para el estado de la empresa (activa/desactiva)
    
    # Rutas para las áreas de trabajo
    path('AreaTrabajo/', views.AreaTrabajoListCreateView.as_view(), name='area-trabajo-list'),
    path('AreaTrabajo/<int:id>/', views.AreaTrabajoDetailView.as_view(), name='area-trabajo-detail'),  # URL para detalle de área de trabajo (GET, PUT, DELETE)
    
    # Ruta para asignar usuario a área de trabajo
    path('asignar_usuario/', views.AsignarUsuarioAreaTrabajoView.as_view(), name='asignar_usuario'),
]
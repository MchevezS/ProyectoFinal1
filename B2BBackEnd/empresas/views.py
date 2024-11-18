from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Empresa, AreaTrabajo, AreaTrabajoUsuarios
from .serializers import EmpresaSerializer, AreaTrabajoSerializer, AreaTrabajoUsuariosSerializer

# Vista para obtener todas las empresas o crear una nueva
class EmpresaListCreateView(generics.ListCreateAPIView):
    queryset = Empresa.objects.all()
    serializer_class = EmpresaSerializer

# Vista para obtener todas las áreas de trabajo o crear una nueva
class AreaTrabajoListCreateView(generics.ListCreateAPIView):
    queryset = AreaTrabajo.objects.all()
    serializer_class = AreaTrabajoSerializer

# Vista para asignar un usuario a un área de trabajo dentro de una empresa
class AsignarUsuarioAreaTrabajoView(APIView):

    def post(self, request):
        # Obtener los parámetros enviados en la solicitud
        usuario_id = request.data.get('usuario_id')
        area_trabajo_id = request.data.get('area_trabajo_id')
        empresa_id = request.data.get('empresa_id')

        try:
            # Obtener los objetos relacionados
            usuario = Usuario.objects.get(id=usuario_id)
            area_trabajo = AreaTrabajo.objects.get(id=area_trabajo_id)
            empresa = Empresa.objects.get(id=empresa_id)

            # Crear la asignación en la tabla intermedia
            AreaTrabajoUsuarios.objects.create(usuario=usuario, area_trabajo=area_trabajo, empresa=empresa)

            # Responder con el éxito de la asignación
            return Response({
                'message': 'Usuario asignado correctamente',
                'usuario': usuario.nombre,
                'area_trabajo': area_trabajo.nombre_area,
                'empresa': empresa.nombre_empresa
            }, status=status.HTTP_201_CREATED)

        except Usuario.DoesNotExist:
            return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        except AreaTrabajo.DoesNotExist:
            return Response({'error': 'Área de trabajo no encontrada'}, status=status.HTTP_404_NOT_FOUND)
        except Empresa.DoesNotExist:
            return Response({'error': 'Empresa no encontrada'}, status=status.HTTP_404_NOT_FOUND)

from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Empresa, AreaTrabajo, AreaTrabajoUsuarios
from .serializers import EmpresaSerializer, AreaTrabajoSerializer, AreaTrabajoUsuariosSerializer

# Vista para obtener todas las empresas o crear una nueva
class EmpresaListCreateView(generics.ListCreateAPIView):
    queryset = Empresa.objects.all()  # Esto obtiene todas las empresas
    serializer_class = EmpresaSerializer

# Vista para obtener, actualizar o eliminar una empresa por ID
class EmpresaDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Empresa.objects.all()  # Esto obtiene todas las empresas
    serializer_class = EmpresaSerializer

# Vista para obtener todas las áreas de trabajo o crear una nueva
class AreaTrabajoListCreateView(generics.ListCreateAPIView):
    queryset = AreaTrabajo.objects.all()
    serializer_class = AreaTrabajoSerializer

# Vista para obtener, actualizar o eliminar un área de trabajo por ID
class AreaTrabajoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = AreaTrabajo.objects.all()  # Esto obtiene todas las áreas de trabajo
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

class CambiarEstadoEmpresaView(APIView):
    def patch(self, request, empresa_id):
        try:
            # Obtener la empresa por su ID
            empresa = Empresa.objects.get(id=empresa_id)

            # Cambiar el estado de la empresa (activa/desactiva)
            empresa.activo = not empresa.activo  # Cambia el valor de 'activo'
            empresa.save()

            # Responder con un mensaje de éxito
            return Response({
                'message': f"Empresa {'activada' if empresa.activo else 'desactivada'} correctamente",
                'empresa': empresa.nombre_empresa,
                'estado_actual': 'activa' if empresa.activo else 'desactivada'
            }, status=status.HTTP_200_OK)
        
        except Empresa.DoesNotExist:
            return Response({'error': 'Empresa no encontrada'}, status=status.HTTP_404_NOT_FOUND)
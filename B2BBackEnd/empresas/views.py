from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Empresa, AreaTrabajo, AreaTrabajoUsuarios, Empleados
from  usuarios.models import Usuarios
from .serializers import EmpresaSerializer, AreaTrabajoSerializer, AreaTrabajoUsuariosSerializer, EmpleadosSerializer
from rest_framework.generics import ListCreateAPIView

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

# Vista para asignar los empleados a las empresas.
class AsignarEmpleadosEmpresasView(generics.ListCreateAPIView):
    queryset = Empleados.objects.all() 
    serializer_class = EmpleadosSerializer
    
# Vista para asignar un usuario a un área de trabajo dentro de una empresa
class AsignarUsuarioAreaTrabajoView(ListCreateAPIView):
    queryset = AreaTrabajoUsuarios.objects.all()
    serializer_class = AreaTrabajoUsuariosSerializer

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


# Vista para cambiar el rol de los usuarios
class CambiarRolUsuarioView(APIView):
    # Se usa método patch para únicamente actualizar el rol del usuario
    def patch(self,request):
        usuario_id = request.data.get('usuario_id') #Se obtiene la referencia del usuario por medio del id
        rol_usuario = request.data.get('rol') # Se obtiene el rol al que será modificado
        usuario=Usuarios.objects.get(user_id=usuario_id) # Tomaamos el ussuario de la BD para modificarlo
        usuario.rol = rol_usuario # Se le cambia el rol
        usuario.save() # Se guardan los cambios
        # Se responde con un mensaje de éxito
        return Response({
            'message': f"Rol de usuario cambiado correctamente",
            'rol': usuario.rol
        }, status=status.HTTP_200_OK)
        
# Vista para traer todos los empleados de una empresa 
class TraerEmpleadosEmpresaView(APIView):
    def get(self,request):
        id_empresa = request.query_params.get('empresa_id')
        lista_empleados_filtrados = Empleados.objects.filter(empresa= id_empresa).select_related('trabajador') # este lista empleados, solo tiene los empleados de la empresa que le paso en el id
        empleados = []
        for empleado in lista_empleados_filtrados:
            empleados.append({
                'id': empleado.trabajador.user.id,
                'username': empleado.trabajador.user.username,  
                'email': empleado.trabajador.user.email,
                'is_active': empleado.trabajador.user.is_active,
                'date_joined': empleado.trabajador.user.date_joined,
            })
        return Response(empleados, status=status.HTTP_200_OK)


class TraerAreasTrabajoEmpresaView(APIView):
    def get(self,request):
        id_empresa = request.query_params.get('empresa_id')
        lista_areas_trabajo = AreaTrabajo.objects.filter(empresa=id_empresa).select_related('empresa')
        areas_trabajo = []
        quitar_duplicados = []
        for area in lista_areas_trabajo:
            if area.nombre_area not in quitar_duplicados:
                areas_trabajo.append({
                    'id': area.id,
                    'nombre_area': area.nombre_area
                })
                quitar_duplicados.append(area.nombre_area)
        return Response(areas_trabajo, status=status.HTTP_200_OK)

# Esta función obtiene el id y el nombre de la empresa que tenga relación con el usuario que inicia sesión (sea empleado o propietario)
class ObtenerIDEmpresaView(APIView):
    def get(self,request):
        id_empleado = request.query_params.get('empresa_id') # Obtiene el id del empleado para relacionarlo con la empresa
        id_propietario = request.query_params.get('propietario_id') # Obtiene el id del propietario para relacionarlo con la empresa
        # Si se obtuvo un id_empleado o id_propietario hace la busqueda en la BD para obtener el id de la empresa
        if id_empleado:
            empleado = Empleados.objects.filter(trabajador=id_empleado).first()
            return Response({'id_empresa':empleado.empresa.id},status=status.HTTP_200_OK)
        elif id_propietario:
            propietario = Empresa.objects.filter(propietario=id_propietario).first()
            return Response({'id_empresa':propietario.id,'nombre_empresa':propietario.nombre_empresa},status=status.HTTP_200_OK)
        # Si no se obtuvo ninguno envía un error
        else:
            return Response({'error':'No se encontró el id de la empresa'},status=status.HTTP_404_NOT_FOUND)

        
class TraerAreasTrabajoUsuarioEmpresaView(APIView):
    def get(self,request):
        id_empresa = request.query_params.get('empresa_id')
        lista_areas_trabajo = AreaTrabajoUsuarios.objects.filter(empresa=id_empresa).select_related('empresa')
        areas_trabajo = []
        for area in lista_areas_trabajo:
            areas_trabajo.append({
                'id': area.id,
                'nombre_area': area.area_trabajo.nombre_area,
                'usuario': area.usuario.user.username
            })
        return Response(areas_trabajo, status=status.HTTP_200_OK)


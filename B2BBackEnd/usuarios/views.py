from rest_framework.views import APIView # para los metodos de las vistas
from django.contrib.auth.models import User #modelo user de django
from rest_framework import status #status backend codigo (200-400, etc)
from rest_framework.response import Response #lo que devuelve el backend
from .serializers import RolSerializers 
from .serializers import UsuariosSerializer 
from .models import Roles, Usuarios 
from django.contrib.auth import authenticate #autenticacion para el login
from rest_framework_simplejwt.tokens import RefreshToken #token
from rest_framework.generics import ListCreateAPIView #get y post
import re #expresiones regulares


# Create your views here.
class RegistroView(APIView):
    def post(self,request):
        nombre_usuario = request.data.get("username")
        clave_usuario = request.data.get("password")
        correo_usuario = request.data.get("email")
        cedula_usuario = request.data.get("cedula")
        
        #Usamos expresiones regulares para validar la informacion que se envia a la base de datos. 
        nombre_usuario_regex = r'^[a-zA-Z\s]+$'
        correo_usuario_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        cedula_usuario_regex = r'^[0-9]+$'

        if not re.match(nombre_usuario_regex,nombre_usuario):
            return Response({"error":'No cumple los requisitos en nombre',},status=status.HTTP_400_BAD_REQUEST)
        if not re.match(correo_usuario_regex,correo_usuario):
            return Response({"error":'No cumple los requisitos en correo',},status=status.HTTP_400_BAD_REQUEST)
        if not re.match(cedula_usuario_regex,cedula_usuario):
            return Response({"error":'No cumple los requisitos en cedula',},status=status.HTTP_400_BAD_REQUEST)
        
        
        
        if User.objects.filter(username=nombre_usuario).exists():
            return Response({"error":'El usuario ya existe',},status=status.HTTP_400_BAD_REQUEST)
        else:
            usuario = User.objects.create_user(username=nombre_usuario,password=clave_usuario,email=correo_usuario)
            Usuarios.objects.create(user=usuario,cedula_usuario=cedula_usuario) #El cedula_usuario de la izq es de la definicion de la tabla y el de la derecha la variable de la linea 20
            return Response({"success":'Usuario creado',},status=status.HTTP_201_CREATED)
        
        
class LoginView(APIView):
    def post(self,request):
        nombre_usuario = request.data.get("username")
        clave_usuario = request.data.get("password")
        
        #quita el cifrado de la contraseña para saber si es correcta
        datos_autenticacion = authenticate(request,username=nombre_usuario,password=clave_usuario)
        
        if datos_autenticacion is not None:
            refresh = RefreshToken.for_user(datos_autenticacion)
            return Response({"success":'bienvenido',"id":datos_autenticacion.id, "correo": datos_autenticacion.email,"token_acceso": str(refresh.access_token),"token_refresco":str(refresh),},status=status.HTTP_200_OK)
        
        else:
            return Response({"error":'credenciales invalidas',},status=status.HTTP_400_BAD_REQUEST)    
        

# Hacemos una vista que nos permite listar todos los usuarios.
class UsuariosView(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UsuariosSerializer
    
    
class AsignarRolesView(ListCreateAPIView):
    queryset = Roles.objects.all()
    serializer_class = RolSerializers

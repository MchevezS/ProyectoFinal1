from django.shortcuts import render
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.response import Response
from .models import Usuarios
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
# Create your views here.

class RegistroView(APIView):
    def post(self,request):
        nombre_usuario = request.data.get("username")
        clave_usuario = request.data.get("password")
        correo_usuario = request.data.get("email")
        cedula_usuario = request.data.get("cedula")
        
        
        if User.objects.filter(username=nombre_usuario).exists():
            return Response({"error":'El usuario ya existe',},status=status.HTTP_400_BAD_REQUEST)
        else:
            usuario = User.objects.create_user(username=nombre_usuario,password=clave_usuario,email=correo_usuario)
            Usuarios.objects.create(user=usuario,cedula_usuario=cedula_usuario)
            return Response({"success":'Usuario creado',},status=status.HTTP_201_CREATED)
        
        
class LoginView(APIView):
    def post(self,request):
        nombre_usuario = request.data.get("username")
        clave_usuario = request.data.get("password")
        
        datos_autenticacion = authenticate(request,username=nombre_usuario,password=clave_usuario)
        
        if datos_autenticacion is not None:
            refresh = RefreshToken.for_user(datos_autenticacion)
            return Response({"success":'bienvenido', "correo": datos_autenticacion.email,"token_acceso": str(refresh.access_token),"token_refresco":str(refresh),},status=status.HTTP_200_OK)
        
        else:
            return Response({"error":'credenciales invalidas',},status=status.HTTP_400_BAD_REQUEST)    
from rest_framework.views import APIView # para los metodos de las vistas
from django.contrib.auth.models import User #modelo user de django
from rest_framework import status #status backend codigo (200-400, etc)
from rest_framework.response import Response #lo que devuelve el backend
from .serializers import UsuariosSerializer 
from .models import Usuarios
from django.contrib.auth import authenticate #autenticacion para el login
from rest_framework_simplejwt.tokens import RefreshToken #token
from rest_framework.generics import ListCreateAPIView #get y post
import re #expresiones regulares
import random
import string
from empresas.models import AreaTrabajoUsuarios
 
from mailersend import emails #importacion de la api mailersend

# api token de mailersend 
correo = emails.NewEmail("mlsn.fe3c04fac13c0e6f5f7e85e0e65dd186c8f61706d8c5bcf0c1042855144b387b")


# Create your views here.
class RegistroView(APIView):
    def post(self,request):
        nombre_usuario = request.data.get("username")
        clave_usuario = request.data.get("password")
        correo_usuario = request.data.get("email")
        cedula_usuario = request.data.get("cedula")
        
        #Usamos expresiones regulares para validar la informacion que se envia a la base de datos. 
        nombre_usuario_regex = r'^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$'
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

        try:
         area_trabajo = AreaTrabajoUsuarios.objects.get(usuario_id=datos_autenticacion.id)
        except:
         area_trabajo = None
        

        if datos_autenticacion is not None:
            refresh = RefreshToken.for_user(datos_autenticacion)
            rol= Usuarios.objects.get(user_id=datos_autenticacion.id)
            if area_trabajo is None:
                return Response({"success":'bienvenido','area':'Propietario',"id":datos_autenticacion.id,"rol":rol.rol,
                             "nombre": datos_autenticacion.username, "correo": datos_autenticacion.email,
                             "token_acceso": str(refresh.access_token),"token_refresco":str(refresh),},status=status.HTTP_200_OK)
            elif area_trabajo is not None:
                return Response({"success":'bienvenido','area':area_trabajo.area_trabajo.nombre_area,"id":datos_autenticacion.id,"rol":rol.rol,
                             "nombre": datos_autenticacion.username, "correo": datos_autenticacion.email,
                             "token_acceso": str(refresh.access_token),"token_refresco":str(refresh),},status=status.HTTP_200_OK)
            else:
                return Response({'error':'Credenciales incorrectas'},status=status.HTTP_400_BAD_REQUEST)
        

# Hacemos una vista que nos permite listar todos los usuarios.
class UsuariosView(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UsuariosSerializer
    
    
class RegistroEmpleadoView(APIView):
    def post(self,request):
        nombre_usuario = request.data.get("username")
        correo_usuario = request.data.get("email")
        cedula_usuario = request.data.get("cedula")
        rol_usuario= request.data.get("rol")
        clave_usuario = ''.join(random.choices(string.ascii_letters + string.digits, k=8))
        
           
        #Usamos expresiones regulares para validar la informacion que se envia a la base de datos. 
        nombre_usuario_regex = r'^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$'
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
            usuario_creado = User.objects.create_user(username=nombre_usuario,password=clave_usuario,email=correo_usuario)
            Usuarios.objects.create(user=usuario_creado,cedula_usuario=cedula_usuario,rol=rol_usuario) #El cedula_usuario de la izq es de la definicion de la tabla y el de la derecha la variable de la linea 20
            enviar_correo(nombre_usuario,correo_usuario,clave_usuario) # Se usa la funcion enviar correo y se le pasa por argumento el nombre de usuario y el correo usuario que se envian en la peticion, la contraseña se genera de manera automatica.
            return Response({"success":'Usuario creado',"id":usuario_creado.id,},status=status.HTTP_201_CREATED)
        
        
    # Damos por parametro el nombre del usuario que se esta registrando, el correo al que le vayan a llegar las credenciales
    # y la contraseña
def enviar_correo(nombre_usuario,correo_usuario,clave_usuario):
    mail_body={}
    
    #REMITENTE:
    mail_from={
        "name":"B2B",
        "email":"MS_A4LSQ5@trial-neqvygm8qn840p7w.mlsender.net"
    }
    recipient=[
        {
            "name":nombre_usuario,
            "email":correo_usuario
        }
    ]
    # Formato del correo
    correo.set_mail_from(mail_from,mail_body)
    correo.set_mail_to(recipient,mail_body)
    correo.set_subject("credenciales para la empresa", mail_body)
    correo.set_html_content(f"<h1>Hola {nombre_usuario} esta es tu contraseña {clave_usuario}</h1>", mail_body)
    correo.set_plaintext_content("B2B",mail_body)
    
    # Estructura de la respuesta de la api
    try:
        response = correo.send(mail_body)
        if response == 202:
            print("Correo enviado con éxito.")
        else:
            print("Error al enviar el correo:", response)
        
        return response

    except Exception:
        return None


# funcion para actualizar el estado de un unico usuario a traves del patch
class ActivarDescactivarUsuarioView(APIView):
    def patch(self,request):
        nombre_usuario = request.data.get("username") # por medio de username eligimos a quien le vamos a cambiar el estado
        
        usuario = User.objects.get(username=nombre_usuario) # buscamos en la base de datos al usuario que elegimos

        
        if usuario.is_active:
            usuario.is_active=False
            usuario.save()
            return Response({'message': 'Usuario desactivado'}, status=status.HTTP_200_OK)
        
        else:
            usuario.is_active=True
            usuario.save()
            return Response({'message': 'Usuario activado'}, status=status.HTTP_200_OK)

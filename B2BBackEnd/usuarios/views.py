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
from rest_framework.permissions import AllowAny
from empresas.models import AreaTrabajoUsuarios,Empleados
from mailersend import emails #importacion de la api mailersend

# api token de mailersend 
correo = emails.NewEmail("mlsn.fe3c04fac13c0e6f5f7e85e0e65dd186c8f61706d8c5bcf0c1042855144b387b")


# Create your views here.
class RegistroView(APIView):
    permission_classes = [AllowAny]
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
    permission_classes = [AllowAny]
    def post(self,request):
        nombre_usuario = request.data.get("username")
        clave_usuario = request.data.get("password")
        
        #quita el cifrado de la contraseña para saber si es correcta
        datos_autenticacion = authenticate(request,username=nombre_usuario,password=clave_usuario)

        try:
         area_trabajo = AreaTrabajoUsuarios.objects.get(usuario_id=datos_autenticacion.id)
         id_empresa = Empleados.objects.get(trabajador_id=datos_autenticacion.id)
        except:
         area_trabajo = None
        

        if datos_autenticacion is not None:
            refresh = RefreshToken.for_user(datos_autenticacion)
            rol= Usuarios.objects.get(user_id=datos_autenticacion.id)
            if area_trabajo is None:
                return Response({"success":'bienvenido','area':'No tiene area asignada',"id":datos_autenticacion.id,"rol":rol.rol,
                             "nombre": datos_autenticacion.username, 
                             "token_acceso": str(refresh.access_token),},status=status.HTTP_200_OK)
            elif area_trabajo is not None:
                return Response({"success":'bienvenido','area':area_trabajo.area_trabajo.nombre_area,"id":datos_autenticacion.id,"rol":rol.rol,
                             "nombre": datos_autenticacion.username,'id_empresa':id_empresa.empresa_id,
                             "token_acceso": str(refresh.access_token),},status=status.HTTP_200_OK)
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
    correo.set_subject(f"Hola {nombre_usuario} bienvenido(a), estas son tus crendenciales", mail_body)
    correo.set_html_content(f"""
<html>
    <head>
        <style>
            body {{
                font-family: Arial, sans-serif;
                background-color: #f4f7fc;
                color: #333;
                margin: 0;
                padding: 0;
            }}
            .container {{
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }}
            h1 {{
                color: #4CAF50;
                text-align: center;
            }}
            p {{
                font-size: 16px;
                line-height: 1.5;
                text-align: center;
            }}
            .credentials {{
                background-color: #f1f1f1;
                padding: 15px;
                border-radius: 4px;
                font-weight: bold;
                color: #2c3e50;
                text-align: center;
            }}
            .footer {{
                text-align: center;
                font-size: 12px;
                color: #777;
                margin-top: 20px;
            }}
            .footer a {{
                color: #4CAF50;
                text-decoration: none;
            }}
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Hola {nombre_usuario},</h1>
            <p>Te damos la bienvenida a nuestra plataforma. Aquí están tus credenciales de acceso:</p>
            <div class="credentials">
                <p><strong>Nombre de usuario:</strong> {nombre_usuario}</p>
                <p><strong>Contraseña:</strong> {clave_usuario}</p>
            </div>
            <p>Por favor, no compartas esta información con terceros.</p>
        </div>
    </body>
</html>
""", mail_body)

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

class CambiarClaveView(APIView):
    def patch(self,request):
        nombre_usuario = request.data.get('username')
        clave_usuario = request.data.get('password')

        usuario = authenticate(request,username=nombre_usuario,password=clave_usuario)

        if usuario is not None:
            clave_nueva = request.data.get('clave_nueva')
            usuario.set_password(clave_nueva)
            usuario.save()
            return Response({'status':'200'}, status=status.HTTP_200_OK)
        else:
            return Response({'status': '400'}, status=status.HTTP_400_BAD_REQUEST)
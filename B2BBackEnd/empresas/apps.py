# Importa la clase AppConfig desde el módulo django.apps. Esta clase
# se utiliza para configurar aplicaciones dentro de un proyecto Django.
from django.apps import AppConfig

# Define una clase la cual será utilizada para 
# configurar la aplicación 'empresas' dentro del proyecto.
class EmpresasConfig(AppConfig):
    
    # Establece el tipo de campo por defecto para las claves primarias
    # en los modelos de esta aplicación.
    # 'BigAutoField' es un campo de auto-incremento más grande que el 'AutoField'
    # predeterminado.
    default_auto_field = 'django.db.models.BigAutoField'
    
    # Especifica el nombre de la aplicación, para que  Django
    # pueda identificarla.
    name = 'empresas'

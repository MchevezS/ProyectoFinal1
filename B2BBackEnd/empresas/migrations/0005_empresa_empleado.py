# Generated by Django 5.1.2 on 2024-12-02 06:00

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('empresas', '0004_remove_areatrabajo_responsable_del_area_and_more'),
        ('usuarios', '0005_usuarios_rol_delete_usuarioempresas'),
    ]

    operations = [
        migrations.AddField(
            model_name='empresa',
            name='empleado',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='empleado', to='usuarios.usuarios'),
            preserve_default=False,
        ),
    ]

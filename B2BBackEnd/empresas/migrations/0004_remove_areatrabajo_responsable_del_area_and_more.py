# Generated by Django 5.1.2 on 2024-11-24 16:14

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('empresas', '0003_alter_areatrabajousuarios_unique_together_and_more'),
        ('usuarios', '0002_roles'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='areatrabajo',
            name='responsable_del_area',
        ),
        migrations.AlterField(
            model_name='areatrabajousuarios',
            name='area_trabajo',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='empresas.areatrabajo'),
        ),
        migrations.AlterField(
            model_name='areatrabajousuarios',
            name='usuario',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='usuarios.usuarios'),
        ),
    ]

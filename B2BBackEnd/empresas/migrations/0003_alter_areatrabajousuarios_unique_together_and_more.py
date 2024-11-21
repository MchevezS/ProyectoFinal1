# Generated by Django 5.1.3 on 2024-11-21 14:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('empresas', '0002_areatrabajousuarios'),
        ('usuarios', '0002_roles'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='areatrabajousuarios',
            unique_together={('usuario', 'area_trabajo')},
        ),
        migrations.RemoveField(
            model_name='areatrabajousuarios',
            name='empresa',
        ),
        migrations.RemoveField(
            model_name='areatrabajousuarios',
            name='fecha_asignacion',
        ),
    ]

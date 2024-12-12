# Generated by Django 5.1.2 on 2024-12-02 06:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usuarios', '0004_alter_usuarioempresas_rol'),
    ]

    operations = [
        migrations.AddField(
            model_name='usuarios',
            name='rol',
            field=models.CharField(choices=[('usuario', 'USUARIO'), ('trabajador', 'TRABAJADOR'), ('propietario', 'PROPIETARIO'), ('recursos_humanos', 'RECURSOS_HUMANOS')], default='usuario', max_length=30),
        ),
        migrations.DeleteModel(
            name='UsuarioEmpresas',
        ),
    ]

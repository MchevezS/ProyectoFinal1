# Generated by Django 5.1.2 on 2024-12-18 04:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usuarios', '0006_alter_usuarios_rol'),
    ]

    operations = [
        migrations.AddField(
            model_name='usuarios',
            name='imagen_perfil',
            field=models.CharField(default='https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png', max_length=100),
        ),
    ]

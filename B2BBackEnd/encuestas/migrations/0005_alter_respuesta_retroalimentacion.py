# Generated by Django 5.1.2 on 2024-11-28 04:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('encuestas', '0004_respuesta_retroalimentacion'),
    ]

    operations = [
        migrations.AlterField(
            model_name='respuesta',
            name='retroalimentacion',
            field=models.TextField(blank=True, null=True),
        ),
    ]

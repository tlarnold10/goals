# Generated by Django 2.1.4 on 2021-01-07 19:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mygoals', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Sugar',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('grams', models.IntegerField()),
                ('date', models.DateField()),
            ],
        ),
    ]

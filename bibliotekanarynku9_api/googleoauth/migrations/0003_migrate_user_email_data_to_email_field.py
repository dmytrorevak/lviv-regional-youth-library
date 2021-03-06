# -*- coding: utf-8 -*-
# Generated by Django 1.11.29 on 2020-07-22 12:43
from __future__ import unicode_literals

from django.db import migrations


def set_email_field_value(apps, _):
    """
    Set the default value for email field.
    This email value equals to current user's email value.
    """

    GoogleOAuthSession = apps.get_model("googleoauth", "GoogleOAuthSession")
    for session in GoogleOAuthSession.objects.all():
        session.email = session.user.email
        session.save()


class Migration(migrations.Migration):

    dependencies = [
        ('googleoauth', '0002_add_email_field_change_unique_together_to_email_service'),
    ]

    operations = [
        migrations.RunPython(set_email_field_value),
    ]

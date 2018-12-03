"""
Module for set up the default Celery configuration and
integrate Celery with bibliotekanarynku9_api application.
"""

from __future__ import absolute_import
import os
from django.conf import settings
from celery import Celery


os.environ.setdefault(
    'DJANGO_SETTINGS_MODULE',
    'bibliotekanarynku9_api.settings'
)
app = Celery('bibliotekanarynku9')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()

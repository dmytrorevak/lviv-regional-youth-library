"""
Module that contains all Announcement signals that can be used through entire
application.
"""

import django.dispatch

ANNOUNCEMENT_TRANSLATION_CREATED = django.dispatch.Signal(
    providing_args=["user", "announcement_translation"]
)

ANNOUNCEMENT_TRANSLATION_DELETED = django.dispatch.Signal(
    providing_args=["user", "announcement_translation", "google_business_post_name"]
)
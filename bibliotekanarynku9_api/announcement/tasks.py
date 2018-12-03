"""Module that describes the Announcement app tasks."""

import datetime
from celery import crontab
from announcement.models import Announcement
from utils.logger import LOGGER
from celery import task

CURRENT_DATE = datetime.datetime.today()

# @app.on_after_configure.connect
# def sersfd(sender, **kwargs):
#     sender.add_periodic_task(10.0, remove_outdate_announcements.s(), name='test task')

@task(name='bibliotekanarynku9_api.tasks.add')
def remove_outdate_announcements():
    """Task that gets the old announcements and deletes they from db."""

    result = {'removed': False}
    outdated_announs = Announcement.get_filtered(start_at__lt=CURRENT_DATE)

    if outdated_announs:
        outdated_announs.delete()
        result['removed'] = True
        LOGGER.info(f'Remove outdated announcements for {CURRENT_DATE} date.')

    return result

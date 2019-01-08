"""Script for deleting the outdated announcements from the database."""


def clean_announcements_command():
    """Function for deleting the outdated announcements from db."""

    # Command imports
    import datetime
    from announcement.models import Announcement
    from utils.logger import LOGGER

    # Command logic
    date = datetime.datetime.today()
    outdated_announcements = Announcement.objects.filter(start_at__lt=date)
    if outdated_announcements:
        announcements_length = len(outdated_announcements)
        outdated_announcements.delete()
        LOGGER.info(
            f'Removed the {announcements_length} outdated announcements '
            f'for {date} date.'
        )
    else:
        LOGGER.info(
            f'There are not removed outdated announcements '
            f'for {date} date.'
        )
    return True

"""
Script for getting the daily requests amount from the redis and putting it
to the postgres database.
"""

import datetime

def grab_daily_statistic_command():
    """Function for grabbing the daily statistic."""

    # Command imports
    from statistic.models import DailyRequestStatistic
    from utils.handlers import STATISTIC_HANDLER
    from utils.logger import LOGGER

    # Command logic
    date = datetime.datetime.today()
    daily_ips = STATISTIC_HANDLER.get_daily_ips_set()
    daily_statistic = DailyRequestStatistic.create({
        'requests_amount':len(daily_ips)
    })
    if daily_statistic:
        STATISTIC_HANDLER.remove_daily_ips_set()
        LOGGER.info(f'Statistic for the {date} successfully saved.')
    else:
        LOGGER.error(f'Error during saving the daily statistic at {date}')

    return True

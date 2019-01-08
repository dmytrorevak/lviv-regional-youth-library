#!/usr/bin/env python

"""
Script for general processing of the project helpfull functionality.
Module for set up project environment and running the user commands.
"""


import os
import sys
import django

from announcement_cleaner import clean_announcements_command
from daily_statistic_grabber import grab_daily_statistic_command


PROJECT_SETTINGS = 'bibliotekanarynku9_api.settings'
COMMANDS = {
    'clean_announcements' : clean_announcements_command,
    'grab_daily_statistic': grab_daily_statistic_command
}

if __name__ == "__main__":

    # Set up Django settings
    try:
        PROJECT_PATH = sys.argv[1]
        USER_COMMAND = sys.argv[2]
    except IndexError:
        sys.exit(f'ERROR: Project path and command arguments required')

    try:
        sys.path.append(PROJECT_PATH)
        os.environ.setdefault(
            'DJANGO_SETTINGS_MODULE', PROJECT_SETTINGS
        )
        django.setup()
    except ModuleNotFoundError:
        sys.exit(f'ERROR: No module found for the path - {PROJECT_PATH}')

    # Proccess the command
    COMMAND = COMMANDS.get(USER_COMMAND)
    if not COMMAND:
        sys.exit(f'ERROR: No such command - {USER_COMMAND}')

    COMMAND_ARGS = sys.argv[3:]
    try:
        IS_SUCCESS = COMMAND(*COMMAND_ARGS)
    except TypeError:
        sys.exit('ERROR: Inappropriate arguments accepted')

    if not IS_SUCCESS:
        sys.exit('ERROR: Command processing failed')

    sys.exit('SUCCESS: Command successfully processed')

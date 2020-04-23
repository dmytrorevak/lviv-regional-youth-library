"""
Module that describes the modes for store Google My Business  accounts.
Each user of the library site could have only one Google Mu Business account.
This data model store the library user's data with relation to Google My Business account's data.
"""

from django.db import models

from customuser.models import CustomUser
from utils.abstract_model import AbstractModel
from utils.logger import LOGGER


class GoogleMyBusinessAccount(AbstractModel):
    """
    Model that represents the Google My Business account data.
    """

    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    service_name = models.CharField(max_length=80)
    account_name = models.CharField(max_length=80)

    @classmethod
    def get_account_service_name(cls, user):
        """
        Method that retrieves the Google My Business account's service name
        for the certain user.
        :param user: CustomUser instance that represent current session user.
        :return: str that represents the Google My Business account's service name.
        """
        try:
            google_my_business_account = cls.objects.get(user=user)
            return google_my_business_account.service_name
        except cls.DoesNotExist as err:
            LOGGER.error(
                f"Cannot retrieve the service name for Google My Business account. "
                f"User: {user} Exception: {err}"
            )
            return ""

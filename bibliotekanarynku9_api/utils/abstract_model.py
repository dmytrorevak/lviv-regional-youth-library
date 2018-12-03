"""This module implements abstract class for most of project models."""

from django.db import models, IntegrityError
from utils.logger import LOGGER


class AbstractModel(models.Model):
    """Model that describes abstract model entity."""

    class Meta:
        abstract = True

    @classmethod
    def get_by_id(cls, obj_id):
        """Retrieve the model instance according to the accepted id."""

        try:
            obj = cls.objects.get(id=obj_id)
            return obj
        except cls.DoesNotExist as err:
            LOGGER.error(f'Class instance of {cls.__name__} '
                         f'with id={obj_id} doesnt exist. {err}')

    @classmethod
    def create(cls, data):
        """Create the class model instance according to the accepted data."""

        try:
            return cls.objects.create(**data)
        except IntegrityError:
            LOGGER.error(f'Fail to create object of {cls.__name__}'
                         f'with following data: {data}')

    @classmethod
    def delete_by_id(cls, obj_id):
        """Delete the model instance according to the accepted id."""

        try:
            obj = cls.objects.get(id=obj_id)
            obj.delete()
            return True
        except (cls.DoesNotExist, AttributeError) as err:
            LOGGER.error(f'Class instance of {cls.__name__} '
                         f'with id={obj_id} cannot be deleted. {err}')

    def update(self, data):
        """Update the class model instance according to the accepted data."""

        for field, value in data.items():
            if hasattr(self, field):
                setattr(self, field, value)

        try:
            self.save()
            return self
        except IntegrityError:
            LOGGER.error(f'Fail to object {self} with following data: {data}')

    @classmethod
    def get_filtered(cls, **kwargs):
        """Returns the filtered queryset of current Model class."""

        filtered_objs = cls.objects.filter(**kwargs)
        return filtered_objs if filtered_objs else None

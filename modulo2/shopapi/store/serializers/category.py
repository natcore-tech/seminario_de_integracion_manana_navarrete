# store/serializers/category.py
from rest_framework import serializers
from django.utils.text import slugify
from store.models import Category


class CategorySerializer(serializers.ModelSerializer):
    """
    El campo total_products se agrega en la Etapa 4
    cuando el modelo Product ya existe.
    Incluirlo antes provoca AttributeError: 'Category' has no attribute 'products'.
    """

    class Meta:
        model  = Category
        fields = [
            'id', 'name', 'slug', 'description',
            'is_active', 'created_at',
        ]
        read_only_fields = ['id', 'created_at']

    def validate_slug(self, value):
        return slugify(value)

    def validate_name(self, value):
        qs = Category.objects.filter(name__iexact=value)
        if self.instance:
            qs = qs.exclude(pk=self.instance.pk)
        if qs.exists():
            raise serializers.ValidationError('A category with this name already exists.')
        return value
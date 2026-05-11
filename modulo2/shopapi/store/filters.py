# store/filters.py
import django_filters
from store.models import Category


class CategoryFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model  = Category
        fields = ['is_active']
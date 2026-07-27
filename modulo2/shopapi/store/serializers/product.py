# store/serializers/product.py
from rest_framework import serializers
from store.models import Product
from store.serializers.category import CategorySerializer


class ProductSummarySerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()   # ← nuevo

    class Meta:
        model  = Product
        fields = ['id', 'name', 'price', 'stock', 'is_active', 'image_url']

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image:
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return None


class ProductSerializer(serializers.ModelSerializer):
    category       = CategorySerializer(read_only=True)
    category_id    = serializers.PrimaryKeyRelatedField(
        source='category',
        write_only=True,
        queryset=Product.objects.none(),
    )
    price_with_tax = serializers.SerializerMethodField()
    in_stock       = serializers.SerializerMethodField()
    image_url      = serializers.SerializerMethodField()   # ← nuevo

    class Meta:
        model  = Product
        fields = [
            'id', 'name', 'description',
            'price', 'price_with_tax',
            'stock', 'in_stock', 'is_active',
            'category', 'category_id',
            'image', 'image_url',             # ← nuevo
            'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
        extra_kwargs = {'image': {'required': False, 'allow_null': True}}

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        from store.models import Category
        self.fields['category_id'].queryset = Category.objects.filter(is_active=True)

    def get_price_with_tax(self, obj):
        return obj.price_with_tax

    def get_in_stock(self, obj):
        return obj.in_stock

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image:
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return None

    def validate_price(self, value):
        if value <= 0:
            raise serializers.ValidationError('Price must be greater than 0.')
        return value

    def validate_stock(self, value):
        if value < 0:
            raise serializers.ValidationError('Stock cannot be negative.')
        return value

    def validate_image(self, value):
        max_size    = 2 * 1024 * 1024  # 2 MB
        valid_types = ['image/jpeg', 'image/png', 'image/webp']
        if value and value.size > max_size:
            raise serializers.ValidationError('Image size must not exceed 2 MB.')
        if value and value.content_type not in valid_types:
            raise serializers.ValidationError('Only JPEG, PNG, and WebP images are allowed.')
        return value
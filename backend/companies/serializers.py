from rest_framework import serializers
from .models import Company


class CompanySerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    user_id = serializers.IntegerField(source="user.id", read_only=True)

    class Meta:
        model = Company
        fields = ("id", "user", "user_id", "name", "description", "website", "location", "created_at")
        read_only_fields = ("user", "created_at")

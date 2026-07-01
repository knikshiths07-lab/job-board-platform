from django.contrib.auth.models import User
from rest_framework import serializers
from companies.serializers import CompanySerializer


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    email = serializers.EmailField(required=True)

    class Meta:
        model = User
        fields = ("id", "username", "email", "password", "first_name", "last_name")

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with that email already exists.")
        return value

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email", "first_name", "last_name")


class ProfileSerializer(serializers.ModelSerializer):
    companies = CompanySerializer(many=True, read_only=True)
    application_count = serializers.IntegerField(source="application_set.count", read_only=True)
    is_employer = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "is_employer",
            "companies",
            "application_count",
        )

    def get_is_employer(self, obj):
        return obj.companies.exists()

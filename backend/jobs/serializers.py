from rest_framework import serializers
from .models import Job
from companies.models import Company


class JobSerializer(serializers.ModelSerializer):
    company = serializers.StringRelatedField(read_only=True)
    company_id = serializers.PrimaryKeyRelatedField(
        queryset=Company.objects.all(), source="company", write_only=True
    )

    class Meta:
        model = Job
        fields = (
            "id",
            "company",
            "company_id",
            "title",
            "description",
            "location",
            "salary",
            "job_type",
            "created_at",
        )
        read_only_fields = ("company", "created_at")

    def validate_company(self, value):
        request = self.context.get("request")
        if request and value.user != request.user:
            raise serializers.ValidationError("You can only create jobs for your own companies.")
        return value

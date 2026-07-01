from rest_framework import serializers
from .models import Application
from jobs.models import Job


class ApplicationSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    user_id = serializers.IntegerField(source="user.id", read_only=True)
    job_title = serializers.CharField(source="job.title", read_only=True)
    job_id = serializers.PrimaryKeyRelatedField(
        queryset=Job.objects.all(), source="job", write_only=True
    )

    class Meta:
        model = Application
        fields = (
            "id",
            "user",
            "user_id",
            "job_title",
            "job_id",
            "resume",
            "cover_letter",
            "status",
            "applied_at",
        )
        read_only_fields = ("user", "job_title", "status", "applied_at")

    def validate(self, attrs):
        request = self.context.get("request")
        job = attrs.get("job")
        if request and Application.objects.filter(user=request.user, job=job).exists():
            raise serializers.ValidationError("You have already applied to this job.")
        return attrs

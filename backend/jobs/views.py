from rest_framework import viewsets, permissions, filters
from .models import Job
from .serializers import JobSerializer
from .permissions import IsJobOwnerOrReadOnly


class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all().order_by("-created_at")
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsJobOwnerOrReadOnly]
    filter_backends = [filters.SearchFilter]
    search_fields = ["title", "location", "description", "company__name"]

    def perform_create(self, serializer):
        serializer.save(company=serializer.validated_data["company"])

    def get_queryset(self):
        queryset = super().get_queryset()
        company_id = self.request.query_params.get("company")
        job_type = self.request.query_params.get("job_type")
        location = self.request.query_params.get("location")
        search = self.request.query_params.get("search")
        if company_id:
            queryset = queryset.filter(company_id=company_id)
        if job_type:
            queryset = queryset.filter(job_type__iexact=job_type)
        if location:
            queryset = queryset.filter(location__icontains=location)
        if search:
            queryset = queryset.filter(
                title__icontains=search
            )
        return queryset

from rest_framework import viewsets, permissions, filters
from .models import Company
from .serializers import CompanySerializer
from .permissions import IsOwnerOrReadOnly


class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all().order_by("-created_at")
    serializer_class = CompanySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    filter_backends = [filters.SearchFilter]
    search_fields = ["name", "location", "description"]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        queryset = super().get_queryset()
        user_id = self.request.query_params.get("user")
        if user_id:
            queryset = queryset.filter(user_id=user_id)
        return queryset

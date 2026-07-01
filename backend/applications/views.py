from rest_framework import viewsets, permissions
from .models import Application
from .serializers import ApplicationSerializer


class ApplicationViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all().order_by("-applied_at")
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = super().get_queryset()
        user = self.request.user
        if self.request.user.is_authenticated:
            if self.request.query_params.get("employer") == "true":
                queryset = queryset.filter(job__company__user=user)
            else:
                queryset = queryset.filter(user=user)
        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

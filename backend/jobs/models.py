from django.db import models
from companies.models import Company


class Job(models.Model):
    JOB_TYPES = [
        ("Full Time", "Full Time"),
        ("Part Time", "Part Time"),
        ("Internship", "Internship"),
        ("Remote", "Remote"),
    ]

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name="jobs"
    )
    title = models.CharField(max_length=255)
    description = models.TextField()
    location = models.CharField(max_length=255)
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    job_type = models.CharField(max_length=20, choices=JOB_TYPES)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
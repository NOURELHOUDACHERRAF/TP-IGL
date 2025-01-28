from rest_framework import serializers
from .models import MedicalRecord

class MedicalRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalRecord
        fields = ['patient_id', 'exam_name', 'result', 'reference_value', 'date', 'doctor_name']
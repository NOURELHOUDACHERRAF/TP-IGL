from django.contrib import admin
from .models import MedicalRecord


from .models import Users, Patients, Infermier, Radiologue ,Laboratin,Medecin,Pharmacien,Soin

admin.site.register(Users)
admin.site.register(Patients)
admin.site.register(Infermier)
admin.site.register(Radiologue)
admin.site.register(Laboratin)
admin.site.register(Medecin)
admin.site.register(Pharmacien)
admin.site.register(MedicalRecord)
admin.site.register(Soin)


from django.contrib import admin


from .models import Patient, Consultation, Ordonnance, BilanBiologique, BilanRadiologique,Antecedent

class OrdonnanceInline(admin.TabularInline):
    model = Ordonnance
    extra = 1 

class BilanBiologiqueInline(admin.TabularInline):
    model = BilanBiologique
    extra = 1 
'''
class BilanRadiologiqueInline(admin.TabularInline):
    model = BilanRadiologique
    extra = 1 
'''
class BilanRadiologiqueInline(admin.TabularInline):
    model = BilanRadiologique
    extra = 1

    def get_fields(self, request, obj=None):
        if obj:  # Editing an existing object
            return ['type_examen', 'compte_rendu', 'images']
        else:  # Creating a new object
            return ['type_examen']
class PatientAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'nss']
class AntecedentInline(admin.TabularInline):
    model = Antecedent
    extra = 1

class ConsultationAdmin(admin.ModelAdmin):
    list_display = ['id', 'patient', 'medecin', 'date', 'description', 'diagnostic']
    inlines = [AntecedentInline,OrdonnanceInline, BilanBiologiqueInline, BilanRadiologiqueInline]
    search_fields = ['patient__name', 'medecin', 'description']
    list_filter = ['date', 'medecin']
admin.site.register(Patient)
admin.site.register(Consultation, ConsultationAdmin)
admin.site.register(Ordonnance)
admin.site.register(BilanBiologique)
admin.site.register(BilanRadiologique)
admin.site.register(Antecedent)

from django.contrib import admin
from .models import BilanRadiologique
'''
@admin.register(BilanRadiologique)
class BilanRadiologiqueAdmin(admin.ModelAdmin):
    list_display = ('nom', 'type_examen', 'consultation', 'compte_rendu')
    list_filter = ('type_examen',)
    search_fields = ('nom', 'type_examen', 'compte_rendu')
'''

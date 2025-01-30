from django.db import models

class Patient(models.Model):
    nss = models.CharField(max_length=15, unique=True)  
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    date_naissance = models.DateField()
    adresse = models.TextField()
    telephone = models.CharField(max_length=15)
    mutuelle = models.CharField(max_length=100)
    medecin_traitant = models.CharField(max_length=100)
    personne_a_contacter = models.CharField(max_length=100)

class Consultation(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    medecin = models.CharField(max_length=100)
    date = models.DateTimeField(auto_now_add=True)
    description = models.TextField()
    diagnostic = models.TextField(null=True, blank=True)
    #antecedents = models.TextField()
    # Relation avec BilanRadiologique

class Ordonnance(models.Model):
    consultation = models.ForeignKey(Consultation, on_delete=models.CASCADE)
    medicament = models.CharField(max_length=100)
    dose = models.CharField(max_length=50)
    duree = models.CharField(max_length=50)
class Antecedent(models.Model):
    consultation = models.ForeignKey(Consultation, on_delete=models.CASCADE, related_name="antecedents")
    nom = models.CharField(max_length=200)
    type = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.nom} - {self.type}"
class BilanBiologique(models.Model):
    consultation = models.ForeignKey(Consultation, on_delete=models.CASCADE)
    type_analyse = models.CharField(max_length=100)
    #resultat = models.TextField()



from django.db import models
'''
class BilanRadiologique(models.Model):
    consultation = models.ForeignKey(Consultation, on_delete=models.CASCADE, related_name='bilans_radiologiques')
    type_examen = models.CharField(max_length=255)
    images = models.FileField(upload_to='bilans_radiologiques/', null=True, blank=True)
    compte_rendu = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"Bilan Radiologique - {self.type_examen}"
'''
'''
class BilanRadiologique(models.Model):
    consultation = models.ForeignKey(Consultation, on_delete=models.CASCADE, related_name='bilans_radiologiques')
    type_examen = models.CharField(max_length=100)
    images = models.ImageField(upload_to='uploads/', null=True, blank=True)
    compte_rendu = models.TextField(null=True, blank=True)
'''

'''
class BilanRadiologique(models.Model):
    consultation = models.ForeignKey('Consultation', on_delete=models.CASCADE, related_name='bilans_radiologiques')
    type_examen = models.CharField(max_length=100)
    images = models.ImageField(upload_to='radiologie/', null=True, blank=True)
    compte_rendu = models.TextField(null=True, blank=True)'''

'''
class BilanRadiologique(models.Model):
    consultation = models.ForeignKey('Consultation', on_delete=models.CASCADE, related_name='bilans_radiologiques')
    type_examen = models.CharField(max_length=100)
    images = models.ImageField(upload_to='radiologie/', null=True, blank=True)
    compte_rendu = models.TextField(null=True, blank=True)
'''


from django.db import models

class BilanRadiologique(models.Model):
    consultation = models.ForeignKey(Consultation, on_delete=models.CASCADE, related_name='bilans_radiologiques')
    type_examen = models.CharField(max_length=255)
    images = models.FileField(upload_to='bilans_radiologiques/', null=True, blank=True)
    compte_rendu = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"Bilan Radiologique - {self.type_examen}"
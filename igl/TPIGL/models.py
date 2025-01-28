from django.db import models
import qrcode
from io import BytesIO
from django.core.files import File
from PIL import Image, ImageDraw
from django.core.files.base import ContentFile
import os
from django.conf import settings


# Classe représentant les patients
class Patients(models.Model):
    PatientId = models.IntegerField(primary_key=True)  # Spécifie PatientId comme clé primaire
    nom = models.CharField(max_length=255)  # Nom du patient
    prenom = models.CharField(max_length=255)  # Prénom du patient
    nss = models.CharField(max_length=20, unique=True, null=True, blank=True)  # Numéro de sécurité sociale (unique)
    date_naissance = models.DateField()  # Date de naissance
    adresse = models.CharField(max_length=255)  # Adresse du patient
    tel = models.CharField(max_length=15)  # Numéro de téléphone
    contact = models.CharField(max_length=255)  # Personne à contacter en cas d'urgence
    mutuelle = models.CharField(max_length=255, null=True, blank=True)  # Mutuelle (optionnelle)
    sexe = models.CharField(max_length=10, choices=[('M', 'Masculin'), ('F', 'Féminin')], null=True, blank=True)
    group_sanguin = models.CharField(max_length=3, choices=[('A+', 'A+'), ('A-', 'A-'),('B+', 'B+'), ('B-', 'B-'), ('AB+', 'AB+'), ('AB-', 'AB-'),  ('O+', 'O+'), ('O-', 'O-')], 
                                     null=True, blank=True)

    class Meta:
        db_table = 'patients'  # Nom de la table dans la base de données MySQL

    def __str__(self):
        return f"{self.nom} {self.prenom}"  # Représentation sous forme de chaîne de caractères

# Classe représentant les utilisateurs (médecins, infirmiers, radiologues)
class User(models.Model):
    ROLE_CHOICES = [
        ('Medecin', 'Médecin'),
        ('Infirmier', 'Infirmier'),
        ('Radiologue', 'Radiologue'),
    ]

    id = models.AutoField(primary_key=True)  # ID unique de l'utilisateur
    nom = models.CharField(max_length=255)  # Nom de l'utilisateur
    prenom = models.CharField(max_length=255)  # Prénom de l'utilisateur
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)  # Rôle de l'utilisateur (Médecin, Infirmier, etc.)
    username = models.CharField(max_length=255, unique=True)  # Nom d'utilisateur unique

    class Meta:
        db_table = 'users'  # Nom de la table dans la BDD

    def __str__(self):
        return f"{self.nom} {self.prenom} ({self.role})"  # Représentation sous forme de chaîne de caractères

# Classe représentant un médecin (hérite de la classe User)
class Medecin(models.Model):
    userID = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True, default=1, related_name='medecin_profile') 
    speciality = models.CharField(max_length=255)  # Spécialité du médecin

    class Meta:
        db_table = 'medecin'  # Nom de la table dans la base de données
        verbose_name = 'Médecin'  # Nom au singulier dans l'interface d'administration Django

    def __str__(self):
        return f"{self.userID.nom} {self.userID.prenom} - {self.speciality}"  # Représentation sous forme de chaîne de caractères

# Classe représentant un dossier médical pour un patient
class DossierPatient(models.Model):
    id = models.BigAutoField(primary_key=True)  # ID unique du dossier médical
    patient = models.OneToOneField(Patients, on_delete=models.CASCADE, default=1, blank=True)  # Patient lié à ce dossier
    traitement = models.TextField()  # Description du traitement
    medecins_traitants = models.ManyToManyField('Medecin', related_name='dossiers', blank=True)  # Médecins associés à ce dossier
    antecedents = models.JSONField(default=list, blank=True)  # Liste d'antécédents médicaux (au format JSON)
    qr_code = models.ImageField(upload_to='qr_codes/', blank=True, null=True)  # QR Code associé au dossier

    class Meta:
        db_table = 'dossierpatient'  # Nom de la table dans la base de données

    def __str__(self):
        return f"Dossier de {self.patient.nom} {self.patient.prenom}"  # Représentation sous forme de chaîne de caractères
    
    def save(self, *args, **kwargs):
        """
        Surcharge de la méthode save pour générer automatiquement le QR code
        à la création ou modification du dossier médical.
        """
        super().save(*args, **kwargs)  # Sauvegarde initiale (pour générer l'ID si nécessaire)

        if not self.qr_code:  # Si le QR code n'a pas encore été généré
            self.generate_qr_code()  # Appel à la méthode pour générer le QR code

        super().save(*args, **kwargs)  # Sauvegarde finale avec le QR code généré

    def generate_qr_code(self):
        """
        Méthode pour générer le QR code qui contient des informations sur le dossier du patient
        """
        # Les données à encoder dans le QR code (ID du patient et ID du dossier)
        qr_data = f"Patient: {self.patient.PatientId}\nID: {self.id}"
        print("Génération du QR code pour le dossier:", self.id)

        # Générer le QR code
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        qr.add_data(qr_data)
        qr.make(fit=True)
        
        # Convertir le QR code en image
        img = qr.make_image(fill='black', back_color='white')

        # Sauvegarder l'image dans le champ `qr_code`
        buffer = BytesIO()  # Utiliser un tampon en mémoire pour l'image
        img.save(buffer, format='PNG')  # Sauvegarder l'image dans le tampon
        file_name = f"dossier_{self.id}_qr.png"  # Nom du fichier à sauvegarder
        self.qr_code.save(file_name, File(buffer), save=False)  # Sauvegarder l'image sans effectuer la sauvegarde complète immédiatement

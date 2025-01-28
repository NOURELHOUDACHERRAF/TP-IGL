from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

class CustomUserManager(BaseUserManager):
    def create_user(self, username, password=None, **extra_fields):
        if not username:
            raise ValueError("The Username field is required")
        user = self.model(username=username, **extra_fields)
        user.set_password(password)  # Hash the password
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(username, password, **extra_fields)

class Users(AbstractBaseUser, PermissionsMixin):
    id = models.AutoField(primary_key=True)  # Incremental ID field
    username = models.CharField(max_length=150, unique=True)
    first_name = models.CharField(max_length=30, blank=True, null=True)
    last_name = models.CharField(max_length=30, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    last_login = models.DateTimeField(auto_now=True, blank=True, null=True)  # Add last_login
    is_superuser = models.BooleanField(default=False)  # Ensure this is present

    class UserRole(models.TextChoices):
        MEDECIN = 'medecin', 'Médecin'
        INFERMIER = 'infermier', 'Infirmier'
        RADIOLOGUE = 'radiologue', 'Radiologue'
        LABORATIN = 'laboratin' ,'Laboratin'
        PHARMACIEN = 'pharmacien','Pharmacien'
        PATIENT = 'patient' ,'Patient'
    role = models.CharField(max_length=50, choices=UserRole.choices, blank=True, null=True)

    objects = CustomUserManager()
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    class Meta:
        db_table = 'users'
        managed = True




class Patients(models.Model):
    id = models.OneToOneField('Users', on_delete=models.CASCADE, db_column='id', primary_key=True ,related_name='patient_profile',default=1)

    nss = models.CharField(max_length=255, blank=True, null=True)
    nom = models.CharField(max_length=255, blank=True, null=True)
    prenom = models.CharField(max_length=255, blank=True, null=True)
    date_naissance = models.DateField(blank=True, null=True)
    adresse = models.CharField(max_length=255, blank=True, null=True)
    tel = models.CharField(max_length=20, blank=True, null=True)
    mutuelle = models.CharField(max_length=255, blank=True, null=True)
    contact = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'patients'



class Laboratin(models.Model):
    id = models.OneToOneField('Users', on_delete=models.CASCADE, db_column='id', primary_key=True,related_name='laboratin_profile')

    class Meta:
        managed = True
        db_table = 'laboratin'


class Medecin(models.Model):
    id = models.OneToOneField('Users',on_delete=models.CASCADE, db_column='id', primary_key=True,related_name='medecin_profile')
    speciality = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'medecin'


class Pharmacien(models.Model):
    id = models.OneToOneField('Users', on_delete=models.CASCADE, db_column='id', primary_key=True , related_name='pharmacien_profile')

    class Meta:
        managed = True
        db_table = 'pharmacien'
 



class Infermier(models.Model):
    id = models.OneToOneField(Users, on_delete=models.CASCADE, db_column='id', primary_key=True ,related_name='infermier_profile')

    class Meta:
        managed = True
        db_table = 'infermier'


class Radiologue(models.Model):
    id = models.OneToOneField(Users, on_delete=models.CASCADE, db_column='id', primary_key=True ,related_name='radiologue_profile')

    class Meta:
        managed = True
        db_table = 'radiologue'


class MedicalRecord(models.Model):

    EXAM_CHOICES = [
        ('Glycémie', 'Glycémie'),
        ('Tension artérielle', 'Tension artérielle'),
        ('Cholestérol', 'Cholestérol'),
        ('Hémoglobine', 'Hémoglobine'),
        # Ajoutez d'autres examens ici
    ]


    patient_id = models.IntegerField()  # Lien avec le patient
    exam_name = models.CharField(max_length=100, choices=EXAM_CHOICES)  # Champ avec choix
    result = models.FloatField()  # Résultat de l'examen
    reference_value = models.FloatField()  # Valeur de référence
    date = models.DateField()  # Date de l'examen
    doctor_name = models.ForeignKey(Users, on_delete=models.CASCADE, limit_choices_to={'groups__name': 'Médecins'})

    def __str__(self):
        return f"{self.exam_name} for Patient {self.patient_id} on {self.date}"
    


class Soin(models.Model):
    id = models.AutoField(primary_key=True)
    infermier = models.ForeignKey(Infermier, on_delete=models.CASCADE, related_name="soins_realises")
    description = models.TextField()  # Le soin administré
    date = models.DateTimeField()  # Supprimez `auto_now_add=True`

    class Meta:
        managed = True
        db_table = "soins"
        verbose_name = "Soin"
        verbose_name_plural = "Soins"

    def __str__(self):
        return f"Soin par {self.infermier.id}"
.. _models:

Models
======

Patient Model
-------------

.. autoclass:: consultation.cons.models.Patient
   :undoc-members:
   :show-inheritance:

- `nss`: Le numéro de sécurité sociale du patient (unique).
- `nom`: Le nom du patient.
- `prenom`: Le prénom du patient.
- `date_naissance`: La date de naissance du patient.
- `adresse`: L'adresse du patient.
- `telephone`: Le numéro de téléphone du patient.
- `mutuelle`: La mutuelle du patient.
- `medecin_traitant`: Le médecin traitant du patient.
- `personne_a_contacter`: La personne à contacter en cas d'urgence.

Consultation Model
------------------

.. autoclass:: consultation.cons.models.Consultation
   :undoc-members:
   :show-inheritance:

- `patient`: La relation avec le modèle `Patient`.
- `medecin`: Le nom du médecin ayant effectué la consultation.
- `date`: La date et l'heure de la consultation.
- `description`: La description de la consultation.
- `diagnostic`: Le diagnostic de la consultation (optionnel).

Ordonnance Model
----------------

.. autoclass:: consultation.cons.models.Ordonnance
  
   :undoc-members:
   :show-inheritance:

- `consultation`: La relation avec le modèle `Consultation`.
- `medicament`: Le nom du médicament prescrit.
- `dose`: La dose du médicament.
- `duree`: La durée du traitement.

BilanBiologique Model
----------------------

.. autoclass:: consultation.cons.models.BilanBiologique
   
   :undoc-members:
   :show-inheritance:

- `consultation`: La relation avec le modèle `Consultation`.
- `type_analyse`: Le type de l'analyse biologique effectuée.

BilanRadiologique Model
------------------------

.. autoclass:: consultation.cons.models.BilanRadiologique
   
   :undoc-members:
   :show-inheritance:

- `consultation`: La relation avec le modèle `Consultation`.
- `type_examen`: Le type de l'examen radiologique effectué.
- `images`: Les images de l'examen radiologique.
- `compte_rendu`: Le compte rendu de l'examen radiologique (optionnel).

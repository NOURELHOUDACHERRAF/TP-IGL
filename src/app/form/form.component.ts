import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {


  // Groupe de formulaire pour les informations du patient


  dpiForm: FormGroup;


  // Liste des médecins 


  medecins = [
    { id: 1, name: 'Dr. John Doe' },
    { id: 2, name: 'Dr. Jane Smith' },
    { id: 3, name: 'Dr. Alice Johnson' }
  ];

  constructor(private fb: FormBuilder) {


    // Initialisation du groupe de formulaire avec les contrôles et les règles de validation


    this.dpiForm = this.createForm();
  }

  ngOnInit(): void {
  
  }



  
    //Crée et retourne le FormGroup avec tous les contrôles et leurs validateurs.
   


  private createForm(): FormGroup {
    return this.fb.group({
      nom: ['', Validators.required], // Nom obligatoire
      prenom: ['', Validators.required], // Prénom obligatoire
      dateNaissance: ['', Validators.required], // Date de naissance obligatoire
      adresse: ['', Validators.required], // Adresse obligatoire
      telephone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // Téléphone : 10 chiffres
      sexe: ['', Validators.required], // Sexe obligatoire
      groupeSanguin: ['', Validators.required], // Groupe sanguin obligatoire
      medecins: [[]], // Tableau pour les médecins sélectionnés
      urgence: ['', Validators.required], // Contact d'urgence obligatoire
      mutuelle: ['', Validators.required] // Informations sur la mutuelle obligatoires
    });
  }

  
   //Gère la soumission du formulaire.
  
   
  onSubmit(): void {
    if (this.dpiForm.valid) {
      console.log('Formulaire soumis avec succès !', this.dpiForm.value);
    } else {
      console.log('Formulaire invalide. Veuillez corriger les erreurs.');
    }
  }

  
   // Vérifie si un contrôle spécifique du formulaire est invalide et a été modifié ou touché.
   
   
  isInvalid(controlName: string): boolean {
    const control = this.dpiForm.get(controlName);
    return control ? (control.invalid && (control.touched || control.dirty)) : false;
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  bilanForm: FormGroup;
  popupVisible: boolean = false;
  showBilan: boolean = false;

  constructor(private fb: FormBuilder) {
    // Initialisation du formulaire
    this.bilanForm = this.fb.group({
      dateBilan: ['', Validators.required], // Champ pour la date globale
      remarques: [''],                      // Champ optionnel
      tests: this.fb.array([])              // Tableau des tests dynamiques
    });
  }

  // Getter pour accéder au tableau des tests
  get tests(): FormArray {
    return this.bilanForm.get('tests') as FormArray;
  }

  // Créer un nouveau test (FormGroup)
  createTest(): FormGroup {
    return this.fb.group({
      nomTest: ['', Validators.required],
      resultat: ['', Validators.required],
      norme: ['', Validators.required]
    });
  }

  // Ajouter un test au tableau
  ajouterTest(): void {
    this.tests.push(this.createTest());
  }

  // Supprimer un test spécifique
  supprimerTest(index: number): void {
    this.tests.removeAt(index);
  }

  // Afficher la popup
  afficherPopup(): void {
    this.popupVisible = true;
  }

  // Fermer la popup apres annuler
  fermerPopup(): void {
    this.popupVisible = false;

    // Effacer les tests et réinitialiser le formulaire
    this.tests.clear(); // Efface les tests
    this.bilanForm.reset(); // Réinitialise tout le formulaire

    // Reconstruire au moins un champ vide pour éviter un tableau vide
    this.ajouterTest(); // Ajouter une ligne par défaut
  }

   // Fermer la popup apres confirm
   fermerPopup2(): void {
    this.popupVisible = false;

  }

  // Soumettre le formulaire
  onSubmit(): void {
    if (this.bilanForm.valid) {
      console.log('Résultats soumis:', this.bilanForm.value);
      alert('Données enregistrées avec succès !');
      this.fermerPopup2(); // Fermer la popup
      this.showBilan = true;
    } else {
      alert('Veuillez compléter tous les champs !');
    }
  }
}

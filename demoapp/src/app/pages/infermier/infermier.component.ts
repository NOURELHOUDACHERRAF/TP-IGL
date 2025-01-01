import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Import de FormsModule ici
import { CommonModule } from '@angular/common';  // Importation de CommonModule
import { ZXingScannerModule } from '@zxing/ngx-scanner'; // Importer le scanner
import { BarcodeFormat } from '@zxing/library';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-patients',
   imports: [FormsModule, CommonModule, ReactiveFormsModule,  ZXingScannerModule],
  templateUrl: './infermier.component.html',
  styleUrls: ['./infermier.component.css']
})
export class InfermierComponent implements OnInit {
  searchQuery: string = '';
  showScanner: boolean = false;
  soinForm: FormGroup;
    popupVisible: boolean = false;
    showBilan: boolean = false;
  formats: BarcodeFormat[] = [BarcodeFormat.QR_CODE]; // Type correct

   constructor(private fb: FormBuilder) {
      // Initialisation du formulaire
      this.soinForm = this.fb.group({
        dateSoin: ['', Validators.required], // Champ pour la date globale
        heureSoin: ['', Validators.required],
        description: ['', Validators.required],                     
      
      });
    }

  
  // Liste des medicaments
  treatments = [
    { medicament: 'Clamoxyl', dose: '500mg/jour', duree: '10 jours' },
    { medicament: 'Clamoxyl', dose: '500mg/jour', duree: '10 jours' },
    { medicament: 'Clamoxyl', dose: '500mg/jour', duree: '10 jours' },
    { medicament: 'Clamoxyl', dose: '500mg/jour', duree: '10 jours' },
    { medicament: 'Clamoxyl', dose: '500mg/jour', duree: '10 jours' },
    { medicament: 'Clamoxyl', dose: '500mg/jour', duree: '10 jours' },
    { medicament: 'Clamoxyl', dose: '500mg/jour', duree: '10 jours' }
  ];

  soins = [
    { description: 'Clamoxyl 100mg', heure: '9H30', date: '10/07/2020' },
    { description: 'Clamoxyl 100mg', heure: '9H30', date: '10/07/2020' },
    { description: 'Clamoxyl 100mg', heure: '9H30', date: '10/07/2020' },
    { description: 'Clamoxyl 100mg', heure: '9H30', date: '10/07/2020' },
    { description: 'Clamoxyl 100mg', heure: '9H30', date: '10/07/2020' }
  ];

 

  // Liste des patients simulée
  filteredBilans = [
    { nom: 'Samir', prenom: 'Bayou', genre: 'Homme', age: 42 },
    { nom: 'Sarah', prenom: 'Meziane', genre: 'Femme', age: 35 },
    { nom: 'Ali', prenom: 'Benali', genre: 'Homme', age: 50 },
    { nom: 'Ali', prenom: 'Benali', genre: 'Homme', age: 50 },
    { nom: 'Ali', prenom: 'Benali', genre: 'Homme', age: 50 },
    { nom: 'Ali', prenom: 'Benali', genre: 'Homme', age: 50 },
    { nom: 'Ali', prenom: 'Benali', genre: 'Homme', age: 50 }
  ];


  ngOnInit(): void {}

  // Filtrage dynamique des patients
  getFilteredBilans() {
    return this.filteredBilans.filter(bilan =>
      bilan.nom.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      bilan.prenom.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  // Clic sur une ligne du tableau
  onRowClick(bilan: any, index: number) {
    console.log('Patient sélectionné :', bilan);
    alert(`Patient sélectionné : ${bilan.nom} ${bilan.prenom}`);
  }

  // Ouvrir la popup du scanner
  openScannerPopup() {
    this.showScanner = true;
  }

  // Fermer la popup du scanner
  closeScannerPopup() {
    this.showScanner = false;
  }

  // Gestion du succès du scanner
  onCodeScanned(event: string) {
    console.log('QR Code scanné :', event);
    this.closeScannerPopup();
  }

   // Afficher la popup
   afficherPopup(): void {
    this.popupVisible = true;
  }

 

  // Fermer la popup apres annuler
  fermerPopup(): void {
    this.popupVisible = false;
    this.soinForm.reset(); // Réinitialise tout le formulaire

   
  }

   // Fermer la popup apres confirm
   fermerPopup2(): void {
    this.popupVisible = false;

  }

  // Soumettre le formulaire
  onSubmit(): void {
    if (this.soinForm.valid) {
      console.log('Résultats soumis:', this.soinForm.value);
      alert('Données enregistrées avec succès !');
      this.soins.unshift({
        description: this.soinForm.value.description,
        heure: this.soinForm.value.heureSoin,
        date: this.soinForm.value.dateSoin
      });
      this.fermerPopup(); // Fermer la popup
    
    } else {
      alert('Veuillez compléter tous les champs !');
    }
  }
}


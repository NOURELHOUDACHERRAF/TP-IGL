// liste-radios.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router'; // Import Router and RouterModule

import { ZXingScannerModule } from '@zxing/ngx-scanner'; // Importer le scanner
import { BarcodeFormat } from '@zxing/library'; // Import de BarcodeFormat

import { FormsModule } from '@angular/forms'; 

interface Antecedent {
  nom: string;
  type: string;
  medecin:string;
}

@Component({
  selector: 'app-liste-ordo',
  standalone: true,
  imports: [ZXingScannerModule ,FormsModule,CommonModule, RouterModule], // Add RouterModule to imports
  templateUrl: './liste-ordo.component.html',
  styleUrls: ['./liste-ordo.component.css']
})

export class ListeOrdoComponent {
  formats: BarcodeFormat[] = [BarcodeFormat.QR_CODE]; // Type correct
  selectedOrdo: any | null = null; // Stocke l'ordonnance sélectionnée
 


Ordonnances = [
  {
    ordo: '0001',
    date: '13-Aug-2023',
    medecin: 'Jane',
    details: [
      { medecament: 'Paracétamol', dose: '500mg', duree: '7 jours' },
      { medecament: 'Ibuprofène', dose: '200mg', duree: '5 jours' }
    ]
  },
  {
    ordo: '0002',
    date: '13-Nov-2023',
    medecin: 'Wade',
    details: [
      { medecament: 'Amoxicilline', dose: '250mg', duree: '10 jours' }
    ]
  },
  // Ajoutez d'autres ordonnances ici...
];

 

  searchQuery: string = '';
  showScanner: boolean = false;

  get filteredOrdo() {
    return this.Ordonnances.filter(ordo => 
      ordo.ordo.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      ordo.date.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      ordo.medecin.toLowerCase().includes(this.searchQuery.toLowerCase()) 
     
     
    
    );
  }
  showDetails(ordo: any) {
    this.selectedOrdo = ordo;
  }

  // Méthode pour fermer les détails
  closeDetails() {
    this.selectedOrdo = null;
  }
 

   // Ouvrir la pop-up
   openScannerPopup() {
    this.showScanner = true;


  }

   // Fermer la pop-up
   closeScannerPopup() {
    this.showScanner = false;
  }

  // Gestion du scan réussi
  onCodeScanned(result: string) {
    console.log('QR Code scanné : ', result);

    // Mettre à jour la barre de recherche
    this.searchQuery = result;

    // Fermer le scanner après scan
    this.closeScannerPopup();
  }
}
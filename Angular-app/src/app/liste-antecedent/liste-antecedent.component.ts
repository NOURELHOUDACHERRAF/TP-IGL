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
  selector: 'app-liste-antecedent',
  standalone: true,
  imports: [ZXingScannerModule ,FormsModule,CommonModule, RouterModule], // Add RouterModule to imports
  templateUrl: './liste-antecedent.component.html',
  styleUrls: ['./liste-antecedent.component.css']
})
export class ListeAntecedentComponent {
  formats: BarcodeFormat[] = [BarcodeFormat.QR_CODE]; // Type correct
  selectedAntecedent: Antecedent | null = null;
 
  Antecedents = [
    {  nom: 'Asthme',    type: 'Maladie respiratoire',  medecin: 'Jane'    },
    { nom: 'Tuberculose',      type: 'Maladie infectieuse', medecin: 'Wade'     },
    { nom: 'pénicilline',    type: 'Allergies médicamenteuses' , medecin: 'Brooklyn' },
    {  nom: 'Asthme',    type: 'Maladie respiratoire',  medecin: 'Jane'    },
    {  nom: 'Asthme',    type: 'Maladie respiratoire',  medecin: 'Jane'    }
   
];

 

  searchQuery: string = '';
  showScanner: boolean = false;

  get filteredAntc() {
    return this.Antecedents.filter(antecedent => 
      antecedent.nom.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      antecedent.medecin.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      antecedent.medecin.toLowerCase().includes(this.searchQuery.toLowerCase()) 
     
    
    );
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
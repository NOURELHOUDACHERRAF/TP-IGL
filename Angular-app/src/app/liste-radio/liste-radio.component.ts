// liste-radios.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router'; // Import Router and RouterModule
import { RadiographyComponent } from '../radiography/radiography.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner'; // Importer le scanner
import { BarcodeFormat } from '@zxing/library'; // Import de BarcodeFormat

import { FormsModule } from '@angular/forms'; 
interface Radio {
  nDossier: number;
  nom: string;
  medecin: string;
  date: string;
  typeRadiographie: string;
}

@Component({
  selector: 'app-liste-radios',
  standalone: true,
  imports: [ZXingScannerModule ,FormsModule,CommonModule, RouterModule,RadiographyComponent], // Add RouterModule to imports
  templateUrl: './liste-radio.component.html',
  styleUrls: ['./liste-radio.component.css']
})
export class ListeRadiosComponent {
  formats: BarcodeFormat[] = [BarcodeFormat.QR_CODE]; // Type correct
  selectedRadio: Radio | null = null;
 
  radios: Radio[] = [
    { nDossier: 1, nom: 'Cooper Jane',     medecin: 'Jane',     date: '13-Aug-2023 ',   typeRadiographie: 'IRM' },
    { nDossier: 2, nom: 'Warren Wade',     medecin: 'Wade',     date: '13-Aug-2023 ',   typeRadiographie: 'Radio Pulmonaire' },
    { nDossier: 3, nom: 'Simmons Brooklyn',   medecin: 'Brooklyn', date: '13-Aug-2023 ',   typeRadiographie: 'Scanner' },
    { nDossier: 4, nom: 'Williamson Cameron', medecin: 'Cameron',  date: '13-Aug-2023 ',   typeRadiographie: 'Échographie' },
    { nDossier: 5, nom: 'Alexander Leslie',  medecin: 'Leslie',   date: '13-Aug-2023 ',   typeRadiographie: 'IRM' },
    { nDossier: 6, nom: 'Nguyen Savannah',     medecin: 'Savannah', date: '13-Aug-2023 ',   typeRadiographie: 'Radio Pulmonaire' },
    { nDossier: 7, nom: 'Robertson Darlene', medecin: 'Darlene',  date: '13-Aug-2023 ',   typeRadiographie: 'Scanner' },
   
];

  showRadiographyModal = false; // Flag to show/hide the modal

  searchQuery: string = '';
  showScanner: boolean = false;
  // Méthode pour filtrer les radios en fonction de la recherche
  get filteredRadios() {
    return this.radios.filter(radio => 
      radio.nom.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      radio.medecin.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      radio.typeRadiographie.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      radio.date.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  openRadiographyModal(radio: Radio) {
    this.selectedRadio = radio; // Store selected radio
    this.showRadiographyModal = true;
  }

  closeRadiographyModal() {
    this.showRadiographyModal = false;
    this.selectedRadio = null;
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
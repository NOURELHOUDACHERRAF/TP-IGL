// liste-radios.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router'; // Import Router and RouterModule
import { RadiographyComponent } from '../radiography/radiography.component';

interface Radio {
  nDossier: number;
  nom: string;
  prenom: string;
  date: string;
  typeRadiographie?: string;
}

@Component({
  selector: 'app-liste-radios',
  standalone: true,
  imports: [CommonModule, RouterModule,RadiographyComponent], // Add RouterModule to imports
  templateUrl: './liste-radio.component.html',
  styleUrls: ['./liste-radio.component.css']
})
export class ListeRadiosComponent {
  selectedRadio: Radio | null = null;
  radios: Radio[] = [
    { nDossier: 1, nom: 'Cooper', prenom: 'Jane', date: '13-Aug-2023 at 10:00 AM', typeRadiographie: 'IRM' },
    { nDossier: 2, nom: 'Warren', prenom: 'Wade', date: '13-Aug-2023 at 10:00 AM', typeRadiographie: 'Radio Pulmonaire' },
    { nDossier: 3, nom: 'Simmons', prenom: 'Brooklyn', date: '13-Aug-2023 at 10:00 AM', typeRadiographie: 'Scanner' },
    { nDossier: 4, nom: 'Williamson', prenom: 'Cameron', date: '13-Aug-2023 at 10:00 AM', typeRadiographie: 'Échographie' },
    { nDossier: 5, nom: 'Alexander', prenom: 'Leslie', date: '13-Aug-2023 at 10:00 AM', typeRadiographie: 'IRM' },
    { nDossier: 6, nom: 'Nguyen', prenom: 'Savannah', date: '13-Aug-2023 at 10:00 AM', typeRadiographie: 'Radio Pulmonaire' },
    { nDossier: 7, nom: 'Robertson', prenom: 'Darlene', date: '13-Aug-2023 at 10:00 AM', typeRadiographie: 'Scanner' },
   
];

  showRadiographyModal = false; // Flag to show/hide the modal

  openRadiographyModal(radio: Radio) {
    this.selectedRadio = radio; // Store selected radio
    this.showRadiographyModal = true;
  }

  closeRadiographyModal() {
    this.showRadiographyModal = false;
    this.selectedRadio = null;
  }
}
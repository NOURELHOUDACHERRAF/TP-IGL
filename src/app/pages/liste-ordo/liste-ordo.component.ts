// liste-radios.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router'; // Import Router and RouterModule



import { FormsModule } from '@angular/forms'; 

interface Antecedent {
  nom: string;
  type: string;
  medecin:string;
}

@Component({
  selector: 'app-liste-ordo',
  standalone: true,
  imports: [FormsModule,CommonModule, RouterModule], // Add RouterModule to imports
  templateUrl: './liste-ordo.component.html',
  styleUrls: ['./liste-ordo.component.css']
})

export class ListeOrdoComponent {
  
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

 

 

  
  showDetails(ordo: any) {
    this.selectedOrdo = ordo;
  }

  // Méthode pour fermer les détails
  closeDetails() {
    this.selectedOrdo = null;
  }
 

   
  
}
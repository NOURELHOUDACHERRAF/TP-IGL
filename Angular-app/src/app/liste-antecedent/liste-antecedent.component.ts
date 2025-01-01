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
  selector: 'app-liste-antecedent',
  standalone: true,
  imports: [ FormsModule,CommonModule, RouterModule], // Add RouterModule to imports
  templateUrl: './liste-antecedent.component.html',
  styleUrls: ['./liste-antecedent.component.css']
})
export class ListeAntecedentComponent {

  selectedAntecedent: Antecedent | null = null;
 
  Antecedents = [
    {  nom: 'Asthme',    type: 'Maladie respiratoire',  medecin: 'Jane'    },
    { nom: 'Tuberculose',      type: 'Maladie infectieuse', medecin: 'Wade'     },
    { nom: 'pénicilline',    type: 'Allergies médicamenteuses' , medecin: 'Brooklyn' },
    {  nom: 'Asthme',    type: 'Maladie respiratoire',  medecin: 'Jane'    },
    {  nom: 'Asthme',    type: 'Maladie respiratoire',  medecin: 'Jane'    }
   
];

 

 

 

 

   
}
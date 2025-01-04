import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from '../form/form.component';
import { AfficheComponent } from '../affiche/affiche.component';
@Component({
  selector: 'app-dashboard',
  standalone:true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports:[ CommonModule,AfficheComponent],
})
export class DashboardComponent {

  //exemplaire de donner de patient


  people = [
    { nom: 'Jane', prenom: 'Cooper', nss: '+91 9876543210', dateCreation: '13-Aug-2023 at 10:00 AM', dateSortie: '', showDpi: false },
    { nom: 'Wade', prenom: 'Warren', nss: '+91 9876543210', dateCreation: '13-Aug-2023 at 10:00 AM', dateSortie: '', showDpi: false },
    { nom: 'Brooklyn', prenom: 'Simmons', nss: '+91 9876543210', dateCreation: '13-Aug-2023 at 10:00 AM', dateSortie: '', showDpi: false },
    { nom: 'Cameron', prenom: 'Williamson', nss: '+91 9876543210', dateCreation: '13-Aug-2023 at 10:00 AM', dateSortie: '', showDpi: false },
    { nom: 'Leslie', prenom: 'Alexander', nss: '+91 9876543210', dateCreation: '13-Aug-2023 at 10:00 AM', dateSortie: '', showDpi: false },
    { nom: 'Savannah', prenom: 'Nguyen', nss: '+91 9876543210', dateCreation: '13-Aug-2023 at 10:00 AM', dateSortie: '', showDpi: false },
    { nom: 'Darlene', prenom: 'Robertson', nss: '+91 9876543210', dateCreation: '13-Aug-2023 at 10:00 AM', dateSortie: '', showDpi: false },
    { nom: 'Ronald', prenom: 'Richards', nss: '+91 9876543210', dateCreation: '13-Aug-2023 at 10:00 AM', dateSortie: '', showDpi: false },
    { nom: 'Kathryn', prenom: 'Murphy', nss: '+91 9876543210', dateCreation: '13-Aug-2023 at 10:00 AM', dateSortie: '', showDpi: false },
    { nom: 'Darrell', prenom: 'Steward', nss: '+91 9876543210', dateCreation: '13-Aug-2023 at 10:00 AM', dateSortie: '', showDpi: false }
  ];
  showForm: boolean = false;  // État pour contrôler l'affichage du composant

  toggleForm() {
    this.showForm = !this.showForm;  // Change l'état à chaque clic
  }

}

import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AjouteComponent } from '../ajoute/ajoute.component';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.css',
})
export class LeftSidebarComponent {


   // Propriété qui détermine si sidebar est pliée ou non

    
  isLeftSidebarCollapsed = input.required<boolean>();


   // Événement émis lorsqu'il y a un changement dans l'état de repliement de la sidebar


  changeIsLeftSidebarCollapsed = output<boolean>();


   // Fonction pour basculer l'état de la sidebar  (pliée ou dépliée)

  
  toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed());
  }


   // Fonction pour fermer sidebar (la replier complètement)


  closeSidenav(): void {
    this.changeIsLeftSidebarCollapsed.emit(true);
  }
}

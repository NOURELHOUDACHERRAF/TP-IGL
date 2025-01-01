import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RadiographyComponent } from './radiography/radiography.component'; // Import RadiographieComponent
import { CommonModule } from '@angular/common'; // Import CommonModule
import { ResumerComponent } from './resumer/resumer.component';
import { ConsultationsComponent } from './liste-consul/liste-consul.component';
import { ListeRadiosComponent }from './liste-radio/liste-radio.component';
import { OrdonnanceComponent }from './ordonnance/ordonnance.component';
import { ListeAntecedentComponent }from './liste-antecedent/liste-antecedent.component';
import { ListeOrdoComponent }from './liste-ordo/liste-ordo.component';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule,ListeOrdoComponent , ListeAntecedentComponent, RouterModule,ResumerComponent,ConsultationsComponent,RadiographyComponent,ListeRadiosComponent,OrdonnanceComponent]  // Import RadiographieComponent here
})
export class AppComponent {}

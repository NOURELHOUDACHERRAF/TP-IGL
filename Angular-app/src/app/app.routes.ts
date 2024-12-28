import { Routes } from '@angular/router';
import { ConsultationsComponent } from './liste-consul/liste-consul.component';
import { ConsultationDetailsComponent } from './consultation-details/consultation-details.component';
import { ListeRadiosComponent } from './liste-radio/liste-radio.component';
import { RadiographyComponent } from './radiography/radiography.component';

export const routes: Routes = [
  { path: 'consultations', component: ConsultationsComponent },
  { path: 'consultations/:id', component: ConsultationDetailsComponent },
  { path: 'radios', component: ListeRadiosComponent },
  //{ path: 'radiography/:nDossier', component: RadiographyComponent },
  { path: 'radiography', component: RadiographyComponent },

  { path: '', redirectTo: '/consultations', pathMatch: 'full' }, // Only ONE redirect route
];
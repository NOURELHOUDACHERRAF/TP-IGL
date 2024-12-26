// app.routes.ts
import { Routes } from '@angular/router';
import { ConsultationsComponent } from './liste-consul/liste-consul.component';
import { ConsultationDetailsComponent } from './consultation-details/consultation-details.component';

export const routes: Routes = [ // Add export here
  { path: 'consultations', component: ConsultationsComponent },
  { path: 'consultations/:id', component: ConsultationDetailsComponent },
  { path: '', redirectTo: '/consultations', pathMatch: 'full' },
];
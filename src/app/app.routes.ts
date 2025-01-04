import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchComponent } from './search/search.component';

import { FormComponent } from './form/form.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AjouteAntecedentComponent } from './ajoute-antecedent/ajoute-antecedent.component';
import { AjouteConsultationComponent } from './ajoute-consultation/ajoute-consultation.component';
import { AjoutePrescriptionComponent } from './ajoute-prescription/ajoute-prescription.component';
import { AjouteTraitementComponent } from './ajoute-traitement/ajoute-traitement.component';
export const routes: Routes = [
 

 
  { path: 'search', component: SearchComponent},
  { path: 'form', component: FormComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'ajoute-antecedent', component: AjouteAntecedentComponent },
  { path: 'ajoute-traitement', component: AjouteTraitementComponent },
  { path: 'ajoute-prescription', component: AjoutePrescriptionComponent },
  { path: 'ajoute-consultation', component: AjouteConsultationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule{}

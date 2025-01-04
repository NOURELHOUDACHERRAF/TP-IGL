import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchComponent } from './search/search.component';
import { AjouteComponent } from './ajoute/ajoute.component';
import { FormComponent } from './form/form.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import{MatTableModule} from '@angular/material/table'
import { AfficheComponent } from './affiche/affiche.component';

export const routes: Routes = [
//les chemains vers deferent page 
  { path: 'dashboard', component: DashboardComponent },
  { path: 'search', component: SearchComponent},
  { path: 'form', component: FormComponent },
  { path: 'ajoute', component: AjouteComponent },
  { path: 'affiche', component: AfficheComponent },
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes), MatTableModule],
  exports: [RouterModule],
})

export class AppRoutingModule{}

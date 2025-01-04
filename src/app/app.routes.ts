import { Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import{MatTableModule} from '@angular/material/table'
import { AfficheComponent } from './affiche/affiche.component';
import { MainComponent } from './main/main.component';
export const routes: Routes = [
//les chemains vers deferent page 
  

  { path: 'affiche', component: AfficheComponent },
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes), MatTableModule],
  exports: [RouterModule],
})

export class AppRoutingModule{}

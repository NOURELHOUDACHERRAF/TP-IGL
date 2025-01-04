import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ajoute',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,ReactiveFormsModule],
  templateUrl: './ajoute.component.html',
  styleUrls: ['./ajoute.component.css']
})
export class AjouteComponent implements OnInit {
  dpiForm: FormGroup;

//tableau de specialiter


  specialites: string[] = [
    'Cardiologue',
    'Ophtalmologue',
    'Gynécologue',
    'Généraliste',
    'Pneumologue',
  ];


//le constractor

  constructor(private fb: FormBuilder) {
    this.dpiForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      specialite: ['', Validators.required]
    });
  }

  ngOnInit(): void {}


// Méthode exécutée lors de la soumission du formulaire


  onSubmit(): void {
    if (this.dpiForm.valid) {
      console.log('Form submitted successfully!', this.dpiForm.value);
    } else {
      console.log('Form is invalid');
    }
  }


// Méthode pour réinitialiser les champs du formulaire


  onReset(): void {
    this.dpiForm.reset();
  }


  // Méthode pour vérifier si un champ est invalide 


  isInvalid(controlName: string): boolean {
    const control = this.dpiForm.get(controlName);
    return control ? (control.invalid && (control.touched || control.dirty)) : false;
  }
}

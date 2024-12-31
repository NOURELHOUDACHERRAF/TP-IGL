import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  dpiForm: FormGroup;
  medecins: any[] = [
    { id: 1, name: 'Dr. John Doe' },
    { id: 2, name: 'Dr. Jane Smith' },
    { id: 3, name: 'Dr. Alice Johnson' }
  ];  // Manually defined list of doctors

  // Inject FormBuilder into the constructor
  constructor(private fb: FormBuilder) {
    // Initialize dpiForm in the constructor
    this.dpiForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      adresse: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      sexe: ['', Validators.required],
      groupeSanguin: ['', Validators.required],
      medecins: [[]], // Array for selected doctors
      urgence: ['', Validators.required],
      mutuelle: ['', Validators.required]
    });
  }

  ngOnInit(): void {
     // Initialize dpiForm in the constructor
    this.dpiForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      adresse: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      sexe: ['', Validators.required],
      groupeSanguin: ['', Validators.required],
      medecins: [[]], // Array for selected doctors
      urgence: ['', Validators.required],
      mutuelle: ['', Validators.required]
    });
   
  }

  // Form submission handler
  onSubmit(): void {
    if (this.dpiForm.valid) {
      console.log('Form submitted successfully!', this.dpiForm.value);
    } else {
      console.log('Form is invalid');
    }
  }


  isInvalid(controlName: string): boolean {
    const control = this.dpiForm.get(controlName);
    // Check if control exists and is invalid, and if it's touched or dirty
    return control ? (control.invalid && (control.touched || control.dirty)) : false;
  }
  
}




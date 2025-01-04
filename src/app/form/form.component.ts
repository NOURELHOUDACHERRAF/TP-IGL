import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,SearchComponent],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  dpiForm: FormGroup;
  medecins: any[] = [
    { id: 1, name: 'Dr. John Doe' },
    { id: 2, name: 'Dr. Jane Smith' },
    { id: 3, name: 'Dr. Alice Johnson' }
  ]; // Manually defined list of doctors

  // Inject FormBuilder into the constructor
  constructor(private fb: FormBuilder) {
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
    const userData = [
      {
        id: 1,
        nom: 'John',
        prenom: 'Doe',
        dateNaissance: '1990-01-01',
        adresse: '1234 Main St',
        telephone: '0123456789',
        sexe: 'M',
        groupeSanguin: 'A+',
        medecins: [1, 2],
        urgence: '9876543210',
        mutuelle: 'HealthCo',
        nss: '123-45-187',
      },
    ];

    // Storing user data in sessionStorage
    sessionStorage.setItem('patients', JSON.stringify(userData));
    sessionStorage.setItem('userData', JSON.stringify(userData));

    // Populate the form with the first patient from the array
    const patient = userData[0];  // Get the first patient
    this.dpiForm.patchValue(patient);
  }

  // Form submission handler
  onSubmit(): void {
    if (this.dpiForm.valid) {
      console.log('Form submitted successfully!', this.dpiForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

  // Check if a form control is invalid
  isInvalid(controlName: string): boolean {
    const control = this.dpiForm.get(controlName);
    return control ? control.invalid && (control.touched || control.dirty) : false;
  }

  // Select a patient and populate the form based on their NSS
  selectPatient(patientNss: string): void {
    const patients = JSON.parse(sessionStorage.getItem('userData') || '[]');
    const selectedPatient = patients.find((userData: any) => userData.nss === patientNss);
    if (selectedPatient) {
      this.dpiForm.patchValue(selectedPatient);
    }
  }


 
}

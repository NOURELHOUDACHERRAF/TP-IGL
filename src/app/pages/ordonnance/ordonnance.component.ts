import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ordonnance',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './ordonnance.component.html',
  styleUrls: ['./ordonnance.component.css']
})
export class OrdonnanceComponent {
  @Output() cancel = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<{ rows: { medecament: string; dose: string; duree: string }[] }>(); // Emit rows as an object

  medecin: string = 'Dr. Skender';
  date: string = '24/12/2014';

  // Initial rows for Médicament, Dose, and Durée
  rows: { medecament: string; dose: string; duree: string }[] = [
    { medecament: '', dose: '', duree: '' },
    { medecament: '', dose: '', duree: '' }
  ];

  ngOnInit(): void {}

  // Add a new row
  addRow(): void {
    this.rows.push({ medecament: '', dose: '', duree: '' });
  }

  

  // Emit rows data on confirm
  onConfirm() {
    console.log('Form data:', this.rows);
    this.confirm.emit({
      rows: this.rows  // Emit the rows as part of an object
    });
    console.log('Ordonnance confirmed:', this.rows);
  }

  onCancel() {
    this.cancel.emit();
    console.log('Ordonnance cancelled.');
  }
}

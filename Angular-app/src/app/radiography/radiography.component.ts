import { Component } from '@angular/core';
import { UploadRadioComponent } from '../upload-radio/upload-radio.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-radiographie',/*  Defines the name of the component to be used in HTML */
  standalone: true,/* Makes this component a standalone component */
  imports: [CommonModule, FormsModule, UploadRadioComponent],
  templateUrl: './radiography.component.html',
  styleUrls: ['./radiography.component.css']
})
export class RadiographyComponent {
  compteRendu: string = '';
  selectedFiles: File[] = [];  // Array to store selected files
  fileType: string = '';
  date: string = '';

  radiographyTypes: string[] = [
    'Radio Pulmonaire',
    'IRM',
    'Scanner',
    'Échographie'
  ];

  // This method will handle the files emitted by UploadRadioComponent
  onFileChange(files: File[]) {
    // Merge the newly selected files into the existing selected files array, ensuring uniqueness
    this.selectedFiles = [...new Set([...this.selectedFiles, ...files])];
    console.log('Updated Files:', this.selectedFiles);
  }

  submitForm() {
   
    console.log('Form Submitted');
    console.log('File Type:', this.fileType);
    console.log('Date:', this.date);
    console.log('Compte Rendu:', this.compteRendu);
    console.log('Selected Files:', this.selectedFiles);
  }
}

import { Component , Output,Input, EventEmitter , OnChanges, SimpleChanges} from '@angular/core';
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
 
  
  
  @Input() typeRadiographie: string | null = null;
  @Input() nDossier: number | null = null; // to send the infos to the dossier 


  compteRendu: string = '';
  selectedFiles: File[] = [];  // Array to store selected files
  fileType: string = '';
  date: string = '';

  

  // This method will handle the files emitted by UploadRadioComponent
  onFileChange(files: File[]) {
    // Merge the newly selected files into the existing selected files array, ensuring uniqueness
    this.selectedFiles = [...new Set([...this.selectedFiles, ...files])];
    console.log('Updated Files:', this.selectedFiles);
  }

  submitForm() {
    console.log('nDossier:', this.nDossier);
    console.log('Form Submitted');
    console.log('File Type:', this.fileType);
    console.log('Date:', this.date);
    console.log('Compte Rendu:', this.compteRendu);
    console.log('Selected Files:', this.selectedFiles);
    this.close.emit();
  }

  @Output() close = new EventEmitter<void>(); // Emit close event

  closeModal() {
    this.close.emit();
  }
 

  
}

/*
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UploadRadioComponent } from '../upload-radio/upload-radio.component';


@Component({
  selector: 'app-radiographie',
  standalone: true,
  imports: [CommonModule, FormsModule, UploadRadioComponent],
  templateUrl: './radiography.component.html',
  styleUrls: ['./radiography.component.css']
})
export class RadiographyComponent implements OnInit {
  nDossier: number | null = null;
  compteRendu: string = '';
  selectedFiles: File[] = [];  // Array to store selected files
  fileType: string = '';
  date: string = '';

  radiographyTypes: string[] = [
    'Radio Pulmonaire',
    'IRM',
    'Scanner',
    'Échographie'
  ];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const nDossierParam = params.get('nDossier');
      if (nDossierParam !== null) {
        this.nDossier = parseInt(nDossierParam, 10); // Convert string to number (base 10)
      } else {
        this.nDossier = null; // or handle the null case as needed
      }

    });
  }

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

  
} */

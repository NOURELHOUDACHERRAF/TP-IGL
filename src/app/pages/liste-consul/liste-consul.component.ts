
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ResumerComponent } from '../resumer/resumer.component';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { ConsultationDetailsComponent } from '../consultation-details/consultation-details.component'; 


interface Consultation {
  date: string;
  medecin: string;
  description: string;
  diagnostique: string;
  bilanRadiologiqueData: string;
  bilanBiologiqueData: string;
  antecedentData: string;
}

@Component({
  selector: 'app-liste-consul',
  templateUrl: './liste-consul.component.html',
  imports: [CommonModule, FormsModule, ResumerComponent,RouterModule,ConsultationDetailsComponent ],
  styleUrls: ['./liste-consul.component.css']
})

export class ConsultationsComponent {
 

  showResumer = false;
  selectedDisplayType: string = 'all'; 
  selectedConsultation: Consultation | null = null; // Correctly declared
  showDetails = false;
 
  // Toggle the display of the resumer component
  toggleResumer() {
    this.showResumer = !this.showResumer;
  }

  consultationData: {
    date: string;
    medecin: string;
    description: string;
    diagnostique: string;
    bilanRadiologiqueData: string;
    bilanBiologiqueData: string;
    antecedentData: string;
  } | null = null;

  

  consultations: Consultation[] = [
    {
      date: '18/12/2024',
      medecin: 'kjhgf bnv',
      description: '',
      diagnostique: '',
      bilanRadiologiqueData: '',
      bilanBiologiqueData: '',
      antecedentData: ''
    },
    {
      date: '20/12/2024',
      medecin: 'Dr. Smith',
      description: '',
      diagnostique: '',
      bilanRadiologiqueData: '',
      bilanBiologiqueData: '',
      antecedentData: ''
    }
  ];

  

  // Function to log the bilan data
  logBilanData() {
    this.consultations.forEach((consultation, index) => {
      console.log(`Consultation ${index + 1}:`); // Add index for clarity
      console.log('  bilanRadiologiqueData:', consultation.bilanRadiologiqueData);
      console.log('  bilanBiologiqueData:', consultation.bilanBiologiqueData);
      console.log('  descrip:', consultation.description);
      console.log('  diag:', consultation.diagnostique);
    });
  }


  onCancelResume() {
    this.toggleResumer();
    console.log('Resume annulé.');
  }

  onResumeConfirm(data: {
    date: string;
    medecin: string;
    description: string;
    diagnostique: string;
    bilanRadiologiqueData: string;
    bilanBiologiqueData: string;
    antecedentData: string;
  }) {
    this.consultations.push(data); // Add the confirmed consultation data to the array

    console.log('Resume confirmé:', data);
    
    this.logBilanData();
    
    this.toggleResumer(); // Close the modal after confirmation
  }

   

  onDisplayClick(displayType: string, consultation: Consultation) {
    this.selectedDisplayType = displayType;
    this.selectedConsultation = consultation;
    this.showDetails = true; // Show the details component
  }

  closeDetails() { // Add this method
    this.showDetails = false;
    this.selectedConsultation = null;
    this.selectedDisplayType = 'resume';
  }


}


import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule

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
  selector: 'app-consultation-details',
  standalone: true, // Important: Make sure this is true
  imports: [CommonModule], // Add CommonModule to the imports array
  templateUrl: './consultation-details.component.html',
  styleUrls: ['./consultation-details.component.css']
})
export class ConsultationDetailsComponent {
  @Input() consultation: Consultation | null = null;
  @Input() displayType: string = 'resume';
  @Output() close = new EventEmitter<void>(); // Create an EventEmitter

  onClose() {
    this.close.emit(); // Emit the close event when the button is clicked
  }
}
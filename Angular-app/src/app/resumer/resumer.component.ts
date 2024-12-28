import { Component , EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BilanBiologiqueComponent } from '../bilan-biologique/bilan-biologique.component';
import { BilanRadiologiqueComponent } from '../bilan-radiologique/bilan-radiologique.component';
import { AntecedentComponent } from '../antecedent/antecedent.component';
import { OrdonnanceComponent } from '../ordonnance/ordonnance.component';
interface BilanRadiologiqueData {
  type: string;
}

interface BilanBiologiqueData {
  type: string;
}

interface AntecedentData {
  nom: string;
  type: string;
}

interface OrdonnaceData {
  medecament: string;
   dose: string;
    duree: string
}
@Component({
  selector: 'app-resumer',
  templateUrl: './resumer.component.html',
  styleUrls: ['./resumer.component.css'],
  imports: [CommonModule, FormsModule, BilanBiologiqueComponent, BilanRadiologiqueComponent, AntecedentComponent,OrdonnanceComponent],
})
export class ResumerComponent {
  @Output() cancel = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<{ 
    date: string, 
    medecin: string, 
    description: string, 
    diagnostique: string, 
    bilanRadiologiqueData: string, 
    bilanBiologiqueData: string, 
    antecedentData: string,
    ordonnanceData: OrdonnaceData[]  // New property to store ordonnance rows
  }>();

  date: string = '';
  medecin: string = '';
  description: string = '';
  diagnostique: string = '';
  
  
  showModal: boolean = false;
  modalType: 'ordonnance' | 'radio' | 'bio' | 'antecedent' | '' = '';
  bilanRadiologiqueData: BilanRadiologiqueData | null = null;
  bilanBiologiqueData: BilanBiologiqueData | null = null;
  antecedentData: AntecedentData | null = null;
  ordonnaceData:OrdonnaceData | null = null;
  ordonnanceData: OrdonnaceData[] = [];
 // consultationData:{date: string,medecin: string,description: string,diagnostique: string , bilanRadiologiqueData:string, bilanBiologiqueData:string, antecedentData:string}

  onCancelBilanRadiologique() {
    this.closeModal(); // Ferme la modale
    console.log('Bilan Radiologique annulé.');
  }
  onBilanRadiologiqueConfirm(data: {  type: string }) {
    this.bilanRadiologiqueData = data; // Enregistrer les données
    
    console.log('Bilan Radiologique confirmé:', data);
    this.closeModal(); // Fermer la modale après confirmation
  }


  onCancelBilanBiologique() {
    this.closeModal(); // Ferme la modale
    console.log('Bilan Radiologique annulé.');
  }
  onBilanBiologiqueConfirm(data: { type: string }) {
    this.bilanBiologiqueData = data; // Enregistrer les données
    
    console.log('Bilan Radiologique confirmé:', data);
    this.closeModal(); // Fermer la modale après confirmation
  }

  onCancelantecedent() {
    this.closeModal(); // Ferme la modale
    console.log('Antecedent annulé.');
  }
  onantecedentConfirm(data: { nom: string,type: string }) {
    this.antecedentData = data; // Enregistrer les données
  
    console.log('antecedent confirmé:', data);
    this.closeModal(); // Fermer la modale après confirmation
  }

  onCancelordonnance() {
    this.closeModal(); // Ferme la modale
    console.log('ordonnace annulé.');
  }
  onordonnanceConfirm(data: OrdonnaceData[]) {
    this.ordonnanceData = data; // Enregistrer les données
  
    console.log('ordonnace confirmé:', data);
    this.closeModal(); // Fermer la modale après confirmation
  }

 
  /*onCancel() {
    this.closeModal(); // Ferme la modale ou réinitialise les états si nécessaire
    console.log('Action annulée.');
  }*/



  nom: string = '';
  selectedType: string = '';

  /*onConfirm() {

    
    this.confirm.emit({
     
      date: this.date,
      medecin: this.medecin,
      description: this.description,
      diagnostique: this.diagnostique,
      bilanRadiologiqueData: this.bilanRadiologiqueData?.type || '',
      bilanBiologiqueData: this.bilanBiologiqueData?.type || '',
      antecedentData:
        this.antecedentData ? `${this.antecedentData.nom}, ${this.antecedentData.type}` : '',
        ordonnanceData: this.ordonnanceData,
      
  });

 
  }*/
  onConfirm() {
    // Create an object to log all data
    const confirmData = {
      date: this.date,
      medecin: this.medecin,
      description: this.description,
      diagnostique: this.diagnostique,
      bilanRadiologiqueData: this.bilanRadiologiqueData?.type || '',
      bilanBiologiqueData: this.bilanBiologiqueData?.type || '',
      antecedentData: this.antecedentData ? `${this.antecedentData.nom}, ${this.antecedentData.type}` : '',
      ordonnanceData: this.ordonnanceData,
    };
  
    // Log the data
    console.log('Confirm data:', confirmData);
  
    // Emit the data
    this.confirm.emit(confirmData);
  }
  


  onCancel() {
    this.cancel.emit(); 
    console.log('Action annulée.');
  }
  
 

  openModal(type: 'ordonnance' | 'radio' | 'bio' | 'antecedent') {
    this.modalType = type;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.modalType = '';
  }
}

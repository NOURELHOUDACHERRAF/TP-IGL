import { Component , EventEmitter, Output  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bilan-biologique',
  templateUrl: './bilan-biologique.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./bilan-biologique.component.css']
})
export class BilanBiologiqueComponent {
   @Output() cancel = new EventEmitter<void>();
    @Output() confirm = new EventEmitter<{type: string}>();
 
  types = ['Scanner', 'IRM', 'Radiographie'];
  
  selectedType: string = '';

  onConfirm() {
    if (!this.selectedType) {
      // Si un champ est vide, afficher une alerte
      alert('Veuillez remplir tous les champs avant de confirmer.');
      return; // Empêche l'émission de l'événement si les champs ne sont pas remplis
    }
    this.confirm.emit({
    
      type: this.selectedType

    });
   }

  onCancel() {
    this.cancel.emit(); 
    console.log('Action annulée.');
  }
}

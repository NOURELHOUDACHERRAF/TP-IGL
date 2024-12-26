import { Component , EventEmitter, Output  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-antecedent',
  templateUrl: './antecedent.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./antecedent.component.css']
})
export class AntecedentComponent {
  @Output() cancel = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<{nom: string, type: string}>();
  types = [
    'Antécédents médicaux',
    'Antécédents chirurgicaux',
    'Antécédents familiaux',
    'Antécédents gynécologiques',
    'Antécédents allergiques',
    'Antécédents psychiatriques',
    'Antécédents traumatiques',
    'Antécédents infectieux',
    'Antécédents médicamenteux',
    'Antécédents sociaux'
  ];
  nom: string = '';
  selectedType: string = '';

  onConfirm() {

    if (!this.nom || !this.selectedType) {
      // Si un champ est vide, afficher une alerte
      alert('Veuillez remplir tous les champs avant de confirmer.');
      return; // Empêche l'émission de l'événement si les champs ne sont pas remplis
    }
    this.confirm.emit({
    nom: this.nom ,
    type: this.selectedType,
  });
  }


  onCancel() {
    this.cancel.emit(); 
    console.log('Action annulée.');
  }

  }

 

  


import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Import de FormsModule
import { CommonModule } from '@angular/common';  // Import de CommonModule
import { ZXingScannerModule } from '@zxing/ngx-scanner'; // Importer le scanner
import { BarcodeFormat } from '@zxing/library'; // Import de BarcodeFormat
import { FormComponent } from '../form/form.component';
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, CommonModule, ZXingScannerModule,FormComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchText: string = '';  // Texte de recherche
  showScanner: boolean = false;  // État du scanner

  people = [
    { nom: 'Doe', prenom: 'John', nss: '123-45-6789' },
    { nom: 'Smith', prenom: 'Jane', nss: '987-65-4321' },
    { nom: 'Brown', prenom: 'Charlie', nss: '654-32-1098' },
    { nom: 'Davis', prenom: 'Emily', nss: '321-54-9876' }
  ];
  

  // Formats QR code supportés
  formats: BarcodeFormat[] = [BarcodeFormat.QR_CODE];

  // Méthode pour filtrer les données basées sur la recherche textuelle ou le QR code
  get filteredPeople() {
    if (!this.searchText) {
      return [];  // Return an empty array if no search text is entered
    }
  
    return this.people.filter(person => 
      person.nom.toLowerCase().includes(this.searchText.toLowerCase()) ||
      person.prenom.toLowerCase().includes(this.searchText.toLowerCase()) ||
      person.nss.includes(this.searchText)
    );
  }
  

  // Ouvrir le scanner pour scanner le QR code
  openScannerPopup() {
    this.showScanner = true;
  }

  // Fermer le scanner
  closeScannerPopup() {
    this.showScanner = false;
  }

  // Gestion du scan du QR code
  onCodeScanned(result: string) {
    console.log('QR Code scanné : ', result);
    // Mettre à jour la barre de recherche avec le résultat du QR code
    this.searchText = result;
    this.closeScannerPopup();  // Fermer le scanner après le scan
  }


}

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Import de FormsModule ici
import { CommonModule } from '@angular/common';  // Importation de CommonModule
import { ZXingScannerModule } from '@zxing/ngx-scanner'; // Importer le scanner
import { BarcodeFormat } from '@zxing/library';

@Component({
  selector: 'app-patients',
   imports: [FormsModule, CommonModule,  ZXingScannerModule],
  templateUrl: './infermier.component.html',
  styleUrls: ['./infermier.component.css']
})
export class InfermierComponent implements OnInit {
  searchQuery: string = '';
  showScanner: boolean = false;
  formats: BarcodeFormat[] = [BarcodeFormat.QR_CODE]; // Type correct

  // Liste des patients simulée
  filteredBilans = [
    { nom: 'Samir', prenom: 'Bayou', genre: 'Homme', age: 42 },
    { nom: 'Sarah', prenom: 'Meziane', genre: 'Femme', age: 35 },
    { nom: 'Ali', prenom: 'Benali', genre: 'Homme', age: 50 },
    { nom: 'Ali', prenom: 'Benali', genre: 'Homme', age: 50 },
    { nom: 'Ali', prenom: 'Benali', genre: 'Homme', age: 50 },
    { nom: 'Ali', prenom: 'Benali', genre: 'Homme', age: 50 },
    { nom: 'Ali', prenom: 'Benali', genre: 'Homme', age: 50 }
  ];

  constructor() {}

  ngOnInit(): void {}

  // Filtrage dynamique des patients
  getFilteredBilans() {
    return this.filteredBilans.filter(bilan =>
      bilan.nom.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      bilan.prenom.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  // Clic sur une ligne du tableau
  onRowClick(bilan: any, index: number) {
    console.log('Patient sélectionné :', bilan);
    alert(`Patient sélectionné : ${bilan.nom} ${bilan.prenom}`);
  }

  // Ouvrir la popup du scanner
  openScannerPopup() {
    this.showScanner = true;
  }

  // Fermer la popup du scanner
  closeScannerPopup() {
    this.showScanner = false;
  }

  // Gestion du succès du scanner
  onCodeScanned(event: string) {
    console.log('QR Code scanné :', event);
    this.closeScannerPopup();
  }
}

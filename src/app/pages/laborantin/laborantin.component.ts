import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import du routeur
import { FormsModule } from '@angular/forms';  // Import de FormsModule ici
import { CommonModule } from '@angular/common';  // Importation de CommonModule
import { ZXingScannerModule } from '@zxing/ngx-scanner'; // Importer le scanner
import { BarcodeFormat } from '@zxing/library'; // Import de BarcodeFormat
 
@Component({
  selector: 'app-laborantin',
  imports: [FormsModule, CommonModule,  ZXingScannerModule],
  templateUrl: './laborantin.component.html',
  styleUrl: './laborantin.component.css'
})
export class LaborantinComponent {

  formats: BarcodeFormat[] = [BarcodeFormat.QR_CODE]; // Type correct


    // Exemple de données (à remplacer par une API plus tard)
    bilans = [
      { nss: '15007', nom: 'Mohammed Bayou', medecin: 'Celia Meziane', bilan: 'Glycémie', date: '09/12/2024' },
      { nss: '15007', nom: 'Mohammed Bayou', medecin: 'Celia Meziane', bilan: 'Glycémie', date: '09/12/2024' },
      { nss: '15007', nom: 'Mohammed ania', medecin: 'Celia Meziane', bilan: 'Glycémie', date: '09/12/2024' }
    ];

     // Propriété pour la recherche
  searchQuery: string = '';
  showScanner: boolean = false; // Scanner masqué par défaut

  // Méthode pour filtrer les bilans en fonction de la recherche
  get filteredBilans() {
    return this.bilans.filter(bilan => 
      bilan.nom.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      bilan.medecin.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      bilan.bilan.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      bilan.date.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

    constructor(private router: Router) {} // Injection du routeur

    // Fonction pour gérer la navigation
    ajouterBilan(bilan: any) {
      console.log('Bilan ajouté : ', bilan);
  
      // Redirection vers Dashboard
      this.router.navigate(['/dashboard']);
    }

   // Ouvrir la pop-up
  openScannerPopup() {
    this.showScanner = true;
  }

  // Fermer la pop-up
  closeScannerPopup() {
    this.showScanner = false;
  }

  // Gestion du scan réussi
  onCodeScanned(result: string) {
    console.log('QR Code scanné : ', result);

    // Mettre à jour la barre de recherche
    this.searchQuery = result;

    // Fermer le scanner après scan
    this.closeScannerPopup();
  }

}

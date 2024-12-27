import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importer CommonModule pour les fonctionnalités de base d'Angular

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule] // Importer FormsModule et CommonModule
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;

  onSubmit() {
    if (!this.email || !this.password) {
      alert('Veuillez remplir tous les champs !');
      return;
    }

    console.log('Email:', this.email);
    console.log('Mot de passe:', this.password);
    console.log('Se souvenir de moi:', this.rememberMe);

    alert('Connexion en cours...');
  }
}

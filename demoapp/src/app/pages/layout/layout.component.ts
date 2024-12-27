import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // Import RouterModule

@Component({
  selector: 'app-layout',
  standalone: true, // Standalone component
  imports: [RouterModule], // Ajout de RouterModule ici
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  constructor(private router: Router) { }

  // Méthode logout
  logout() {
    localStorage.removeItem('token'); // Supprimer le token
    this.router.navigate(['/login']); // Redirection vers login
  }
}

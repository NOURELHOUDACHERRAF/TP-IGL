import { Component, OnInit } from '@angular/core';

import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  imports: [RouterModule,CommonModule] 
})
export class LayoutComponent implements OnInit {
  menuItems: { label: string; link: string }[] = []; // Dynamic menu items

  // Define menu configurations for routes
  menus: {
    [key: string]: { label: string; link: string }[]; // Index signature for dynamic keys
  } = {
    dashboard: [
      { label: 'Dash', link: '/dashboard' },
      { label: 'Pro', link: '/pro' },
      { label: 'Para', link: '/para' }
    ],
    radiologue: [
      { label: 'Home', link: '/radiologue' },
      { label: 'Liste', link: '/ordo' }
    ],
    default: [
      { label: 'Home', link: '/' },
      { label: 'About', link: '/about' }
    ],
    homeMed:[
      { label: 'Home', link: '/' },
      { label: 'form', link: '/form' },
      { label: 'Ajouter-Antecedent', link: '/antc' },
      { label: 'Ajouter-bilan', link: '/bilan' },
      { label: 'form', link: '/form' }
    ]
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.updateMenu(); // Initialize the menu
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateMenu(); // Update menu on route change
      }
    });
  }

  // Update menu items based on the current route
  updateMenu() {
    const route = this.router.url.split('/')[1]; // Get the current route
    console.log('Current route:', route); // Debug: Check current route
    if (route === 'liste-radio') {
      this.menuItems = this.menus['radiologue']; // Note the corrected key: 'radiologue'
    } else {
      this.menuItems = this.menus[route] || this.menus['default'];
    }
    console.log('Menu items:', this.menuItems); // Debug: Check menu items
  }
  

  // Logout method
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}

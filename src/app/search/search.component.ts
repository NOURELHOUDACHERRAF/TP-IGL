import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { CommonModule } from '@angular/common';  


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})

export class SearchComponent {
  searchText: string = '';
  
  people = [
    { nom: 'Doe', prenom: 'John', nss: '123-45-6789' },
    { nom: 'Smith', prenom: 'Jane', nss: '987-65-4321' },
    { nom: 'Brown', prenom: 'Charlie', nss: '654-32-1098' },
    { nom: 'Davis', prenom: 'Emily', nss: '321-54-9876' }
  ];

 // Function to filter the people array based on search text
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
}
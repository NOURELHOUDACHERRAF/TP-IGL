import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RadiographyComponent } from './radiography/radiography.component'; // Import RadiographieComponent
import { CommonModule } from '@angular/common'; // Import CommonModule
import { ResumerComponent } from './resumer/resumer.component';
import { ConsultationsComponent } from './liste-consul/liste-consul.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, RouterModule,ResumerComponent,ConsultationsComponent,RadiographyComponent]  // Import RadiographieComponent here
})
export class AppComponent {}

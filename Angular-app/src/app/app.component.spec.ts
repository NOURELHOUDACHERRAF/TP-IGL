import { Component } from '@angular/core';
import { UploadRadioComponent } from './upload-radio/upload-radio.component'; // Import UploadRadioComponent

@Component({
  selector: 'app-root',
  standalone: true,  // Mark this as a standalone component
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [UploadRadioComponent]  // Import UploadRadioComponent here
})
export class AppComponent {}

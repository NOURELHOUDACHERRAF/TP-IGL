import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';  // Correct import for AppComponent

bootstrapApplication(AppComponent)
  .catch((err) => console.error(err));

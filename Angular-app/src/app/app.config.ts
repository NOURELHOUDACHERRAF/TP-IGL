// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes'; // Import the routes

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)] // Use provideRouter with the routes
};

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import {HttpClientModule} from '@angular/common/http'
import { provideHttpClient } from '@angular/common/http'; // 🔹 Importamos provideHttpClient


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(), // Requirido para as animacións
    provideToastr(), // Toastr provider
    provideHttpClient() 
  ]
};

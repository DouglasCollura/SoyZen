import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

export const appConfig: ApplicationConfig = {

  providers: [
    provideRouter(
      routes,
      withViewTransitions()
    ),
    provideAnimations(),
    importProvidersFrom(
      HttpClientModule
    ),
  ],
};

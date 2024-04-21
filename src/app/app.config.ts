import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { InMemoryScrollingFeature, InMemoryScrollingOptions, provideRouter, withHashLocation, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { jwtInterceptor } from './shared/jwt.interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
};
const inMemoryScrollingFeature: InMemoryScrollingFeature =
  withInMemoryScrolling(scrollConfig);
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withViewTransitions(),
      withHashLocation(),
      inMemoryScrollingFeature
    ),
    provideAnimations(),
    importProvidersFrom(
      HttpClientModule
    ),
    provideHttpClient(withInterceptors([jwtInterceptor])),
  ],
};

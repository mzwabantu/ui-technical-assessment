import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import {
  provideAnimations,
  provideNoopAnimations,
} from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideNoopAnimations(),
  ],
};

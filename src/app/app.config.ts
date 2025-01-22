import {
  ApplicationConfig,
  isDevMode,
  provideZoneChangeDetection,
} from "@angular/core";
import {
  provideAnimations,
  provideNoopAnimations,
} from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { provideHttpClient } from "@angular/common/http";
import { provideStore } from "@ngrx/store";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { provideEffects } from "@ngrx/effects";
import { appReducer } from "./core/state/app.reducer";
import { AppEffects } from "./core/state/app.effects";
import { DataService } from "./core/services/data.service";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideNoopAnimations(),
    provideHttpClient(),
    provideStore({ app: appReducer }),
    provideEffects([AppEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    DataService,
  ],
};

import { inject, Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import {
  logActivity,
  addActivitySuccess,
  addActivityFailure,
  loadActivity,
  loadActivitySuccess,
  loadActivityFailure,
} from "./app.actions";
import { catchError, map, switchMap } from "rxjs/operators";
import { of, Subscription } from "rxjs";
import { DataService } from "../services/data.service";

@Injectable()
export class AppEffects {
  $sub: Subscription = Subscription.EMPTY;

  private actions$ = inject(Actions);
  private dataService = inject(DataService);

  // Whenever activity is logged fire this
  logActivity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logActivity),
      switchMap(({ activity }) =>
        this.dataService.addActivity(activity).pipe(
          map((newActivity) => addActivitySuccess({ activity: newActivity })),
          catchError((error) =>
            of(addActivityFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );

  // When we refresh or load the page will load this
  loadActivity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadActivity),
      switchMap(() =>
        this.dataService.getActivity().pipe(
          map((activity) => loadActivitySuccess({ activity })),
          catchError((error) =>
            of(loadActivityFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );
}

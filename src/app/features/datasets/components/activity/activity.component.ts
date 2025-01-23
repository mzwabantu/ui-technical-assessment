import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { AsyncPipe, DatePipe, TitleCasePipe } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";

import { ToggleCardComponent } from "../../../../shared/components/toggle-card/toggle-card.component";
import { Activity } from "../../../../core/models/activity";
import { Store } from "@ngrx/store";
import { map, Observable } from "rxjs";
import { selectActivities } from "../../../../core/state/app.selectors";

@Component({
  selector: "app-activity",
  imports: [
    ToggleCardComponent,
    MatIconModule,
    TitleCasePipe,
    DatePipe,
    RouterLink,
    AsyncPipe,
  ],
  templateUrl: "./activity.component.html",
  styleUrl: "./activity.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityComponent {
  activities$: Observable<Activity[]>;

  constructor(private store: Store) {
    this.activities$ = this.store
      .select(selectActivities)
      .pipe(
        map((data) =>
          [...data]
            .sort(
              (a, b) =>
                new Date(b.timestamp).getTime() -
                new Date(a.timestamp).getTime(),
            )
            .slice(0, 3),
        ),
      );
  }
}

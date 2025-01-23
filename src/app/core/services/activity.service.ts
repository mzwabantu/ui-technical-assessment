import { inject, Injectable } from "@angular/core";
import { Activity, ActivityStatusType, ActivityType } from "../models/activity";
import { logActivity } from "../state/app.actions";
import { Store } from "@ngrx/store";
import { AppState } from "../state/app.state";

@Injectable({
  providedIn: "root",
})
export class ActivityService {
  private store = inject(Store<AppState>);

  logUserActivity(activity: Activity) {
    this.store.dispatch(
      logActivity({
        activity,
      }),
    );
  }

  getRandomActivity(): Activity {
    const activityTypes: ActivityType[] = ["login", "issue", "upload"];
    const activityStatuses: ActivityStatusType[] = [null, "Hydration Failed"];

    const randomType =
      activityTypes[Math.floor(Math.random() * activityTypes.length)];
    const randomStatus =
      activityStatuses[Math.floor(Math.random() * activityStatuses.length)];

    return {
      type: randomType,
      timestamp: new Date().toISOString(),
      username: "Jennifer Doe",
      dataset:
        randomType === "upload" || randomType === "issue"
          ? `Dataset ${Math.floor(Math.random() * 10) + 1}`
          : null,
      status: randomStatus,
    };
  }
}

import { createAction, props } from "@ngrx/store";
import { Activity } from "../models/activity";
import { Notification } from "../models/notification";

// Load Activity Actions
export const loadActivity = createAction("[App] Load Activity");
export const loadActivitySuccess = createAction(
  "[App] Load Activity Success",
  props<{ activity: any }>(),
);
export const loadActivityFailure = createAction(
  "[App] Load Activity Failure",
  props<{ error: string }>(),
);

// Add Activity Actions
export const logActivity = createAction(
  "[App] Log Activity",
  props<{ activity: Activity }>(),
);
export const addActivitySuccess = createAction(
  "[Activity] Add Activity Success",
  props<{ activity: Activity[] }>(),
);
export const addActivityFailure = createAction(
  "[Activity] Add Activity Failure",
  props<{ error: string }>(),
);

// Notification Actions
export const setNotifications = createAction(
  "[App] Set Notification",
  props<{ notifications: Notification[] }>(),
);
export const markNotificationAsRead = createAction(
  "[App] Mark Notification As Read",
  props<{ notificationId: string }>(),
);

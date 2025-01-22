import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "./app.state";

// Feature Selector
export const selectAppState = createFeatureSelector<AppState>("app");

// Select Activities
export const selectActivities = createSelector(
  selectAppState,
  (state) => state.activity,
);

// Select Notifications
export const selectNotifications = createSelector(
  selectAppState,
  (state) => state.notifications,
);

// Select Unread Notifications
export const selectUnreadNotifications = createSelector(
  selectNotifications,
  (notifications) => notifications.filter((n) => !n.read),
);

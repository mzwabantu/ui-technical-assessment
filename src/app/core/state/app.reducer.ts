import { createReducer, on } from "@ngrx/store";
import {
  logActivity,
  setNotifications,
  markNotificationAsRead,
  loadActivitySuccess,
  addActivitySuccess,
} from "./app.actions";
import { AppState } from "./app.state";

export const initialState: AppState = {
  activity: [],
  notifications: [],
};

export const appReducer = createReducer(
  initialState,
  // Logs Activity
  on(logActivity, (state, { activity }) => ({
    ...state,
    activity: [...state.activity, activity],
  })),
  // Adds the state when the initial activity is fetched successfully
  on(loadActivitySuccess, (state, { activity }) => ({
    ...state,
    activity,
    error: null,
  })),
  // Adds the state when the activity is addd
  on(addActivitySuccess, (state, { activity }) => ({
    ...state,
    activity,
    error: null,
  })),
  // Set Notifications
  on(setNotifications, (state, { notifications }) => ({
    ...state,
    notifications,
  })),
  // Mark Notification As Read
  on(markNotificationAsRead, (state, { notificationId }) => ({
    ...state,
    notifications: state.notifications.map((notification) =>
      notification.id === notificationId
        ? { ...notification, read: true }
        : notification,
    ),
  })),
);

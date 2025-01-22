import { Activity } from "../models/activity";
import { Notification } from "../models/notification";

export interface AppState {
  activity: Activity[];
  notifications: Notification[];
}

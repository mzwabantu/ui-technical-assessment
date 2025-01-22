export interface Activity {
  timestamp: string;
  type: ActivityType;
  username: string;
  dataset: null | string;
  status: ActivityStatusType;
}

export type ActivityType = "login" | "logout" | "issue" | "upload";
export type ActivityStatusType = "Hydration Failed" | null;

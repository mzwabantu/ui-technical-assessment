export interface Stats {
  title: string;
  value: number;
  trend: StatsType;
  percentage: number;
}

export type StatsType = "up" | "down";

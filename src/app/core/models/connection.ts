export interface Connection {
  name: string;
  type: "Secondary" | "Primary" | "Tertiary";
  lastSynced: string;
}

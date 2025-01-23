import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "dashboard",
    loadComponent: () =>
      import("./features/datasets/pages/dashboard/dashboard.component").then(
        (m) => m.DashboardComponent,
      ),
  },
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
  },
  {
    path: "placeholder",
    loadComponent: () =>
      import("./shared/components/placeholder/placeholder.component").then(
        (m) => m.PlaceholderComponent,
      ),
  },
  {
    path: "**",
    redirectTo: "placeholder",
  },
];

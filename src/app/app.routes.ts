import { Routes } from "@angular/router";
import { DashboardComponent } from "./features/datasets/pages/dashboard/dashboard.component";

export const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
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

import { Routes } from "@angular/router";
import { DashboardComponent } from "./features/datasets/pages/dashboard/dashboard.component";
import { PlaceholderComponent } from "./shared/components/placeholder/placeholder.component";

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
    component: PlaceholderComponent,
  },
  {
    path: "**",
    redirectTo: "placeholder",
  },
];

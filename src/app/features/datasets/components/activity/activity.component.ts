import { Component, Input } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { DatePipe, TitleCasePipe } from "@angular/common";
import { ToggleCardComponent } from "../../../../shared/components/toggle-card/toggle-card.component";
import { Activity } from "../../../../core/models/activity";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-activity",
  imports: [
    ToggleCardComponent,
    MatIconModule,
    TitleCasePipe,
    DatePipe,
    RouterLink,
  ],
  templateUrl: "./activity.component.html",
  styleUrl: "./activity.component.scss",
})
export class ActivityComponent {
  @Input() activity: Activity[] = [
    {
      timestamp: "2024-11-05T18:00:00Z",
      type: "login",
      username: "Jennifer Doe",
      dataset: null,
      status: null,
    },
    {
      timestamp: "2024-09-23T14:24:00Z",
      type: "upload",
      username: "Jennifer Doe",
      dataset: "Dataset 01",
      status: null,
    },
    {
      timestamp: "2024-08-17T10:30:00Z",
      type: "issue",
      username: "Jennifer Doe",
      dataset: "Dataset 03",
      status: "Hydration Failed",
    },
  ];
}

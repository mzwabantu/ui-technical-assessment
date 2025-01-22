import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  Signal,
  WritableSignal,
} from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { MatBadgeModule } from "@angular/material/badge";
import { A11yModule } from "@angular/cdk/a11y";
import { Profile } from "../../models/profile";
import { ActivityService } from "../../services/activity.service";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-header",
  imports: [
    MatBadgeModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    A11yModule,
    RouterLink,
  ],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  profile: WritableSignal<Profile> = signal({} as Profile);

  private activityService = inject(ActivityService);

  logout(): void {
    this.activityService.logUserActivity({
      type: "logout",
      timestamp: new Date().toISOString(),
      username: "Jennifer Doe",
      dataset: null,
      status: null,
    });
  }

  ngOnInit(): void {
    const profile = JSON.parse(localStorage.getItem("user") as string);

    if (profile) this.profile.set(profile);
  }
}

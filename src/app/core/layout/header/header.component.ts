import {
  ChangeDetectionStrategy,
  Component,
  signal,
  Signal,
} from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { MatBadgeModule } from "@angular/material/badge";
import { A11yModule } from "@angular/cdk/a11y";
import { Profile } from "../../models/profile";

@Component({
  selector: "app-header",
  imports: [
    MatBadgeModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    A11yModule,
  ],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  profile: Signal<Profile> = signal({
    name: "Jennifer Doe",
    organization: "BAnk ABC",
    activity: [],
  });
}

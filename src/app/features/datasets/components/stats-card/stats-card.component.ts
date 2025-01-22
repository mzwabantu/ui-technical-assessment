import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";

import { ToggleCardComponent } from "../../../../shared/components/toggle-card/toggle-card.component";
import { ColorCodeDirective } from "../../../../shared/directives/color-code.directive";
import { Stats } from "../../../../core/models/stats";

@Component({
  selector: "app-stats-card",
  imports: [
    MatIconModule,
    CommonModule,
    ColorCodeDirective,
    ToggleCardComponent,
  ],
  templateUrl: "./stats-card.component.html",
  styleUrl: "./stats-card.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsCardComponent {
  @Input() stats!: Stats;

  public statIcon = "north_east";
}

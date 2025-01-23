import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  signal,
} from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-toggle-card",
  imports: [CommonModule, MatIconModule, MatDividerModule],
  templateUrl: "./toggle-card.component.html",
  styleUrl: "./toggle-card.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleCardComponent implements OnChanges {
  @Input() title = "Card Title";
  @Input() largeTitle = false;
  @Input() hasHeader = false;
  @Input() route!: string;
  @Input() routeButtonShape: "round" | "square" = "square";
  @Input() cardStyle: "shadow" | "plain" = "plain";
  @Input() size: "sm" | "md" = "md";
  @Input() initialState: "closed" | "expanded" = "closed";
  @Input() hasToggle = true;
  @Input() spaceContentBottom = true;
  @Input() spaceContentTop = true;
  @Input() updateToggleIcon = true;

  // To toggle content section
  public isExpanded = signal<boolean>(false);

  constructor(private router: Router) {}

  // Switches arrow based on isExpanded
  public get toggleIcon(): "keyboard_arrow_down" | "keyboard_arrow_up" {
    if (!this.updateToggleIcon) return "keyboard_arrow_down";
    return this.isExpanded() ? "keyboard_arrow_up" : "keyboard_arrow_down";
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Set initial toggle state
    if (changes["initialState"]?.firstChange) {
      this.isExpanded.set(this.initialState === "expanded");
    }
  }

  // Toggle content
  toggleDetail(): void {
    if (!this.hasToggle) return;
    this.isExpanded.set(!this.isExpanded());
  }

  // Navigate to placeholder page
  goToPage() {
    if (!this.route) return;
    this.router.navigate([this.route]);
  }
}

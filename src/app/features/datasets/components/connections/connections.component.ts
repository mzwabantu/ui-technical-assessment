import { Component, Input } from "@angular/core";
import { DatePipe } from "@angular/common";

import { ToggleCardComponent } from "../../../../shared/components/toggle-card/toggle-card.component";
import { Connection } from "../../../../core/models/connection";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-connections",
  imports: [ToggleCardComponent, DatePipe, MatIconModule, MatDividerModule],
  templateUrl: "./connections.component.html",
})
export class ConnectionsComponent {
  @Input() connections: Connection[] = [];
}

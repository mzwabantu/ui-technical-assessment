import { Component, Input } from "@angular/core";
import { DatePipe } from "@angular/common";

import { ToggleCardComponent } from "../../../../shared/components/toggle-card/toggle-card.component";
import { Connection } from "../../../../core/models/connection";

@Component({
  selector: "app-connections",
  imports: [ToggleCardComponent, DatePipe],
  templateUrl: "./connections.component.html",
})
export class ConnectionsComponent {
  @Input() connections: Connection[] = [];
}

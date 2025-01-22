import { Component, Input } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";

@Component({
  selector: "app-banner",
  imports: [MatIconModule, MatMenuModule],
  templateUrl: "./banner.component.html",
  styleUrl: "./banner.component.scss",
})
export class BannerComponent {
  @Input() title = "Welcome, Mzwa";
  @Input() description = "You have 2 new notifications";
  @Input() imgSrc = "banner.png";
}

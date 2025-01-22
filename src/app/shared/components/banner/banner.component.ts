import {
  Component,
  inject,
  Input,
  OnInit,
  signal,
  Signal,
} from "@angular/core";
import { MatBadgeModule } from "@angular/material/badge";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { Store } from "@ngrx/store";
import { markNotificationAsRead } from "../../../core/state/app.actions";
import { Notification } from "../../../core/models/notification";
import { selectNotifications } from "../../../core/state/app.selectors";
import { map, Observable } from "rxjs";
import { AsyncPipe, CommonModule } from "@angular/common";

@Component({
  selector: "app-banner",
  imports: [
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    AsyncPipe,
    CommonModule,
  ],
  templateUrl: "./banner.component.html",
  styleUrl: "./banner.component.scss",
})
export class BannerComponent {
  @Input() title = "Welcome, Jennifer Doe";
  @Input() description = "";
  @Input() imgSrc = "banner.png";

  notificationsCount = 0;
  notifications$!: Observable<Notification[]>;

  constructor(private store: Store) {
    this.notifications$ = this.store.select(selectNotifications).pipe(
      map((data) => {
        this.notificationsCount = data.filter((d) => !d.read)?.length || 0;
        return data;
      }),
    );
  }

  // Markes notification as read
  onRead(notification: Notification) {
    this.store.dispatch(
      markNotificationAsRead({ notificationId: notification.id }),
    );
  }
}

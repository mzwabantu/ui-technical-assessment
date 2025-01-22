import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "./core/layout/header/header.component";
import { Store } from "@ngrx/store";
import { loadActivity, setNotifications } from "./core/state/app.actions";
import { DataService } from "./core/services/data.service";
import { take } from "rxjs";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit, OnDestroy {
  title = "UI Techinal Assessment";

  constructor(
    private store: Store,
    private dataService: DataService,
  ) {
    // Dispatches the loadActivity action to fetch the initial state
    this.store.dispatch(loadActivity());
  }

  ngOnInit(): void {
    this.dataService
      .getNotifications()
      .pipe(take(1))
      .subscribe((notifications) =>
        this.store.dispatch(setNotifications({ notifications })),
      );

    this.dataService
      .getProfile()
      .pipe(take(1))
      .subscribe((profile) =>
        localStorage.setItem("user", JSON.stringify(profile)),
      );
  }

  ngOnDestroy(): void {
    localStorage.removeItem("user");
  }
}

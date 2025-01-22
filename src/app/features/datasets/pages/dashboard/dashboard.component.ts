import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Inject,
  OnDestroy,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from "@angular/core";

import { ToggleCardComponent } from "../../../../shared/components/toggle-card/toggle-card.component";
import { ActivityComponent } from "../../components/activity/activity.component";
import { DataListComponent } from "../../../../shared/components/data-list/data-list.component";
import {
  Dataset,
  DatasetTypeEnum as DsEnum,
} from "../../../../core/models/dataset";
import { StatsCardComponent } from "../../components/stats-card/stats-card.component";
import { BannerComponent } from "../../../../shared/components/banner/banner.component";
import { DatasetsTableComponent } from "../../components/datasets-table/datasets-table.component";
import { Stats } from "../../../../core/models/stats";
import { Connection } from "../../../../core/models/connection";
import { ConnectionsComponent } from "../../components/connections/connections.component";
import { DataService } from "../../../../core/services/data.service";
import { map } from "rxjs/operators";
import { Observable, Subscription } from "rxjs";
import { AsyncPipe } from "@angular/common";
import { ActionType, Store } from "@ngrx/store";
import { AppState } from "../../../../core/state/app.state";
import { logActivity } from "../../../../core/state/app.actions";
import { ActivityType } from "../../../../core/models/activity";
import { ActivityService } from "../../../../core/services/activity.service";

@Component({
  selector: "app-dashboard",
  imports: [
    BannerComponent,
    StatsCardComponent,
    DatasetsTableComponent,
    ToggleCardComponent,
    ActivityComponent,
    DataListComponent,
    ConnectionsComponent,
    AsyncPipe,
  ],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit, OnDestroy {
  // Data Signals
  datasets: WritableSignal<Dataset[]> = signal([]);
  stats: WritableSignal<Stats[]> = signal([]);

  // Filtered Signals for each dataset type
  recentDatasets: Signal<Partial<Dataset>[]> = computed(() =>
    this.setDatasetByType(this.datasets(), DsEnum.RecentlyAvailableDatasets),
  );
  myDatasets: Signal<Partial<Dataset>[]> = computed(() =>
    this.setDatasetByType(this.datasets(), DsEnum.MyDatasets),
  );
  partnerDatasets: Signal<Partial<Dataset>[]> = computed(() =>
    this.setDatasetByType(this.datasets(), DsEnum.PartnerDatasets),
  );

  // Combined Filtered Datasets with Titles
  filteredDataSets: Signal<{ datasets: Partial<Dataset>[]; title: DsEnum }[]> =
    computed(() => [
      { datasets: this.myDatasets(), title: DsEnum.MyDatasets },
      {
        datasets: this.partnerDatasets(),
        title: DsEnum.PartnerDatasets,
      },
    ]);

  // Services
  private dataService = inject(DataService);
  private activityService = inject(ActivityService);

  // Subscriptions
  datasetsSub$: Subscription = Subscription.EMPTY;
  statsSub$: Subscription = Subscription.EMPTY;

  // Observables
  connections$!: Observable<Connection[]>;

  // Load required data
  ngOnInit(): void {
    this.loadDatasets();
    this.loadConnections();
    this.loadStats();
    this.activityService.logUserActivity(
      this.activityService.getRandomActivity(),
    );
  }

  // Fetch Datasets
  private loadDatasets(): void {
    this.datasetsSub$ = this.dataService.getDatasets().subscribe({
      next: (data) => this.datasets.set(data),
      error: (error) => console.log(error),
    });
  }

  // Fetch Connections
  private loadConnections(): void {
    this.connections$ = this.dataService.getConnections().pipe(map((c) => c));
  }

  // Fetch Stats
  private loadStats(): void {
    this.statsSub$ = this.dataService.getStats().subscribe({
      next: (data) => this.stats.set(data),
      error: (error) => console.log(error),
    });
  }

  // Method to filter Datasets by type
  private setDatasetByType(data: Dataset[], type: DsEnum): Partial<Dataset>[] {
    return data
      .filter((d) => (d.type as DsEnum) === type)
      .map((d) => ({ datasetName: d.datasetName, updated: d.updated }));
  }

  // Remove Subscriptions
  ngOnDestroy(): void {
    if (this.datasetsSub$) this.datasetsSub$.unsubscribe();
    if (this.statsSub$) this.statsSub$.unsubscribe();
  }
}

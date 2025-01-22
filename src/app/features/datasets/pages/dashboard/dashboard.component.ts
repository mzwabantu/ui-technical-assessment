import {
  Component,
  computed,
  Signal,
  signal,
  WritableSignal,
} from "@angular/core";

import { ToggleCardComponent } from "../../../../shared/components/toggle-card/toggle-card.component";
import { ActivityComponent } from "../../components/activity/activity.component";
import { DataListComponent } from "../../../../shared/components/data-list/data-list.component";
import { Dataset, DatasetTypeEnum } from "../../../../core/models/dataset";
import { StatsCardComponent } from "../../components/stats-card/stats-card.component";
import { BannerComponent } from "../../../../shared/components/banner/banner.component";
import { DatasetsTableComponent } from "../../components/datasets-table/datasets-table.component";
import { Stats } from "../../../../core/models/stats";
import { Connection } from "../../../../core/models/connection";
import { DatePipe } from "@angular/common";
import { ConnectionsComponent } from "../../components/connections/connections.component";

@Component({
  selector: "app-dashboard",
  imports: [
    BannerComponent,
    StatsCardComponent,
    DatasetsTableComponent,
    ToggleCardComponent,
    ActivityComponent,
    DataListComponent,
    DatePipe,
    ConnectionsComponent,
  ],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
})
export class DashboardComponent {
  // Datasets
  datasets: WritableSignal<Dataset[]> = signal([
    {
      id: "1",
      datasetName: "Dataset 01",
      uploadedBy: "Jeanette Edwards",
      updated: "2024-09-01",
      flagged: true,
      tooltip: "This dataset has been flagged as containing a high error rate.",
      type: "My Datasets" as DatasetTypeEnum,
    },
    {
      id: "1",
      datasetName: "Dataset 02",
      uploadedBy: "Melvin Fitzgerald",
      updated: "2024-09-17",
      flagged: false,
      type: "Recently Available Datasets" as DatasetTypeEnum,
    },
    {
      id: "1",
      datasetName: "Dataset 03",
      uploadedBy: "Jennifer Doe",
      updated: "2024-09-20",
      flagged: true,
      tooltip:
        "This dataset has been marked as possibly containing personal information.",
      type: "Partner Datasets" as DatasetTypeEnum,
    },
    {
      id: "1",
      datasetName: "Dataset 04",
      uploadedBy: "Lulu Morton",
      updated: "2024-09-01",
      flagged: false,
      type: "My Datasets" as DatasetTypeEnum,
    },
    {
      id: "1",
      datasetName: "Dataset 05",
      uploadedBy: "Robert Johnson",
      updated: "2024-10-05",
      flagged: false,
      type: "Partner Datasets" as DatasetTypeEnum,
    },
    {
      id: "1",
      datasetName: "Dataset 06",
      uploadedBy: "Melvin Fitzgerald",
      updated: "2024-09-25",
      flagged: true,
      tooltip: "This dataset has been flagged for potential duplicates.",
      type: "Recently Available Datasets" as DatasetTypeEnum,
    },
    {
      id: "1",
      datasetName: "Dataset 07",
      uploadedBy: "Jeanette Edwards",
      updated: "2024-09-30",
      flagged: false,
      type: "Partner Datasets" as DatasetTypeEnum,
    },
    {
      id: "1",
      datasetName: "Dataset 08",
      uploadedBy: "Jennifer Doe",
      updated: "2024-10-10",
      flagged: true,
      tooltip: "This dataset contains missing metadata.",
      type: "My Datasets" as DatasetTypeEnum,
    },
    {
      id: "1",
      datasetName: "Dataset 09",
      uploadedBy: "Lulu Morton",
      updated: "2024-08-20",
      flagged: false,
      type: "Recently Available Datasets" as DatasetTypeEnum,
    },
    {
      id: "1",
      datasetName: "Dataset 10",
      uploadedBy: "Robert Johnson",
      updated: "2024-09-15",
      flagged: false,
      type: "My Datasets" as DatasetTypeEnum,
    },
  ]);

  // Statistics
  stats: Signal<Stats[]> = signal([
    {
      title: "Dataset Reviews",
      value: 100,
      trend: "up",
      percentage: 10,
    },
    {
      title: "Failed Uploads",
      value: 10,
      trend: "down",
      percentage: 2,
    },
    {
      title: "Shared by Company",
      value: 15,
      trend: "up",
      percentage: 25,
    },
  ]);

  // Connections
  connections: Signal<Connection[]> = signal([
    {
      name: "Bank ABC",
      type: "Primary",
      lastSynced: "2024-11-03T10:00:00Z",
    },
    {
      name: "Partner XYZ",
      type: "Secondary",
      lastSynced: "2024-10-20T14:30:00Z",
    },
    {
      name: "DataHub Corp",
      type: "Tertiary",
      lastSynced: "2024-10-15T08:00:00Z",
    },
  ]);

  // Filtered Signals for each dataset type
  recentDatasets: Signal<Partial<Dataset>[]> = computed(() =>
    this.filterDatasetByType(
      this.datasets(),
      DatasetTypeEnum.RecentlyAvailableDatasets,
    ),
  );
  myDatasets: Signal<Partial<Dataset>[]> = computed(() =>
    this.filterDatasetByType(this.datasets(), DatasetTypeEnum.MyDatasets),
  );
  partnerDatasets: Signal<Partial<Dataset>[]> = computed(() =>
    this.filterDatasetByType(this.datasets(), DatasetTypeEnum.PartnerDatasets),
  );

  // Combined Filtered Datasets with Titles
  filteredDataSets: Signal<
    { datasets: Partial<Dataset>[]; title: DatasetTypeEnum }[]
  > = computed(() => [
    { datasets: this.myDatasets(), title: DatasetTypeEnum.MyDatasets },
    {
      datasets: this.partnerDatasets(),
      title: DatasetTypeEnum.PartnerDatasets,
    },
  ]);

  // Method to filter Datasets by type
  filterDatasetByType(
    data: Dataset[],
    type: DatasetTypeEnum,
  ): Partial<Dataset>[] {
    return data
      .filter((d) => (d.type as DatasetTypeEnum) === type)
      .map((d) => ({ datasetName: d.datasetName, updated: d.updated }));
  }
}

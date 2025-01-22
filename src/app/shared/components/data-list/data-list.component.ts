import { Component, Input } from "@angular/core";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatPaginatorModule } from "@angular/material/paginator";
import { DataTableComponent } from "../data-table/data-table.component";
import { Dataset } from "../../../core/models/dataset";
import { DataTableColumn } from "../../models/data-table-column";
import { ColumnOption } from "../../models/column-option";

@Component({
  selector: "app-data-list",
  imports: [
    MatButtonToggleModule,
    MatListModule,
    MatIconModule,
    MatPaginatorModule,
    DataTableComponent,
  ],
  templateUrl: "./data-list.component.html",
  styleUrl: "./data-list.component.scss",
})
export class DataListComponent<T> {
  @Input() datasets: Partial<Dataset>[] = [];

  // th and td styling options for this component
  columnOptions: ColumnOption = {
    "padding-left": "18px",
    "padding-right": "18px",
  };

  // Table columns
  columns: DataTableColumn[] = [
    { key: "datasetName", label: "", options: { ...this.columnOptions } },
    {
      key: "updated",
      label: "",
      options: { ...this.columnOptions, "text-align": "right" },
    },
  ];
}

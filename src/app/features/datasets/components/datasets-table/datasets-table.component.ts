import { Component, Input } from "@angular/core";

import { Dataset } from "../../../../core/models/dataset";
import { DataTableColumn } from "../../../../shared/models/data-table-column";
import { DataTableComponent } from "../../../../shared/components/data-table/data-table.component";

@Component({
  selector: "app-datasets-table",
  imports: [DataTableComponent],
  template: `
    <app-data-table [columns]="columns" [data]="datasets"></app-data-table>
  `,
})
export class DatasetsTableComponent {
  @Input() datasets: Dataset[] = [];

  // Columns for datasets table
  columns: DataTableColumn[] = [
    {
      key: "flagged",
      label: "",
      options: {
        "max-width": "60px",
        "text-align": "right",
        "padding-left": "34px",
      },
    },
    { key: "datasetName", label: "Dataset Name", canSort: true },
    { key: "uploadedBy", label: "Uploaded By", canSort: true },
    { key: "updated", label: "Updated", canSort: true },
    { key: "actions", label: "Actions" },
  ];
}

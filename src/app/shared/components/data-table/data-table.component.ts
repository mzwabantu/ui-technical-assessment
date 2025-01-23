import { CommonModule } from "@angular/common";
import {
  AfterViewInit,
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSort, MatSortModule, Sort } from "@angular/material/sort";

import { Dataset } from "../../../core/models/dataset";
import { DataTableColumn } from "../../models/data-table-column";
import { ColumnOption } from "../../models/column-option";
import { Router } from "@angular/router";
import { LiveAnnouncer } from "@angular/cdk/a11y";

@Component({
  selector: "app-data-table",
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
  ],
  templateUrl: "./data-table.component.html",
  styleUrls: ["./data-table.component.scss"],
})
export class DataTableComponent<T> implements OnChanges, AfterViewInit {
  @Input() hasBorder = true;
  @Input() hasHeader = true;
  @Input() hidePageSize = false;
  @Input() hideRangeLabel = false;
  @Input() data: Partial<T>[] = [];
  @Input() columns: DataTableColumn[] = [];

  // Table resources
  displayedColumnKeys: string[] = [];
  dataSource!: MatTableDataSource<Partial<T>>;

  private _liveAnnouncer = inject(LiveAnnouncer);

  // Grabs paginator element from DOM
  @ViewChild("paginator")
  paginator!: MatPaginator;

  // Grabs MatSort instance from the DOM
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["data"]) {
      // Assigns input data to MatTable
      this.dataSource = new MatTableDataSource<Partial<T>>(this.data);
    }
  }

  ngAfterViewInit(): void {
    // Initialize displayed columns based on the keys in `columns`
    this.displayedColumnKeys = this.columns.map((col) => col.key);
    this.dataSource.paginator = this.paginator;
    // Bind sort to MatTableDataSource
    this.dataSource.sort = this.sort;
  }

  // Routes to placeholder page
  viewDetails(element: Dataset): void {
    this.router.navigate(["/datasets", element.id]);
  }

  // Applies specific css properties to style th and td elements
  applyColumnOptions(options?: ColumnOption): ColumnOption {
    if (!options) return {};
    return {
      "max-width": options["max-width"] || "100%",
      "text-align": options["text-align"] || "left",
      "padding-left": options["padding-left"] || "revert-layer",
      "padding-right": options["padding-right"] || "revert-layer",
    };
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce("Sorting cleared");
    }
  }
}

import { ColumnOption } from "./column-option";

export interface DataTableColumn {
  key: string;
  label: string;
  options?: ColumnOption;
}

export interface Dataset {
  id: string;
  datasetName: string;
  uploadedBy: string;
  updated: string;
  flagged: boolean;
  marked: boolean;
  type: DatasetTypeEnum;
  flaggedTooltip?: string;
  markedTooltip?: string;
}

export enum DatasetTypeEnum {
  MyDatasets = "My Datasets",
  PartnerDatasets = "Partner Datasets",
  RecentlyAvailableDatasets = "Recently Available Datasets",
}

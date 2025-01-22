export interface Dataset {
  id: string;
  datasetName: string;
  uploadedBy: string;
  updated: string;
  flagged: boolean;
  tooltip?: string;
  type: DatasetTypeEnum;
}

export enum DatasetTypeEnum {
  MyDatasets = "My Datasets",
  PartnerDatasets = "Partner Datasets",
  RecentlyAvailableDatasets = "Recently Available Datasets",
}

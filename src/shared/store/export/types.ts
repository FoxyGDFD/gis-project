export type ExportMapStoreVariables = {
  isScreening: boolean,
  type: string;
};

export type ExportMapStoreMethods = {
  setScreening: (isScreening: boolean) => void
  setType: (type: string) => void
};

export type ExportMapStoreState = ExportMapStoreVariables & ExportMapStoreMethods;

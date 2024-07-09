import { create } from "zustand";
import { ExportMapStoreState } from "./types";

export const useExportMapStore = create<ExportMapStoreState>()((set) =>({
    type: '',
    isScreening: false,

    setScreening(isScreening: boolean) {
        set({ isScreening })
    },
    setType(type: string) {
        set({ type })
    },
   
}))
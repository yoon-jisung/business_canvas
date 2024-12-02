import { create } from 'zustand';

import { RecordsType } from '@/entities/record';

export type FilterStore = {
  filters: Partial<RecordsType>;
  setFilter: (field: keyof RecordsType, value: string) => void;
  clearFilters: () => void;
};

export const useFilterStore = create<FilterStore>((set) => ({
  filters: {},
  setFilter: (field, values) =>
    set((state) => ({
      filters: Object.fromEntries(
        Object.entries({
          ...state.filters,
          [field]: values.length > 0 ? values : undefined
        }).filter(([, value]) => value !== undefined)
      )
    })),
  clearFilters: () => set({ filters: {} })
}));

import { create } from 'zustand';

import { RecordsType } from './record.types';

export type RecordState = {
  records: RecordsType[];
  setRecords: (records: RecordsType[]) => void;
  addRecord: (record: RecordsType) => void;
  updateRecord: (id: string, record: Partial<RecordsType>) => void;
  deleteRecord: (id: string) => void;
};

export const useRecordStore = create<RecordState>((set) => ({
  records: [],
  setRecords: (records) => set({ records }),
  addRecord: (record) => set((state) => ({ records: [...state.records, record] })),
  updateRecord: (id, updatedRecord) =>
    set((state) => ({
      records: state.records.map((record) =>
        record.id === id ? { ...record, ...updatedRecord } : record
      )
    })),
  deleteRecord: (id) =>
    set((state) => ({
      records: state.records.filter((record) => record.id !== id)
    }))
}));

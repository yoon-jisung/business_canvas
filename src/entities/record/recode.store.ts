import { create } from 'zustand';

import { Record } from './record.types';

type RecordState = {
  records: Record[];
  setRecords: (records: Record[]) => void;
  addRecord: (record: Record) => void;
  updateRecord: (id: string, record: Partial<Record>) => void;
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

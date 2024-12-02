import { create } from 'zustand';

import { RecordsType } from '@/entities/record';

import { recordService } from './record.service';

type RecordState = {
  records: RecordsType[];
  isOpen: boolean;
  loading: boolean;
  loadRecords: () => Promise<void>;
  addRecord: (record: Omit<RecordsType, 'id'>) => Promise<void>;
  updateRecord: (id: string, record: Partial<RecordsType>) => Promise<void>;
  deleteRecord: (id: string) => Promise<void>;
  open: () => void;
  close: () => void;
  editRecord: RecordsType | null;
  setEditRecord: (record: RecordsType | null) => void;
};

export const useRecordStore = create<RecordState>((set) => ({
  records: [],
  isOpen: false,
  loading: false,
  loadRecords: async () => {
    try {
      set({ loading: true });
      const records = await recordService.getRecords();
      set({ records });
    } catch (error) {
      console.error('레코드 로드 실패:', error);
    } finally {
      set({ loading: false });
    }
  },
  addRecord: async (record) => {
    try {
      const newRecord = await recordService.createRecord(record);
      set((state) => ({ records: [...state.records, newRecord] }));
    } catch (error) {
      console.error('레코드 추가 실패:', error);
    }
  },
  updateRecord: async (id, updatedRecord) => {
    try {
      const updated = await recordService.updateRecord(id, updatedRecord);
      set((state) => ({
        records: state.records.map((r) => (r.id === id ? updated : r))
      }));
    } catch (error) {
      console.error('레코드 수정 실패:', error);
    }
  },
  deleteRecord: async (id) => {
    try {
      await recordService.deleteRecord(id);
      set((state) => ({
        records: state.records.filter((r) => r.id !== id)
      }));
    } catch (error) {
      console.error('레코드 삭제 실패:', error);
    }
  },
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  editRecord: null,
  setEditRecord: (record) => set({ editRecord: record })
}));

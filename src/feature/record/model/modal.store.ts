import { create } from 'zustand';

import type { Record } from '@/entities/record';

type RecordStore = {
  records: Record[];
  setRecords: (records: Record[]) => void;
};

type ModalStore = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const useRecordStore = create<RecordStore & ModalStore>((set) => ({
  records: [],
  setRecords: (records) => set({ records }),
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false })
}));

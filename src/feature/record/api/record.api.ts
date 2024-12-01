import type { Record } from '@/entities/record';

import { recordService } from '../model/record.service';

export const recordApi = {
  getRecords: () => recordService.getRecords(),

  createRecord: (record: Omit<Record, 'id' | 'createdAt' | 'updatedAt'>) =>
    recordService.createRecord(record),

  updateRecord: (id: string, updates: Partial<Record>) => recordService.updateRecord(id, updates),

  deleteRecord: (id: string) => recordService.deleteRecord(id),

  filterRecords: (filters: Partial<Record>) => recordService.filterRecords(filters)
};

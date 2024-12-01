// src/features/record/model/record.service.ts
import { Record } from '@/entities/record';
import { storage } from '@/shared/lib';

import { INITIAL_RECORDS } from './constant';

const STORAGE_KEY = 'records';

type RecordKey = keyof Record;
type FilterableFields = 'name' | 'address' | 'memo';

class RecordService {
  private isStringField(key: RecordKey): key is FilterableFields {
    return ['name', 'address', 'memo'].includes(key);
  }

  private async setRecords(records: Record[]): Promise<void> {
    try {
      await storage.setItem(STORAGE_KEY, JSON.stringify(records));
    } catch (error) {
      console.error('레코드 저장 실패:', error);
      throw new Error('레코드를 저장하는데 실패했습니다.');
    }
  }

  async getRecords(): Promise<Record[]> {
    try {
      const data = await storage.getItem(STORAGE_KEY);
      if (!data) {
        await this.setRecords(INITIAL_RECORDS);
        return INITIAL_RECORDS;
      }
      return JSON.parse(data);
    } catch (error) {
      console.error('레코드 조회 실패:', error);
      return [];
    }
  }

  async createRecord(record: Omit<Record, 'id' | 'createdAt' | 'updatedAt'>): Promise<Record> {
    try {
      const records = await this.getRecords();
      const newRecord: Record = {
        ...record,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const updatedRecords = [...records, newRecord];
      await this.setRecords(updatedRecords);

      return newRecord;
    } catch (error) {
      console.error('레코드 생성 실패:', error);
      throw new Error('레코드를 생성하는데 실패했습니다.');
    }
  }

  async updateRecord(id: string, updates: Partial<Record>): Promise<Record> {
    try {
      const records = await this.getRecords();
      const recordIndex = records.findIndex((record) => record.id === id);

      if (recordIndex === -1) {
        throw new Error('레코드를 찾을 수 없습니다.');
      }

      const updatedRecord = {
        ...records[recordIndex],
        ...updates,
        updatedAt: new Date().toISOString()
      };

      records[recordIndex] = updatedRecord;
      await this.setRecords(records);

      return updatedRecord;
    } catch (error) {
      console.error('레코드 수정 실패:', error);
      throw new Error('레코드를 수정하는데 실패했습니다.');
    }
  }

  async deleteRecord(id: string): Promise<void> {
    try {
      const records = await this.getRecords();
      const updatedRecords = records.filter((record) => record.id !== id);
      await this.setRecords(updatedRecords);
    } catch (error) {
      console.error('레코드 삭제 실패:', error);
      throw new Error('레코드를 삭제하는데 실패했습니다.');
    }
  }

  async filterRecords(filters: Partial<Record>): Promise<Record[]> {
    try {
      const records = await this.getRecords();
      return records.filter((record) => {
        return Object.entries(filters).every(([key, value]) => {
          const recordKey = key as RecordKey;

          if (value === undefined || value === '') {
            return true;
          }

          if (this.isStringField(recordKey)) {
            const recordValue = record[recordKey];
            return (
              typeof recordValue === 'string' &&
              recordValue.toLowerCase().includes((value as string).toLowerCase())
            );
          }

          return record[recordKey] === value;
        });
      });
    } catch (error) {
      console.error('레코드 필터링 실패:', error);
      return [];
    }
  }
}

export const recordService = new RecordService();

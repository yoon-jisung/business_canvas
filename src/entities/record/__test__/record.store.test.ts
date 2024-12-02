import { describe, it, expect, beforeEach } from 'vitest';

import { RecordState, useRecordStore } from '@/entities/record/recode.store';
import { RecordsType } from '@/entities/record/record.types';

describe('레코드 스토어 테스트', () => {
  const mockRecord: RecordsType = {
    id: '1',
    name: '홍길동',
    address: '서울시',
    memo: '테스트',
    joinDate: '2024-03-15',
    job: '개발자',
    emailSubscribed: false
  };

  beforeEach(() => {
    const initialState: Partial<RecordState> = { records: [] };
    useRecordStore.setState(initialState);
  });

  describe('초기 상태', () => {
    it('records 배열이 비어있어야 함', () => {
      const { records } = useRecordStore.getState();
      expect(records).toHaveLength(0);
    });
  });

  describe('setRecords 액션', () => {
    it('records 배열을 새로운 배열로 대체해야 함', () => {
      const newRecords = [mockRecord];
      useRecordStore.getState().setRecords(newRecords);

      const { records } = useRecordStore.getState();
      expect(records).toEqual(newRecords);
    });
  });

  describe('addRecord 액션', () => {
    it('새로운 레코드를 records 배열에 추가해야 함', () => {
      useRecordStore.getState().addRecord(mockRecord);

      const { records } = useRecordStore.getState();
      expect(records).toHaveLength(1);
      expect(records[0]).toEqual(mockRecord);
    });
  });

  describe('updateRecord 액션', () => {
    beforeEach(() => {
      useRecordStore.getState().addRecord(mockRecord);
    });

    it('기존 레코드를 업데이트해야 함', () => {
      const updatedFields = { name: '김철수' };
      useRecordStore.getState().updateRecord('1', updatedFields);

      const { records } = useRecordStore.getState();
      expect(records[0]).toEqual({ ...mockRecord, ...updatedFields });
    });

    it('존재하지 않는 ID에 대해서는 아무 변화가 없어야 함', () => {
      useRecordStore.getState().updateRecord('999', { name: '김철수' });

      const { records } = useRecordStore.getState();
      expect(records[0]).toEqual(mockRecord);
    });
  });

  describe('deleteRecord 액션', () => {
    beforeEach(() => {
      useRecordStore.getState().addRecord(mockRecord);
    });

    it('ID에 해당하는 레코드를 삭제해야 함', () => {
      useRecordStore.getState().deleteRecord('1');

      const { records } = useRecordStore.getState();
      expect(records).toHaveLength(0);
    });

    it('존재하지 않는 ID에 대해서는 아무 변화가 없어야 함', () => {
      useRecordStore.getState().deleteRecord('999');

      const { records } = useRecordStore.getState();
      expect(records).toHaveLength(1);
      expect(records[0]).toEqual(mockRecord);
    });
  });
});

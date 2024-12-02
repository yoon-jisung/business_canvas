import { describe, it, expect, vi, beforeEach } from 'vitest';

import { JobType } from '@/entities/record';

import { recordService } from '../record.service';
import { useRecordStore } from '../record.store';

vi.mock('../record.service', () => ({
  recordService: {
    getRecords: vi.fn(),
    createRecord: vi.fn(),
    updateRecord: vi.fn(),
    deleteRecord: vi.fn()
  }
}));

describe('record UI 스토어', () => {
  const mockRecord = {
    id: '1',
    name: '홍길동',
    address: '서울시',
    memo: '테스트',
    joinDate: '2024-03-15',
    job: '개발자' as JobType,
    emailSubscribed: false
  };

  beforeEach(() => {
    vi.clearAllMocks();
    useRecordStore.setState({
      records: [],
      isOpen: false,
      loading: false,
      editRecord: null
    });
  });

  describe('초기 상태', () => {
    it('기본값이 올바르게 설정되어야 함', () => {
      const state = useRecordStore.getState();
      expect(state.records).toEqual([]);
      expect(state.isOpen).toBe(false);
      expect(state.loading).toBe(false);
      expect(state.editRecord).toBeNull();
    });
  });

  describe('loadRecords', () => {
    it('레코드를 로드하고 상태를 업데이트해야 함', async () => {
      const mockRecords = [mockRecord];
      vi.mocked(recordService.getRecords).mockResolvedValueOnce(mockRecords);

      await useRecordStore.getState().loadRecords();

      expect(recordService.getRecords).toHaveBeenCalled();
      expect(useRecordStore.getState().records).toEqual(mockRecords);
    });

    it('로딩 상태를 적절히 관리해야 함', async () => {
      vi.mocked(recordService.getRecords).mockResolvedValueOnce([]);

      const loadRecords = useRecordStore.getState().loadRecords();
      expect(useRecordStore.getState().loading).toBe(true);

      await loadRecords;
      expect(useRecordStore.getState().loading).toBe(false);
    });
  });

  describe('addRecord', () => {
    it('새로운 레코드를 추가해야 함', async () => {
      const newRecord = { ...mockRecord };
      vi.mocked(recordService.createRecord).mockResolvedValueOnce(newRecord);

      await useRecordStore.getState().addRecord(newRecord);

      expect(recordService.createRecord).toHaveBeenCalledWith(newRecord);
      expect(useRecordStore.getState().records).toContainEqual(newRecord);
    });
  });

  describe('updateRecord', () => {
    it('기존 레코드를 수정해야 함', async () => {
      const updatedRecord = { ...mockRecord, name: '김철수' };
      vi.mocked(recordService.updateRecord).mockResolvedValueOnce(updatedRecord);

      useRecordStore.setState({ records: [mockRecord] });
      await useRecordStore.getState().updateRecord('1', { name: '김철수' });

      expect(recordService.updateRecord).toHaveBeenCalledWith('1', { name: '김철수' });
      expect(useRecordStore.getState().records[0]).toEqual(updatedRecord);
    });
  });

  describe('deleteRecord', () => {
    it('레코드를 삭제해야 함', async () => {
      useRecordStore.setState({ records: [mockRecord] });
      await useRecordStore.getState().deleteRecord('1');

      expect(recordService.deleteRecord).toHaveBeenCalledWith('1');
      expect(useRecordStore.getState().records).toHaveLength(0);
    });
  });

  describe('모달 상태 관리', () => {
    it('모달을 열고 닫을 수 있어야 함', () => {
      const store = useRecordStore.getState();

      store.open();
      expect(useRecordStore.getState().isOpen).toBe(true);

      store.close();
      expect(useRecordStore.getState().isOpen).toBe(false);
    });
  });

  describe('editRecord 상태 관리', () => {
    it('수정할 레코드를 설정하고 초기화할 수 있어야 함', () => {
      const store = useRecordStore.getState();

      store.setEditRecord(mockRecord);
      expect(useRecordStore.getState().editRecord).toEqual(mockRecord);

      store.setEditRecord(null);
      expect(useRecordStore.getState().editRecord).toBeNull();
    });
  });
});

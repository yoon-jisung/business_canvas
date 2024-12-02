import { vi, describe, it, expect, beforeEach } from 'vitest';

import type { JobType, RecordsType } from '@/entities/record';
import { storage } from '@/shared/lib';

import { INITIAL_RECORDS } from '../constant';
import { recordService } from '../record.service';

vi.mock('@/shared/lib', () => ({
  storage: {
    getItem: vi.fn(),
    setItem: vi.fn()
  }
}));

describe('RecordService 테스트', () => {
  const mockRecord: RecordsType = {
    id: '1',
    name: 'John Doe',
    address: '서울시 강남구',
    memo: '테스트',
    joinDate: '2024-03-15',
    job: '개발자',
    emailSubscribed: true
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getRecords 메서드', () => {
    it('저장된 데이터가 없을 경우 초기 데이터를 반환해야 함', async () => {
      vi.mocked(storage.getItem).mockResolvedValueOnce(null);

      const records = await recordService.getRecords();

      expect(records).toEqual(INITIAL_RECORDS);
      expect(storage.setItem).toHaveBeenCalledWith('records', JSON.stringify(INITIAL_RECORDS));
    });

    it('저장된 데이터가 있을 경우 해당 데이터를 반환해야 함', async () => {
      const mockData = [mockRecord];
      vi.mocked(storage.getItem).mockResolvedValueOnce(JSON.stringify(mockData));

      const records = await recordService.getRecords();

      expect(records).toEqual(mockData);
    });

    it('에러 발생 시 빈 배열을 반환해야 함', async () => {
      vi.mocked(storage.getItem).mockRejectedValueOnce(new Error('에러 발생'));

      const records = await recordService.getRecords();

      expect(records).toEqual([]);
    });
  });

  describe('createRecord 메서드', () => {
    it('새로운 레코드를 생성해야 함', async () => {
      const newRecordData = {
        name: '홍길동',
        address: '서울시',
        memo: '메모',
        joinDate: '2024-03-15',
        job: '개발자' as JobType,
        emailSubscribed: true
      };

      vi.mocked(storage.getItem).mockResolvedValueOnce(JSON.stringify([]));

      const result = await recordService.createRecord(newRecordData);

      expect(result.id).toBeDefined();
      expect(result).toEqual(expect.objectContaining(newRecordData));
    });
  });

  describe('updateRecord 메서드', () => {
    it('존재하는 레코드를 수정해야 함', async () => {
      const mockRecords = [mockRecord];
      vi.mocked(storage.getItem).mockResolvedValueOnce(JSON.stringify(mockRecords));

      const updates = { name: '김철수' };
      const result = await recordService.updateRecord('1', updates);

      expect(result.name).toBe('김철수');
      expect(result.id).toBe('1');
    });

    it('존재하지 않는 레코드 수정 시 에러를 발생시켜야 함', async () => {
      vi.mocked(storage.getItem).mockResolvedValueOnce(JSON.stringify([]));

      await expect(recordService.updateRecord('999', { name: '김철수' })).rejects.toThrow(
        '레코드를 수정하는데 실패했습니다.'
      );
    });
  });

  describe('deleteRecord 메서드', () => {
    it('레코드를 삭제해야 함', async () => {
      const mockRecords = [mockRecord];
      vi.mocked(storage.getItem).mockResolvedValueOnce(JSON.stringify(mockRecords));

      await recordService.deleteRecord('1');

      expect(storage.setItem).toHaveBeenCalledWith('records', JSON.stringify([]));
    });
  });

  describe('filterRecords 메서드', () => {
    it('문자열 필드로 필터링해야 함', async () => {
      const mockRecords = [mockRecord];
      vi.mocked(storage.getItem).mockResolvedValueOnce(JSON.stringify(mockRecords));

      const result = await recordService.filterRecords({ name: 'John' });

      expect(result).toHaveLength(1);
      expect(result[0].name).toContain('John');
    });

    it('정확한 값 매칭으로 필터링해야 함', async () => {
      const mockRecords = [mockRecord];
      vi.mocked(storage.getItem).mockResolvedValueOnce(JSON.stringify(mockRecords));

      const result = await recordService.filterRecords({
        emailSubscribed: true
      });

      expect(result).toHaveLength(1);
      expect(result[0].emailSubscribed).toBe(true);
    });

    it('빈 필터값은 무시해야 함', async () => {
      const mockRecords = [mockRecord];
      vi.mocked(storage.getItem).mockResolvedValueOnce(JSON.stringify(mockRecords));

      const result = await recordService.filterRecords({
        name: '',
        address: undefined
      });

      expect(result).toEqual(mockRecords);
    });
  });
});

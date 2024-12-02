import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import type { RecordsType } from '@/entities/record';

import { useFilteredRecords } from './useFilteredRecords';

describe('useFilteredRecords 훅 테스트', () => {
  const mockRecords: RecordsType[] = [
    {
      id: '1',
      name: 'John Doe',
      address: '서울시 강남구',
      memo: '메모1',
      joinDate: '2024-03-15',
      job: '개발자',
      emailSubscribed: true
    },
    {
      id: '2',
      name: 'Foo Bar',
      address: '서울시 서초구',
      memo: '메모2',
      joinDate: '2024-03-16',
      job: 'PO',
      emailSubscribed: false
    }
  ];

  describe('기본 동작', () => {
    it('필터가 없을 때 모든 레코드를 반환해야 함', () => {
      const { result } = renderHook(() => useFilteredRecords(mockRecords, {}));
      expect(result.current).toEqual(mockRecords);
    });
  });

  describe('문자열 필드 필터링', () => {
    it('이름으로 필터링해야 함', () => {
      const { result } = renderHook(() => useFilteredRecords(mockRecords, { name: '홍길동' }));
      expect(result.current).toHaveLength(1);
      expect(result.current[0].name).toBe('홍길동');
    });

    it('주소로 부분 일치 검색이 되어야 함', () => {
      const { result } = renderHook(() => useFilteredRecords(mockRecords, { address: '강남' }));
      expect(result.current).toHaveLength(1);
      expect(result.current[0].address).toContain('강남');
    });

    it('직업으로 필터링해야 함', () => {
      const { result } = renderHook(() => useFilteredRecords(mockRecords, { job: '개발자' }));
      expect(result.current).toHaveLength(1);
      expect(result.current[0].job).toBe('개발자');
    });
  });

  describe('다중 필터', () => {
    it('여러 조건으로 필터링해야 함', () => {
      const { result } = renderHook(() =>
        useFilteredRecords(mockRecords, {
          address: '서울시',
          job: '개발자'
        })
      );
      expect(result.current).toHaveLength(2);
      expect(result.current[0].name).toBe('John Doe');
    });
  });

  describe('빈 값 처리', () => {
    it('빈 문자열 필터는 무시되어야 함', () => {
      const { result } = renderHook(() => useFilteredRecords(mockRecords, { name: '' }));
      expect(result.current).toEqual(mockRecords);
    });

    it('undefined 필터는 무시되어야 함', () => {
      const { result } = renderHook(() => useFilteredRecords(mockRecords, { name: undefined }));
      expect(result.current).toEqual(mockRecords);
    });
  });
});

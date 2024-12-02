import { describe, it, expect, beforeEach } from 'vitest';

import { useFilterStore, type FilterStore } from '../filter.store';

describe('필터 스토어 테스트', () => {
  beforeEach(() => {
    const initialState: Partial<FilterStore> = { filters: {} };
    useFilterStore.setState(initialState);
  });

  describe('초기 상태', () => {
    it('filters 객체가 비어있어야 함', () => {
      const { filters } = useFilterStore.getState();
      expect(filters).toEqual({});
    });
  });

  describe('setFilter 액션', () => {
    it('필터 값을 설정해야 함', () => {
      useFilterStore.getState().setFilter('name', 'John');
      const { filters } = useFilterStore.getState();
      expect(filters.name).toBe('John');
    });

    it('빈 문자열이 전달되면 해당 필드를 제거해야 함', () => {
      useFilterStore.getState().setFilter('name', 'John');
      useFilterStore.getState().setFilter('name', '');

      const { filters } = useFilterStore.getState();
      expect(filters.name).toBeUndefined();
    });

    it('여러 필드에 대한 필터를 설정할 수 있어야 함', () => {
      const store = useFilterStore.getState();
      store.setFilter('name', 'John');
      store.setFilter('job', '개발자');

      const { filters } = useFilterStore.getState();
      expect(filters).toEqual({
        name: 'John',
        job: '개발자'
      });
    });
  });

  describe('clearFilters 액션', () => {
    it('모든 필터를 초기화해야 함', () => {
      const store = useFilterStore.getState();
      store.setFilter('name', 'John');
      store.setFilter('job', '개발자');

      store.clearFilters();

      const { filters } = useFilterStore.getState();
      expect(filters).toEqual({});
    });
  });

  describe('emailSubscribed 필터', () => {
    it('boolean 값을 문자열로 처리해야 함', () => {
      useFilterStore.getState().setFilter('emailSubscribed', 'true');
      const { filters } = useFilterStore.getState();
      expect(filters.emailSubscribed).toBe('true');
    });
  });
});

'use client';

import React, { useEffect } from 'react';

import { useFilteredRecords } from '@/feature/record/hooks/useFilteredRecords';
import { useFilterStore } from '@/feature/record/model/filter.store';
import { useRecordStore } from '@/feature/record/model/record.store';
import { PlusIcon } from '@/shared/ui/icons';

import { RecordTable } from './RecordTable';

export function RecordListUI(): React.ReactElement {
  const filters = useFilterStore((state) => state.filters);
  const { records, loadRecords, open } = useRecordStore();

  const filteredRecords = useFilteredRecords(records, filters);

  useEffect(() => {
    loadRecords();
  }, [loadRecords]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between px-2 py-3.5">
        <h1 className="text-xl font-semibold">회원 목록</h1>
        <button
          type="button"
          onClick={open}
          className="flex items-center justify-center gap-2 rounded-[8px] bg-[#4A7CFE] px-4 py-2 text-white hover:bg-blue-600"
        >
          <i>
            <PlusIcon />
          </i>
          <span>추가</span>
        </button>
      </div>
      <RecordTable records={records} filteredRecords={filteredRecords} />
    </div>
  );
}

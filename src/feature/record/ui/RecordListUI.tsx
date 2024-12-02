'use client';

import React, { useEffect, useState } from 'react';

import { Record } from '@/entities/record';
import { useRecordStore } from '@/feature/record/model/modal.store';
import { PlusIcon } from '@/shared/ui/icons';

import { recordService } from '../model/record.service';

import { RecordTable } from './RecordTable';

export function RecordListUI(): React.ReactElement {
  const [records, setRecords] = useState<Record[]>([]);
  const { open } = useRecordStore();
  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async (): Promise<void> => {
    const data = await recordService.getRecords();
    setRecords(data);
  };

  const handleEdit = (record: Record): void => {
    // TODO: 수정 기능 구현
  };

  const handleDelete = async (id: string): Promise<void> => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      await recordService.deleteRecord(id);
      await loadRecords();
    }
  };

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
      <RecordTable records={records} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

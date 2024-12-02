import React, { useState, useRef, useEffect } from 'react';

import { type RecordsType } from '@/entities/record';
import { useRecordStore } from '@/feature/record/model/record.store';

type MoreOptionsButtonProps = {
  record: RecordsType;
};

export function MoreOptionsButton({ record }: MoreOptionsButtonProps): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const { loadRecords, setEditRecord, open, deleteRecord } = useRecordStore();

  const handleClickOutside = (event: MouseEvent): void => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleDelete = async (id: string): Promise<void> => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      await deleteRecord(id);
      await loadRecords();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-8 w-8 items-center justify-center rounded hover:bg-gray-100"
      >
        ⋮
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-1 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <button
              onClick={() => {
                setEditRecord(record);
                open();
                setIsOpen(false);
              }}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
            >
              수정
            </button>
            <button
              onClick={() => {
                handleDelete(record.id);
                setIsOpen(false);
              }}
              className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
            >
              삭제
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

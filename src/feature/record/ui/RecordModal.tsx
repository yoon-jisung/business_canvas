'use client';
import React, { useMemo, useState } from 'react';

import { RecordsType } from '@/entities/record';
import { useRecordStore } from '@/feature/record/model/record.store';
import { RecordForm } from '@/feature/record/ui/RecordForm';
import { CloseIcon } from '@/shared/ui/icons';
import { Modal } from '@/shared/ui/modal';

type ModalMode = 'create' | 'edit';

export function RecordModal(): React.ReactElement {
  const { isOpen, close, addRecord, updateRecord, loadRecords, editRecord, setEditRecord } =
    useRecordStore();
  const [mode, setMode] = useState<ModalMode>('create');

  const handleSubmit = async (data: RecordsType): Promise<void> => {
    try {
      if (mode === 'edit' && editRecord) {
        await updateRecord(editRecord.id, data);
      } else {
        await addRecord(data);
      }
      setEditRecord(null);
      await loadRecords();
      close();
    } catch (error) {
      console.error('레코드 추가 실패:', error);
    }
  };

  const handleModalClose = (): void => {
    setEditRecord(null);
    close();
  };
  const title = mode === 'edit' ? '회원 수정' : '회원 추가';

  useMemo(
    () =>
      setMode(() => {
        return editRecord ? 'edit' : 'create';
      }),
    [editRecord]
  );
  return (
    <Modal isOpen={isOpen} onClose={handleModalClose}>
      <div className="flex items-center justify-between border-b border-[#F0F0F0] px-4 py-3">
        <h2 className="text-lg font-semibold text-black">{title}</h2>
        <button type="button" onClick={handleModalClose} className="ml-auto">
          <CloseIcon />
        </button>
      </div>

      <RecordForm
        onSubmit={handleSubmit}
        onCancel={handleModalClose}
        initialData={editRecord || undefined}
      />
    </Modal>
  );
}

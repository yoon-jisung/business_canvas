'use client';
import React from 'react';

import { useRecordStore } from '@/feature/record/model/modal.store';
import { RecordForm } from '@/feature/record/ui/RecordForm';
import { CloseIcon } from '@/shared/ui/icons';
import { Modal } from '@/shared/ui/modal';

export function RecordModal(): React.ReactElement {
  const { isOpen, close } = useRecordStore();
  return (
    <Modal isOpen={isOpen} onClose={close}>
      <div className="flex items-center justify-between border-b border-[#F0F0F0] px-4 py-3">
        <h2 className="text-lg font-semibold text-black">회원 추가</h2>
        <button type="button" onClick={close} className="ml-auto">
          <CloseIcon />
        </button>
      </div>

      <RecordForm onSubmit={() => console.log('submit')} onCancel={close} />
    </Modal>
  );
}

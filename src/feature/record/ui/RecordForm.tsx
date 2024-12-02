import React, { useState } from 'react';

import type { JobType, Record } from '@/entities/record';
import { RecordFormField } from '@/feature/record/ui/RecordFormField';
import { FormInput } from '@/shared/ui/form';
type RecordFormProps = {
  onSubmit: (data: Record) => void;
  onCancel: () => void;
};

export function RecordForm({ onSubmit, onCancel }: RecordFormProps): React.ReactElement {
  const [formData, setFormData] = useState<Record>({
    id: '',
    name: '',
    address: '',
    memo: '',
    joinDate: '',
    job: 'defaultJobType' as JobType, // replace 'defaultJobType' with an appropriate default value of JobType
    emailSubscribed: false
  });
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-5 px-6 pb-5 pt-2.5 text-black">
        <RecordFormField id="name" label="이름" required>
          <FormInput
            type="text"
            id="name"
            placeholder="input"
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
          />
        </RecordFormField>

        <RecordFormField id="address" label="주소">
          <FormInput
            type="text"
            id="address"
            placeholder="input"
            value={formData.address}
            onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
          />
        </RecordFormField>

        <RecordFormField id="memo" label="메모">
          <textarea
            id="memo"
            placeholder="Textarea"
            value={formData.memo}
            onChange={(e) => setFormData((prev) => ({ ...prev, memo: e.target.value }))}
            className="flex w-full items-center gap-2.5 self-stretch rounded-lg border border-[#E3E3E3] bg-white px-3 py-2 placeholder:text-black/25"
          />
        </RecordFormField>

        <RecordFormField id="joinDate" label="가입일" required>
          <FormInput
            type="date"
            id="joinDate"
            value={formData.joinDate}
            onChange={(e) => setFormData((prev) => ({ ...prev, joinDate: e.target.value }))}
          />
        </RecordFormField>

        <RecordFormField id="job" label="직업">
          <FormInput type="select" id="job" value={formData.job} />
        </RecordFormField>

        <RecordFormField id="email" label="이메일 수신 동의">
          <input
            type="checkbox"
            id="email"
            checked={formData.emailSubscribed}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, emailSubscribed: e.target.checked }))
            }
            className="h-4 w-4 border border-[#e3e3e3]"
          />
        </RecordFormField>
      </div>

      <div className="flex h-14 justify-end gap-2 border-t border-[rgba(0,0,0,0.06)] bg-[rgba(0,0,0,0.02)] px-4 py-3">
        <button
          type="button"
          onClick={onCancel}
          className="flex h-8 items-center justify-center rounded-lg border border-[#e3e3e3] bg-white px-4 text-sm font-normal leading-snug text-black/70"
        >
          취소
        </button>

        <button
          type="submit"
          disabled={!formData.name || !formData.joinDate}
          className="flex h-8 items-center justify-center rounded-lg border border-[#e3e3e3] bg-black/5 px-4 text-sm font-normal leading-snug enabled:text-black/70 disabled:text-black/25"
        >
          추가
        </button>
      </div>
    </form>
  );
}

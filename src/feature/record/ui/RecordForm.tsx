'use client';
import dayjs from 'dayjs';
import React, { useState } from 'react';

import type { JobType, RecordsType } from '@/entities/record';
import { RecordFormField } from '@/feature/record/ui/RecordFormField';
import { CustomDatePicker } from '@/shared/ui/date-picker';
import { FormInput } from '@/shared/ui/form';
import { Select } from '@/shared/ui/select';

type RecordFormProps = {
  onSubmit: (data: RecordsType) => void;
  onCancel: () => void;
  initialData?: RecordsType;
};
const JOB_OPTIONS = [
  { value: '개발자', label: '개발자' },
  { value: 'PO', label: 'PO' },
  { value: '디자이너', label: '디자이너' }
];

export function RecordForm({
  onSubmit,
  onCancel,
  initialData
}: RecordFormProps): React.ReactElement {
  const [formData, setFormData] = useState<RecordsType>(
    initialData || {
      id: '',
      name: '',
      address: '',
      memo: '',
      joinDate: dayjs().format('YYYY-MM-DD'),
      job: '개발자' as JobType,
      emailSubscribed: false
    }
  );
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
          <CustomDatePicker
            value={dayjs(formData.joinDate).toDate()}
            onChange={(newDate) =>
              setFormData((prev) => ({
                ...prev,
                joinDate: newDate
                  ? dayjs(newDate).format('YYYY-MM-DD')
                  : dayjs().format('YYYY-MM-DD')
              }))
            }
          />
        </RecordFormField>

        <RecordFormField id="job" label="직업">
          <Select
            options={JOB_OPTIONS}
            value={formData.job}
            onChange={(value: string) =>
              setFormData((prev) => ({ ...prev, job: value as JobType }))
            }
          />
        </RecordFormField>
        <RecordFormField id="email" label="이메일 수신 동의">
          <div className="flex items-center justify-start">
            <input
              type="checkbox"
              id="email"
              checked={formData.emailSubscribed}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, emailSubscribed: e.target.checked }))
              }
              className="h-4 w-4 rounded-lg border border-[#e3e3e3] bg-white"
            />
          </div>
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
          className={`flex h-8 items-center justify-center rounded-lg px-4 text-sm font-normal leading-snug ${
            formData.name && formData.joinDate
              ? 'bg-[#4A7CFE] text-white hover:bg-[#739FFF]'
              : 'border border-[#e3e3e3] bg-black/5 text-black/25'
          }`}
        >
          저장
        </button>
      </div>
    </form>
  );
}

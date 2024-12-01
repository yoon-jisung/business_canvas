import type { Field } from '@/entities/record/record.types';

export const RECORD_FIELDS: Field[] = [
  { type: 'text', label: '이름', required: true },
  { type: 'text', label: '주소', required: false },
  { type: 'textarea', label: '메모', required: false },
  { type: 'date', label: '가입일', required: true },
  {
    type: 'select',
    label: '직업',
    required: false,
    options: ['개발자', 'PO', '디자이너']
  },
  { type: 'checkbox', label: '이메일 수신 동의', required: false }
];

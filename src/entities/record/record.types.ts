export type FieldType = 'text' | 'textarea' | 'date' | 'select' | 'checkbox';
export type JobType = '개발자' | 'PO' | '디자이너';

export type Field = {
  type: FieldType;
  label: string;
  required: boolean;
  options?: string[]; // select 타입일 경우 사용
};

export type Record = {
  id: string; // 고유 식별자
  name: string;
  address?: string;
  memo?: string;
  joinDate: string;
  job: JobType;
  emailSubscribed: boolean;
};

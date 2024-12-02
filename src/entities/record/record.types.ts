export type FieldType = 'text' | 'textarea' | 'date' | 'select' | 'checkbox';
export type JobType = '개발자' | 'PO' | '디자이너';

export type Field = {
  type: FieldType;
  label: string;
  required: boolean;
  options?: string[];
};

export type RecordsType = {
  id: string;
  name: string;
  address?: string;
  memo?: string;
  joinDate: string;
  job: JobType;
  emailSubscribed: boolean;
};

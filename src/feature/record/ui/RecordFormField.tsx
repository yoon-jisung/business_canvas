import React from 'react';

import { FormLabel } from '@/shared/ui/form';

type RecordFormFieldProps = {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
};

export function RecordFormField({
  id,
  label,
  required,
  children
}: RecordFormFieldProps): React.ReactElement {
  return (
    <div className="flex flex-col items-stretch">
      <FormLabel htmlFor={id} required={required}>
        {label}
      </FormLabel>
      {children}
    </div>
  );
}

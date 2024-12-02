import React from 'react';
type FormLabelProps = {
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
};

export function FormLabel({ htmlFor, required, children }: FormLabelProps): React.ReactElement {
  return (
    <div className="py-2">
      <label htmlFor={htmlFor} className="w-1/4 text-base font-semibold text-black/45">
        {children}
      </label>
      {required && <span className="ml-1 text-red-500">*</span>}
    </div>
  );
}

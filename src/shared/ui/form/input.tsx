import React from 'react';

type FormInputProps = {
  id: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function FormInput({ id, ...props }: FormInputProps): React.ReactElement {
  return (
    <input
      {...props}
      id={id}
      className="flex h-[32px] w-full items-center gap-2.5 self-stretch rounded-lg border border-[#E3E3E3] bg-white px-3 py-2 font-['Pretendard'] text-sm font-normal leading-[22px] text-black placeholder:text-black/25"
    />
  );
}

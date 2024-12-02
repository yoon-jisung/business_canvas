import React, { useState } from 'react';

import { DropdownIcon } from '@/shared/ui/icons';

type SelectOption = {
  value: string;
  label: string;
};

type CustomSelectProps = {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function Select({
  options,
  value,
  onChange,
  placeholder = '직업 선택'
}: CustomSelectProps): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group flex h-8 w-fit items-center justify-center rounded-lg border border-[#e3e3e3] bg-white px-3 text-left transition-colors hover:border-[#739FFF]"
      >
        <div className="flex items-center justify-between gap-3">
          <span className="text-[14px] leading-[22px] text-black/90 transition-colors group-hover:text-[#739FFF]">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <i className="transition-colors [&>svg]:transition-colors [&>svg]:group-hover:text-[#739FFF]">
            <DropdownIcon />
          </i>
        </div>
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1 rounded-lg border border-[#e3e3e3] bg-white p-1 shadow-2xl">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`w-full px-3 py-[5px] text-left text-sm transition-colors ${
                option.value === value ? 'bg-[#F0F7FF] text-[#4A7CFE]' : 'hover:bg-[#F0F7FF]'
              }`}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

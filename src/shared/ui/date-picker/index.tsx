'use client';
import React, { forwardRef, memo } from 'react';
import DatePicker from 'react-datepicker';

import { CalendarIcon } from '@/shared/ui/icons';
import 'react-datepicker/dist/react-datepicker.css';

type CustomInputProps = {
  value?: string;
  onClick?: () => void;
  placeholder: string;
};

const CustomInput = memo(
  forwardRef<HTMLButtonElement, CustomInputProps>(({ value, onClick, placeholder }, ref) => (
    <button
      type="button"
      onClick={onClick}
      ref={ref}
      aria-label={placeholder}
      className="group flex h-8 w-fit items-center justify-center rounded-lg border border-[#e3e3e3] bg-white px-3 text-left transition-colors hover:border-[#739FFF]"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-[14px] leading-[22px] text-black/90 transition-colors group-hover:text-[#739FFF]">
          {value || placeholder}
        </span>
        <i className="transition-colors [&>svg]:transition-colors [&>svg]:group-hover:text-[#739FFF]">
          <CalendarIcon />
        </i>
      </div>
    </button>
  ))
);
CustomInput.displayName = 'CustomInput';

type CustomDatePickerProps = {
  value: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
};

export function CustomDatePicker({
  value,
  onChange,
  placeholder = '날짜 선택'
}: CustomDatePickerProps): React.ReactElement {
  return (
    <div className="relative">
      <DatePicker
        selected={value}
        onChange={onChange}
        customInput={<CustomInput placeholder={placeholder} />}
        dateFormat="yyyy-MM-dd"
        className="w-full"
        calendarClassName=" shadow-lg border border-[#e3e3e3] rounded-lg"
        wrapperClassName="w-fit"
        showPopperArrow={false}
        onChangeRaw={(e) => e && e.preventDefault()} // 직접 입력 방지
      />
    </div>
  );
}

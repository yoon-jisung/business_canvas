import React, { useState } from 'react';

import { FilterIcon } from '@/shared/ui/icons';

type FilterDropdownProps = {
  options: Array<{ id: string; label: string }>;
  onFilter: (value: string) => void;
  multiSelect?: boolean;
};

export function FilterDropdown({
  options,
  onFilter,
  multiSelect = true
}: FilterDropdownProps): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOptionSelect = (optionId: string): void => {
    if (multiSelect) {
      setSelectedOptions((prev) => {
        const newSelected = prev.includes(optionId)
          ? prev.filter((id) => id !== optionId)
          : [...prev, optionId];
        onFilter(newSelected.join(','));
        return newSelected;
      });
    } else {
      setSelectedOptions([optionId]);
      onFilter(optionId);
      setIsOpen(false);
    }
  };

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>
        <FilterIcon />
      </button>

      {isOpen && (
        <div className="absolute left-[-9px] top-full z-10 mt-1 w-full rounded-[10px] bg-white p-2 shadow">
          {options.map((option) => (
            <div
              key={option.id}
              role="button"
              tabIndex={0}
              className="flex h-8 w-full cursor-pointer items-center rounded-md px-3 hover:bg-[#F0F7FF]"
            >
              <div className="inline-flex h-full items-center justify-center gap-2">
                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes(option.id)}
                    className="h-4 w-4 cursor-pointer rounded-md border border-[#e3e3e3] bg-white"
                    onChange={() => {
                      handleOptionSelect(option.id);
                      setIsOpen(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleOptionSelect(option.id);
                        setIsOpen(false);
                      }
                    }}
                  />
                </div>
                <span className="font-['Pretendard'] text-[12px] font-normal leading-snug text-black/90">
                  {option.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

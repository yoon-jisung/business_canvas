import React, { useState } from 'react';

import type { RecordsType } from '@/entities/record';
import { useFilterStore } from '@/feature/record/model/filter.store';
import { FilterDropdown } from '@/feature/record/ui/FilterDropdown';
import { MoreOptionsButton } from '@/feature/record/ui/MoreOptionsButton';

type RecordTableProps = {
  records: RecordsType[];
  filteredRecords: RecordsType[];
};

export function RecordTable({
  records,

  filteredRecords
}: RecordTableProps): React.ReactElement {
  const [selectedRecords, setSelectedRecords] = useState<string[]>([]);
  const setFilter = useFilterStore((state) => state.setFilter);
  const handleSelectAll = (checked: boolean): void => {
    setSelectedRecords(checked ? records.map((r) => r.id) : []);
  };

  const handleSelectOne = (id: string, checked: boolean): void => {
    setSelectedRecords((prev) =>
      checked ? [...prev, id] : prev.filter((recordId) => recordId !== id)
    );
  };

  const handleFilter = (field: keyof RecordsType, value: string): void => {
    setFilter(field, value);
  };

  return (
    <div className="w-full bg-white">
      <table className="first-line: w-full border-collapse border">
        <thead>
          <tr className="border-t border-black/5 bg-neutral-50">
            <th className="w-[48px] border-b border-black/5 bg-neutral-50 p-2">
              <div className="flex items-center justify-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 cursor-pointer rounded-md border border-[#e3e3e3] bg-white"
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </div>
            </th>
            <th className="relative w-[120px] border-b border-black/5 p-2 text-left">
              <div className="flex items-center justify-between border-r border-black/5 px-2 text-sm font-semibold leading-snug text-black/90">
                <span>이름</span>
                <FilterDropdown
                  options={Array.from(new Set(records.map((r) => r.name))).map((name) => ({
                    id: name,
                    label: name
                  }))}
                  onFilter={(value) => handleFilter('name', value)}
                />
              </div>
            </th>
            <th className="relative border-b border-black/5 p-2 text-left">
              <div className="flex items-center justify-between border-r border-black/5 px-2 text-sm font-semibold leading-snug text-black/90">
                <span>주소</span>
                <FilterDropdown
                  options={Array.from(
                    new Set(
                      records.map((r) => r.address).filter((address) => address !== undefined)
                    )
                  ).map((address) => ({
                    id: address,
                    label: address
                  }))}
                  onFilter={(value) => handleFilter('address', value)}
                />
              </div>
            </th>
            <th className="relative border-b border-black/5 p-2 text-left">
              <div className="flex items-center justify-between border-r border-black/5 px-2 text-sm font-semibold leading-snug text-black/90">
                <span>메모</span>
                <FilterDropdown
                  options={Array.from(
                    new Set(records.map((r) => r.memo).filter((memo) => memo !== undefined))
                  ).map((memo) => ({
                    id: memo,
                    label: memo
                  }))}
                  onFilter={(value) => handleFilter('memo', value)}
                />
              </div>
            </th>
            <th className="relative w-[200px] border-b border-black/5 p-2 text-left">
              <div className="flex items-center justify-between border-r border-black/5 px-2 text-sm font-semibold leading-snug text-black/90">
                <span>가입일</span>
                <FilterDropdown
                  options={Array.from(new Set(records.map((r) => r.joinDate))).map((date) => ({
                    id: date,
                    label: date
                  }))}
                  onFilter={(value) => handleFilter('joinDate', value)}
                />
              </div>
            </th>
            <th className="relative border-b border-black/5 p-2 text-left">
              <div className="flex items-center justify-between border-r border-black/5 px-2 text-sm font-semibold leading-snug text-black/90">
                <span>직업</span>
                <FilterDropdown
                  options={Array.from(new Set(records.map((r) => r.job))).map((job) => ({
                    id: job,
                    label: job
                  }))}
                  onFilter={(value) => handleFilter('job', value)}
                />
              </div>
            </th>
            <th className="relative w-[150px] border-b border-black/5 p-2 text-left">
              <div className="flex items-center justify-between border-r border-black/5 px-2 text-sm font-semibold leading-snug text-black/90">
                <span>이메일 수신 동의</span>
                <FilterDropdown
                  options={[
                    { id: 'true', label: '선택됨' },
                    { id: 'false', label: '선택 안함' }
                  ]}
                  onFilter={(value) => handleFilter('emailSubscribed', value)}
                />
              </div>
            </th>
            <th className="w-8 border-b border-black/5 p-2">
              <div className="border-l border-black/5"></div>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.map((record) => (
            <tr key={record.id}>
              <td className="border-x border-b border-black/5 p-2">
                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 cursor-pointer rounded-md border border-[#e3e3e3] bg-white"
                    checked={selectedRecords.includes(record.id)}
                    onChange={(e) => handleSelectOne(record.id, e.target.checked)}
                  />
                </div>
              </td>
              <td className="border-b border-black/5 p-2">
                <div className="text-sm font-normal leading-snug text-black/90">{record.name}</div>
              </td>
              <td className="border-b border-black/5 p-2">
                <div className="text-sm font-normal leading-snug text-black/90">
                  {record.address}
                </div>
              </td>
              <td className="border-b border-black/5 p-2">
                <div className="text-sm font-normal leading-snug text-black/90">{record.memo}</div>
              </td>
              <td className="border-b border-black/5 p-2">
                <div className="text-sm font-normal leading-snug text-black/90">
                  {record.joinDate}
                </div>
              </td>
              <td className="border-b border-black/5 p-2">
                <div className="text-sm font-normal leading-snug text-black/90">{record.job}</div>
              </td>
              <td className="border-b border-black/5 p-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={record.emailSubscribed}
                    readOnly
                    className="h-4 w-4 rounded-md border border-[#e3e3e3] checked:border-[#4a7cfe] checked:bg-[#4a7cfe]"
                  />
                </div>
              </td>
              <td className="border-b border-black/5 p-2">
                <MoreOptionsButton record={record} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

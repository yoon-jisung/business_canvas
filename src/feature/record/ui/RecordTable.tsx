import React from 'react';

import type { Record } from '@/entities/record';

type RecordTableProps = {
  records: Record[];
  onEdit: (record: Record) => void;
  onDelete: (id: string) => void;
};

export function RecordTable({ records, onEdit, onDelete }: RecordTableProps): React.ReactElement {
  return (
    <div className="w-full bg-white">
      <table className="first-line: w-full border-collapse border">
        <thead>
          <tr className="border-t border-black/5 bg-neutral-50">
            <th className="w-[48px] border-b border-black/5 bg-neutral-50 p-2">
              <div className="flex items-center justify-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded-md border border-[#e3e3e3] bg-white"
                />
              </div>
            </th>
            <th className="w-[120px] border-b border-black/5 p-2 text-left">
              <div className="border-r border-black/5 text-sm font-semibold leading-snug text-black/90">
                이름
              </div>
            </th>
            <th className="border-b border-black/5 p-2 text-left">
              <div className="border-r border-black/5 text-sm font-semibold leading-snug text-black/90">
                주소
              </div>
            </th>
            <th className="border-b border-black/5 p-2 text-left">
              <div className="border-r border-black/5 text-sm font-semibold leading-snug text-black/90">
                메모
              </div>
            </th>
            <th className="w-[200px] border-b border-black/5 p-2 text-left">
              <div className="border-r border-black/5 text-sm font-semibold leading-snug text-black/90">
                가입일
              </div>
            </th>
            <th className="border-b border-black/5 p-2 text-left">
              <div className="border-r border-black/5 text-sm font-semibold leading-snug text-black/90">
                직업
              </div>
            </th>
            <th className="w-[150px] border-b border-black/5 p-2 text-left">
              <div className="text-sm font-semibold leading-snug text-black/90">
                이메일 수신 동의
              </div>
            </th>
            <th className="w-12 border-b border-black/5 p-2">
              <div className="border-l border-black/5"></div>
            </th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td className="border-x border-b border-black/5 p-2">
                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded-md border border-[#e3e3e3] bg-white"
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
                <div className="flex items-center justify-center">
                  <button
                    onClick={() => onEdit(record)}
                    className="flex h-8 w-8 items-center justify-center"
                  >
                    ⋮
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

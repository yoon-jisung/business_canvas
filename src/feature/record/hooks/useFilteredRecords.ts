import { useMemo } from 'react';

import type { RecordsType } from '@/entities/record';

type FilterValue<T> = T | undefined;

type Filters = {
  [K in keyof Partial<RecordsType>]: FilterValue<K extends 'emailSubscribed' ? boolean : string>;
};

export function useFilteredRecords(records: RecordsType[], filters: Filters): RecordsType[] {
  return useMemo(() => {
    return records.filter((record) => {
      if (Object.keys(filters).length === 0) {
        return true;
      }

      return Object.entries(filters).some(([key, value]) => {
        if (!value) {
          return true;
        }

        if (key === 'emailSubscribed') {
          const filterValues = String(value).split(',');
          return filterValues.some((filterValue) => record[key] === (filterValue === 'true'));
        }

        if (typeof record[key as keyof RecordsType] === 'string') {
          const recordValue = record[key as keyof RecordsType] as string;
          const filterValues = String(value).split(',');

          return filterValues.some((filterValue) => recordValue.includes(filterValue));
        }

        return String(record[key as keyof RecordsType]) === String(value);
      });
    });
  }, [records, filters]);
}

import React from 'react';

import { RecordListUI, RecordModal } from '@/feature';

export function HomePage(): React.ReactElement {
  return (
    <div className="flex h-full w-full">
      <RecordListUI />
      <RecordModal />
    </div>
  );
}

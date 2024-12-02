'use client';

import React from 'react';

export default function Error(): React.ReactElement {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-2xl font-bold">오류가 발생했습니다</h1>
      <p className="text-gray-600">페이지를 새로고침하거나 잠시 후 다시 시도해주세요.</p>
    </div>
  );
}

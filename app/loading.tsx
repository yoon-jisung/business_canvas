import React from 'react';

export default function Loading(): React.ReactElement {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-gray-900" />
    </div>
  );
}

import React from 'react';

export function MainLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  return <main className="h-full w-full">{children}</main>;
}

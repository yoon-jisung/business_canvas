import React from 'react';

export function MainLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  return <main className="body-content-max h-screen py-8">{children}</main>;
}

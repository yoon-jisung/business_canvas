import React, { Fragment } from 'react';

export function MainLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <Fragment>
      {/* <Header /> */}
      <main className="h-full w-full">{children}</main>
      {/* <Footer /> */}
    </Fragment>
  );
}

import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
};

export function CenterAbsolute({
  children,
  className = '',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  as: Component = 'div'
}: Props): React.ReactElement {
  return (
    <Component className={`absolute inset-0 flex items-center justify-center ${className}`}>
      {children}
    </Component>
  );
}

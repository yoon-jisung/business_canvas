import { render, screen } from '@testing-library/react';
import React from 'react';

import { CenterAbsolute } from '@/shared/ui';

describe('Shared UI CenterAbsolute', () => {
  it('자식이 컴포넌트가 올바르게 랜더링 되는지 확인', () => {
    render(
      <CenterAbsolute>
        <span>Test</span>
      </CenterAbsolute>
    );

    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('기본 className이 올바르게 적용되는지 확인', () => {
    render(
      <CenterAbsolute>
        <span>Test Content</span>
      </CenterAbsolute>
    );
    const container = screen.getByText('Test Content').parentElement;
    expect(container).toHaveClass('absolute inset-0 flex items-center justify-center');
  });

  it('커스텀 className이 기본 클래스와 함께 잘 병합되는지 확인', () => {
    render(
      <CenterAbsolute className="bg-red-500">
        <span>Test Content</span>
      </CenterAbsolute>
    );
    const container = screen.getByText('Test Content').parentElement;
    expect(container).toHaveClass('absolute inset-0 flex items-center justify-center bg-red-500');
  });

  it('"as" prop이 제공될 때 커스텀 HTML 엘리먼트로 렌더링되는지 확인', () => {
    render(
      <CenterAbsolute as="section">
        <span>Test Content</span>
      </CenterAbsolute>
    );
    const container = screen.getByText('Test Content').parentElement;
    expect(container?.tagName.toLowerCase()).toBe('section');
  });

  it('"as" prop이 없을 때 기본값으로 div로 랜더링 되는지 확인', () => {
    render(
      <CenterAbsolute>
        <span>Test Content</span>
      </CenterAbsolute>
    );

    const container = screen.getByText('Test Content').parentElement;
    expect(container?.tagName.toLowerCase()).toBe('div');
  });
  it('자식 컴포넌트의 기능이 유지되는지 확인', () => {
    render(
      <CenterAbsolute>
        <button type="button">Click Me</button>
      </CenterAbsolute>
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('여러 자식 요소들이 올바르게 렌더링되는지 확인', () => {
    render(
      <CenterAbsolute>
        <span>First Child</span>
        <span>Second Child</span>
      </CenterAbsolute>
    );
    expect(screen.getByText('First Child')).toBeInTheDocument();
    expect(screen.getByText('Second Child')).toBeInTheDocument();
  });
});

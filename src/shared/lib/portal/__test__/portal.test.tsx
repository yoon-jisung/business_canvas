import { render, cleanup } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, afterEach } from 'vitest';

import { Portal } from '../index';

describe('Portal 컴포넌트', () => {
  afterEach(() => {
    cleanup();
    const portalRoot = document.getElementById('portal-root');
    if (portalRoot) {
      portalRoot.remove();
    }
  });

  it('기본 portal-root 컨테이너를 생성해야 함', () => {
    render(
      <Portal>
        <div>테스트 컨텐츠</div>
      </Portal>
    );

    const portalContainer = document.getElementById('portal-root');
    expect(portalContainer).not.toBeNull();
    expect(portalContainer?.textContent).toBe('테스트 컨텐츠');
  });

  it('사용자 지정 컨테이너 ID를 사용할 수 있어야 함', () => {
    render(
      <Portal containerId="custom-portal">
        <div>커스텀 컨테이너</div>
      </Portal>
    );

    const customContainer = document.getElementById('custom-portal');
    expect(customContainer).not.toBeNull();
    expect(customContainer?.textContent).toBe('커스텀 컨테이너');
  });

  it('컴포넌트 언마운트 시 생성된 컨테이너를 제거해야 함', () => {
    const { unmount } = render(
      <Portal>
        <div>제거될 컨텐츠</div>
      </Portal>
    );

    const portalContainer = document.getElementById('portal-root');
    expect(portalContainer).not.toBeNull();

    unmount();
    expect(document.getElementById('portal-root')).toBeNull();
  });

  it('이미 존재하는 컨테이너를 재사용해야 함', () => {
    const existingContainer = document.createElement('div');
    existingContainer.id = 'existing-portal';
    document.body.appendChild(existingContainer);

    render(
      <Portal containerId="existing-portal">
        <div>재사용된 컨테이너</div>
      </Portal>
    );

    const container = document.getElementById('existing-portal');
    expect(container).toBe(existingContainer);
    expect(container?.textContent).toBe('재사용된 컨테이너');
  });
});

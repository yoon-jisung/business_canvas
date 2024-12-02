import { render, fireEvent, cleanup } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { Modal } from './index';

vi.mock('@/shared/lib/portal', () => ({
  Portal: ({ children }: { children: React.ReactNode }) => children
}));

describe('modal 컴포넌트', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    document.body.style.overflow = 'unset';
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('isOpen이 false일 때는 렌더링하지 않아야 한다', () => {
    const { container } = render(
      <Modal isOpen={false} onClose={mockOnClose}>
        <div>모달 내용</div>
      </Modal>
    );

    expect(container.innerHTML).toBe('');
  });

  it('isOpen이 true일 때는 모달과 내용을 렌더링해야 한다', () => {
    const { getByText, getByRole } = render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div>모달 내용</div>
      </Modal>
    );

    expect(getByRole('dialog')).toBeInTheDocument();
    expect(getByText('모달 내용')).toBeInTheDocument();
  });

  it('배경을 클릭하면 onClose가 호출되어야 한다', () => {
    const { getByRole } = render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div>모달 내용</div>
      </Modal>
    );

    const backdrop = getByRole('dialog').children[0];
    fireEvent.click(backdrop);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('모달 내용을 클릭할 때는 onClose가 호출되지 않아야 한다', () => {
    const { getByText } = render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div>모달 내용</div>
      </Modal>
    );

    fireEvent.click(getByText('모달 내용'));

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('Escape 키를 누르면 onClose가 호출되어야 한다', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div>모달 내용</div>
      </Modal>
    );

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('모달이 열릴 때 body의 overflow가 hidden으로 설정되어야 한다', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div>모달 내용</div>
      </Modal>
    );

    expect(document.body.style.overflow).toBe('hidden');
  });

  it('모달이 닫힐 때 body의 overflow가 unset으로 복원되어야 한다', () => {
    const { unmount } = render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div>모달 내용</div>
      </Modal>
    );

    unmount();
    expect(document.body.style.overflow).toBe('unset');
  });

  it('접근성 속성이 올바르게 설정되어야 한다', () => {
    const { getByRole } = render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div>모달 내용</div>
      </Modal>
    );

    const dialog = getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });
});

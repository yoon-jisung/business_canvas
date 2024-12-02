import { render, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, vi } from 'vitest';

import { Select } from './index';

vi.mock('@/shared/ui/icons', () => ({
  DropdownIcon: () => <div data-testid="dropdown-icon">드롭다운 아이콘</div>
}));

describe('select 컴포넌트', () => {
  const mockOptions = [
    { value: 'developer', label: '개발자' },
    { value: 'designer', label: '디자이너' },
    { value: 'manager', label: '매니저' }
  ];

  const mockOnChange = vi.fn();

  const defaultProps = {
    options: mockOptions,
    value: '',
    onChange: mockOnChange
  };

  it('초기 상태에서는 플레이스홀더를 표시해야 한다', () => {
    render(<Select {...defaultProps} placeholder="직업 선택" />);

    expect(screen.getByText('직업 선택')).toBeInTheDocument();
  });

  it('선택된 값이 있으면 해당 라벨을 표시해야 한다', () => {
    render(<Select {...defaultProps} value="developer" />);

    expect(screen.getByText('개발자')).toBeInTheDocument();
  });

  it('버튼 클릭 시 옵션 목록을 표시해야 한다', () => {
    render(<Select {...defaultProps} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    mockOptions.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it('옵션 선택 시 onChange가 호출되어야 한다', () => {
    render(<Select {...defaultProps} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    const option = screen.getByText('개발자');
    fireEvent.click(option);

    expect(mockOnChange).toHaveBeenCalledWith('developer');
  });

  it('옵션 선택 시 드롭다운이 닫혀야 한다', () => {
    render(<Select {...defaultProps} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    const option = screen.getByText('개발자');
    fireEvent.click(option);

    expect(screen.queryByText('디자이너')).not.toBeInTheDocument();
  });

  it('드롭다운 아이콘이 렌더링되어야 한다', () => {
    render(<Select {...defaultProps} />);

    expect(screen.getByTestId('dropdown-icon')).toBeInTheDocument();
  });

  it('호버 상태에서 스타일이 변경되어야 한다', async () => {
    render(<Select {...defaultProps} />);

    const button = screen.getByRole('button');

    fireEvent.mouseEnter(button);

    expect(button).toHaveClass('hover:border-[#739FFF]');
  });

  it('커스텀 플레이스홀더를 표시할 수 있어야 한다', () => {
    const customPlaceholder = '직무를 선택하세요';
    render(<Select {...defaultProps} placeholder={customPlaceholder} />);

    expect(screen.getByText(customPlaceholder)).toBeInTheDocument();
  });
});

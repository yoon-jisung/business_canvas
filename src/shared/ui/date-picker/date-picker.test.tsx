import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { vi } from 'vitest';

import { CustomDatePicker } from './index';

describe('CustomDatePicker 컴포넌트', () => {
  const mockOnChange = vi.fn();
  const testDate = new Date('2024-03-15');

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('선택된 날짜를 표시해야 함', () => {
    render(<CustomDatePicker value={testDate} onChange={mockOnChange} />);
    expect(screen.getByText('2024-03-15')).toBeInTheDocument();
  });

  it('날짜 선택기를 클릭하면 캘린더가 열려야 함', () => {
    render(<CustomDatePicker value={null} onChange={mockOnChange} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(document.querySelector('.react-datepicker')).toBeInTheDocument();
  });
});

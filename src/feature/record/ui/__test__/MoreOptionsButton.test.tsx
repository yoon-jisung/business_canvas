import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { JobType } from '@/entities/record';
import { useRecordStore } from '@/feature/record/model/record.store';

import { MoreOptionsButton } from '../MoreOptionsButton';

vi.mock('@/feature/record/model/record.store', () => ({
  useRecordStore: () => ({
    loadRecords: vi.fn(),
    setEditRecord: vi.fn(),
    open: vi.fn(),
    deleteRecord: vi.fn()
  })
}));

describe('더보기 버튼', () => {
  const mockRecord = {
    id: '1',
    name: 'John Doe',
    address: '서울시 강남구',
    memo: '메모1',
    joinDate: '2024-03-15',
    job: '개발자' as JobType,
    emailSubscribed: true
  };

  beforeEach(() => {
    vi.spyOn(window, 'confirm').mockImplementation(() => true);
  });

  it('초기 상태에서는 드롭다운이 보이지 않아야 한다', () => {
    render(<MoreOptionsButton record={mockRecord} />);

    expect(screen.queryByText('수정')).not.toBeInTheDocument();
    expect(screen.queryByText('삭제')).not.toBeInTheDocument();
  });

  it('더보기 버튼 클릭 시 드롭다운이 표시되어야 한다', () => {
    render(<MoreOptionsButton record={mockRecord} />);

    fireEvent.click(screen.getByText('⋮'));

    expect(screen.getByText('수정')).toBeInTheDocument();
    expect(screen.getByText('삭제')).toBeInTheDocument();
  });

  it('드롭다운 외부 클릭 시 드롭다운이 닫혀야 한다', () => {
    render(<MoreOptionsButton record={mockRecord} />);

    fireEvent.click(screen.getByText('⋮'));

    fireEvent.mouseDown(document.body);

    expect(screen.queryByText('수정')).not.toBeInTheDocument();
  });

  it('삭제 확인 창에서 취소 시 삭제되지 않아야 한다', () => {
    vi.spyOn(window, 'confirm').mockImplementation(() => false);
    const { deleteRecord } = useRecordStore();

    render(<MoreOptionsButton record={mockRecord} />);

    fireEvent.click(screen.getByText('⋮'));

    fireEvent.click(screen.getByText('삭제'));

    expect(deleteRecord).not.toHaveBeenCalled();
  });
});

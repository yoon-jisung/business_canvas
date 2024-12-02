import { describe, it, expect, beforeEach, vi } from 'vitest';

import { InMemoryStorage, LocalStorage } from '../storage';

describe('인메모리 스토리지', () => {
  let storage: InMemoryStorage;

  beforeEach(() => {
    storage = new InMemoryStorage();
  });

  it('아이템을 저장하고 조회할 수 있어야 한다', async () => {
    await storage.setItem('key', 'value');
    const result = await storage.getItem('key');
    expect(result).toBe('value');
  });

  it('존재하지 않는 키의 경우 null을 반환해야 한다', async () => {
    const result = await storage.getItem('non-existent');
    expect(result).toBeNull();
  });

  it('아이템을 삭제할 수 있어야 한다', async () => {
    await storage.setItem('key', 'value');
    await storage.removeItem('key');
    const result = await storage.getItem('key');
    expect(result).toBeNull();
  });
});

describe('로컬 스토리지', () => {
  let storage: LocalStorage;
  const mockLocalStorage = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn()
  };

  beforeEach(() => {
    storage = new LocalStorage();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    global.localStorage = mockLocalStorage as any;
    vi.clearAllMocks();
  });

  it('localStorage.getItem이 호출되어야 한다', async () => {
    mockLocalStorage.getItem.mockReturnValue('value');
    const result = await storage.getItem('key');
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('key');
    expect(result).toBe('value');
  });

  it('localStorage.setItem이 호출되어야 한다', async () => {
    await storage.setItem('key', 'value');
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('key', 'value');
  });

  it('localStorage.removeItem이 호출되어야 한다', async () => {
    await storage.removeItem('key');
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('key');
  });
});

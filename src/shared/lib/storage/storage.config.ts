import { InMemoryStorage, LocalStorage } from './storage';
import type { Storage } from './storage.types';

const storageType = process.env.NEXT_PUBLIC_STORAGE || 'in-memory';

export const storage: Storage =
  storageType === 'local-storage' ? new LocalStorage() : new InMemoryStorage();

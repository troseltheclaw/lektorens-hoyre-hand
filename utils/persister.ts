import { get, set, del } from 'idb-keyval';
import { PersistedClient, Persister } from '@tanstack/react-query-persist-client';

/**
 * Creates an IndexedDB persister using idb-keyval
 */
export function createIDBPersister(idbValidKey: IDBValidKey = 'reactQuery'): Persister {
  return {
    persistClient: async (client: PersistedClient) => {
      if (typeof window === 'undefined') return;
      await set(idbValidKey, client);
    },
    restoreClient: async () => {
      if (typeof window === 'undefined') return undefined;
      return await get<PersistedClient>(idbValidKey);
    },
    removeClient: async () => {
      if (typeof window === 'undefined') return;
      await del(idbValidKey);
    },
  };
}

'use client';

import React, { useState } from 'react';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createIDBPersister } from '../utils/persister';
import { makeQueryClient } from '../utils/queryClient';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => makeQueryClient());
  const [persister] = useState(() => createIDBPersister());

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      {children}
    </PersistQueryClientProvider>
  );
}

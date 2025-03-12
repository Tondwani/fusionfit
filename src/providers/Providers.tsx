'use client';

import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ClientProvider } from './ClientProvider';
import { TrainerProvider } from './TrainerProvider';
import { CurrentUserProvider } from './CurrentUserProvide';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AntdRegistry>
      <ClientProvider>
        <TrainerProvider>
          <CurrentUserProvider>
          {children}
          </CurrentUserProvider>
        </TrainerProvider>
      </ClientProvider>
    </AntdRegistry>
  );
}

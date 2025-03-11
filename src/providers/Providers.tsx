'use client';

import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ClientProvider } from './ClientProvider';
import { TrainerProvider } from './TrainerProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AntdRegistry>
      <ClientProvider>
        <TrainerProvider>
          {children}
        </TrainerProvider>
      </ClientProvider>
    </AntdRegistry>
  );
}

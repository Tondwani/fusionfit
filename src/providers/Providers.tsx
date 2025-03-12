'use client';

import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ClientProvider } from '@/providers/ClientMangementProvder';
import { AuthProvider } from '@/providers/TrainerProvider';
import { FoodItemProvider } from '@/providers/FoodItemProvider';
import { MealPlanProvider } from '@/providers/MealPlanProvider';


export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AntdRegistry>
      <AuthProvider>
        <ClientProvider>
            <FoodItemProvider>
              <MealPlanProvider>
                {children}
              </MealPlanProvider>
            </FoodItemProvider>
        </ClientProvider>
      </AuthProvider>
    </AntdRegistry>
  );
}
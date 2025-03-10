import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login/Register - Fusion Gym',
  description: 'Login or register for Fusion Gym',
};

export default function FormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}




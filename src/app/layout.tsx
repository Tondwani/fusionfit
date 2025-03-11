import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ConfigProvider } from 'antd';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fusion Gym",
  description: "Your premium fitness destination",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={geist.className}>
        <AntdRegistry>
          <ConfigProvider>
            {children}
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}

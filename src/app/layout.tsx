import type { Metadata } from "next";
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


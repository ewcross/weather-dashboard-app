import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Weather Dashboard",
  description: "A simple weather dashboard app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`min-h-screen antialiased ${inter.className} bg-gradient-to-tr from-blue-700 from-60% to-blue-400`}
      >
        {children}
      </body>
    </html>
  );
}

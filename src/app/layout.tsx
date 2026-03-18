import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import AIChatWidget from "@/components/AIChatWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Personal Finance Dashboard",
  description: "A personal finance dashboard to track income and expenses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-gray-50 dark:bg-gray-900">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-gray-900 dark:text-gray-100`}
      >
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </main>
          <AIChatWidget />
        </div>
      </body>
    </html>
  );
}

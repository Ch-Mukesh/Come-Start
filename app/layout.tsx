import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from 'react-hot-toast';
import AuthStatus from "./components/AuthStatus";

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Come&Start",
  description: "Pitch, Vote and Grow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <AuthStatus />
        <Toaster position="top-center" />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
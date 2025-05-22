"use client";

import { Rubik, Anton, Roboto_Mono, Space_Grotesk } from 'next/font/google';
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import { HeroUIProvider } from '@heroui/react';
import "react-toastify/dist/ReactToastify.css";
import "../styles/main.scss";

// Initialize fonts
const rubik = Rubik({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: '--rubik',
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: '--roboto-mono',
});

const anton = Anton({
  subsets: ["latin", "latin-ext"],
  weight: ["400"],
  variable: '--anton',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  weight: ["400"],
  variable: '--space-grotesk',
});

export default function MainLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${rubik.variable} ${anton.variable} ${robotoMono.variable} dark`}>
      <body>
        <SessionProvider>
          <HeroUIProvider>
            {children}
            <ToastContainer
              position="top-right"
              theme="dark"
            />
          </HeroUIProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

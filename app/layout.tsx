import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rokiya Tanha | Developer Portfolio",
  description:
    "Full Stack Developer skilled in React, Laravel, Django, and modern web technologies.",
  icons: {
    icon: "/profile.jpeg",
  },
  openGraph: {
    title: "Rokiya Tanha | Developer Portfolio",
    description: "Explore my projects, skills, and experience in web and software development.",
    url: "https://rokiyaibnetanha.vercel.app",
    siteName: "Rokiya Tanha Portfolio",
    images: [
      {
        url: "https://rokiyaibnetanha.vercel.app/profile.jpeg",
        width: 1200,
        height: 630,
        alt: "Rokiya Tanha Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rokiya Tanha | Developer Portfolio",
    description: "Full Stack Developer portfolio showcasing projects and skills.",
    images: ["https://rokiyaibnetanha.vercel.app/profile.jpeg"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

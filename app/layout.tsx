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
  title: "Rukaiya Tanha | Developer Portfolio",
  description:
    "Full Stack Developer skilled in Next.js, React, TypeScript, Django, and modern web technologies.",
  icons: {
    icon: "/profile.jpeg",
  },
  openGraph: {
    title: "Rukaiya Tanha | Developer Portfolio",
    description: "Explore my projects, skills, and experience in web development.",
    url: "https://rokiyaibnetanha-portfolio.vercel.app",
    siteName: "Rukaiya Portfolio",
    images: [
      {
        url: "https://rokiyaibnetanha-portfolio.vercel.app/profile.jpeg",
        width: 1200,
        height: 630,
        alt: "Rukaiya Tanha Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rukaiya Tanha | Developer Portfolio",
    description: "Full Stack Developer portfolio showcasing projects and skills.",
    images: ["https://rokiyaibnetanha-portfolio.vercel.app/profile.jpeg"],
  },
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

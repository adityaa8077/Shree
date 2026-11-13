import type { Metadata } from "next";
import { Inter, Playfair_Display, Cormorant_Garamond, Caveat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: '--font-playfair',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: '--font-caveat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "For Dhanshree ✦ | To My Dearest Dove 🕊️",
  description: "A small corner of the universe, made just for you, Dhanshree — to remind you how deeply you are loved and cherished.",
  keywords: "Dhanshree, Dove, love, confession, romantic, love letter, forever, Aditya",
  authors: [{ name: "Made with all my heart by Aditya" }],
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: "For Dhanshree ✦ | To My Dearest Dove 🕊️",
    description: "Every word here was written just for you. Something straight from my heart.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} ${cormorant.variable} ${caveat.variable} font-inter antialiased bg-deepBlack text-softIvory`}>
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Instrument_Sans,
  Noto_Sans_Bengali,
  Noto_Sans_Devanagari,
  Noto_Sans_Tamil,
  Noto_Sans_Telugu,
} from "next/font/google";

import "./globals.css";

// The two brand fonts. Next.js downloads them once when the app is built and
// serves them from our own address, so visitors' browsers never contact Google.
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});
const body = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

// Fonts for names and text in Indian scripts. A browser fetches one of these
// only if the page actually contains that script, so they cost nothing
// otherwise. Other scripts fall back to the device's own fonts.
const devanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-devanagari",
  display: "swap",
  preload: false,
});
const tamil = Noto_Sans_Tamil({
  subsets: ["tamil"],
  variable: "--font-tamil",
  display: "swap",
  preload: false,
});
const bengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  variable: "--font-bengali",
  display: "swap",
  preload: false,
});
const telugu = Noto_Sans_Telugu({
  subsets: ["telugu"],
  variable: "--font-telugu",
  display: "swap",
  preload: false,
});

const fontVariables = [display, body, devanagari, tamil, bengali, telugu]
  .map((font) => font.variable)
  .join(" ");

export const metadata: Metadata = {
  title: {
    default: "Workaora",
    template: "%s | Workaora",
  },
  description:
    "A work-first professional network for India's creator economy and esports industry.",
  // Keep search engines away until public launch. Removed at Gate 3.
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${fontVariables} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}

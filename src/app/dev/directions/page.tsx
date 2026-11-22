/**
 * TEMPORARY design exploration (Phase 1, step 1.6).
 *
 * Shows three visual directions for Workaora so the founder can choose one.
 * Everything on this page is sample content. Nothing here is connected to
 * the database. The page exists only while developing, and is deleted once
 * a direction is chosen.
 */
import type { Metadata } from "next";
import {
  Archivo,
  Bricolage_Grotesque,
  Instrument_Sans,
  Noto_Sans_Devanagari,
  Noto_Sans_Tamil,
  Plus_Jakarta_Sans,
} from "next/font/google";
import { notFound } from "next/navigation";

import { isDevelopment } from "@/lib/env/runtime";

import { DirectionExplorer } from "./explorer";

import "./directions.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
});
const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
});
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});
// Fallbacks so names written in Indian scripts look right in every direction.
const devanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-devanagari",
});
const tamil = Noto_Sans_Tamil({
  subsets: ["tamil"],
  variable: "--font-tamil",
});

export const metadata: Metadata = {
  title: "Design directions",
};

export default function DirectionsPage() {
  if (!isDevelopment) {
    notFound();
  }

  const fontVariables = [
    bricolage,
    instrument,
    archivo,
    jakarta,
    devanagari,
    tamil,
  ]
    .map((font) => font.variable)
    .join(" ");

  return <DirectionExplorer fontVariables={fontVariables} />;
}

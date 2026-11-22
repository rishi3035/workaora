"use client";

import { useState } from "react";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Dialog, DialogContent } from "@/ui/dialog";
import {
  CreatorCustomPageConfig,
  CreatorProfile,
  LayoutMode,
  MediaAsset,
  PageTemplate,
} from "./prototype-types";

type PrototypeCustomPageProps = {
  creator: CreatorProfile;
  isOwner?: boolean;
  onUpdateConfig?: (newConfig: CreatorCustomPageConfig) => void;
  onRequestContact: (creator: CreatorProfile) => void;
  onBackToDirectory?: () => void;
};

const ACCENT_COLORS = [
  { name: "Cyan", value: "#06b6d4" },
  { name: "Violet", value: "#8b5cf6" },
  { name: "Emerald", value: "#10b981" },
  { name: "Amber", value: "#f59e0b" },
  { name: "Rose", value: "#f43f5e" },
];

export function PrototypeCustomPage({
  creator,
  isOwner: _isOwner = true,
  onUpdateConfig,
  onRequestContact,
  onBackToDirectory,
}: PrototypeCustomPageProps) {
  const config = creator.pageConfig;

  // Local state for customizer
  const [selectedTemplate, setSelectedTemplate] = useState<PageTemplate>(
    config.template,
  );
  const [selectedAccent, setSelectedAccent] = useState<string>(
    config.accentColor,
  );
  const [selectedLayout, setSelectedLayout] = useState<LayoutMode>(
    config.layoutMode,
  );
  const [activeMediaFilter, setActiveMediaFilter] = useState<string>("All");
  const [selectedMediaLightbox, setSelectedMediaLightbox] =
    useState<MediaAsset | null>(null);

  // Apply theme classes dynamically based on template
  const getThemeWrapperClass = () => {
    switch (selectedTemplate) {
      case "cyberpunk":
        return "bg-[#090d16] text-slate-100 border-cyan-500/30";
      case "minimalist":
        return "bg-stone-950 text-stone-100 border-stone-800";
      case "vibrant":
        return "bg-[#0f0e17] text-amber-50 border-amber-500/30";
      case "hyper-dark":
        return "bg-[#050505] text-emerald-50 border-emerald-500/30 font-mono";
      default:
        return "bg-surface text-fg border-line";
    }
  };

  const getThemeHeaderGradient = () => {
    switch (selectedTemplate) {
      case "cyberpunk":
        return "from-cyan-900/40 via-purple-900/20 to-transparent";
      case "minimalist":
        return "from-stone-900/60 via-stone-900/20 to-transparent";
      case "vibrant":
        return "from-amber-900/40 via-orange-900/20 to-transparent";
      case "hyper-dark":
        return "from-emerald-950/50 via-slate-950 to-transparent";
      default:
        return "from-accent/20 to-transparent";
    }
  };

  const handleTemplateChange = (tmpl: PageTemplate) => {
    setSelectedTemplate(tmpl);
    if (onUpdateConfig) {
      onUpdateConfig({
        ...config,
        template: tmpl,
        accentColor: selectedAccent,
        layoutMode: selectedLayout,
      });
    }
  };

  const handleAccentChange = (hex: string) => {
    setSelectedAccent(hex);
    if (onUpdateConfig) {
      onUpdateConfig({
        ...config,
        template: selectedTemplate,
        accentColor: hex,
        layoutMode: selectedLayout,
      });
    }
  };

  const handleLayoutChange = (mode: LayoutMode) => {
    setSelectedLayout(mode);
    if (onUpdateConfig) {
      onUpdateConfig({
        ...config,
        template: selectedTemplate,
        accentColor: selectedAccent,
        layoutMode: mode,
      });
    }
  };

  const filteredMedia = config.featuredMedia.filter((m) => {
    if (activeMediaFilter === "All") return true;
    if (activeMediaFilter === "Videos") return m.type === "video";
    if (activeMediaFilter === "Art") return m.type === "art";
    if (activeMediaFilter === "Photos") return m.type === "photo";
    return true;
  });

  return (
    <div className="space-y-6">
      {/* ========================================================================= */}
      {/* INTERACTIVE CUSTOMIZER BAR (Visible for testing & styling)               */}
      {/* ========================================================================= */}
      <div className="rounded-xl shadow-sm border border-line bg-surface p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <span className="rounded-lg flex h-7 w-7 items-center justify-center bg-accent/20 text-sm text-accent">
              🎨
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-bold tracking-wider text-fg uppercase">
                  Page Customization Studio
                </h3>
                <span className="rounded bg-accent/15 px-2 py-0.5 text-[10px] font-semibold text-accent">
                  Live Customizer
                </span>
              </div>
              <p className="text-[11px] text-muted">
                Tweak templates, accent colors, and layout modes to see this
                page re-style instantly.
              </p>
            </div>
          </div>

          {/* Quick Selectors */}
          <div className="flex flex-wrap items-center gap-4 text-xs">
            {/* Template Selector */}
            <div className="flex items-center gap-1.5">
              <span className="font-medium text-muted">Theme:</span>
              <div className="bg-surface-elevated flex rounded-md border border-line p-0.5">
                {(
                  [
                    ["cyberpunk", "Cyberpunk"],
                    ["minimalist", "Minimalist"],
                    ["vibrant", "Vibrant"],
                    ["hyper-dark", "Hyper-Dark"],
                  ] as const
                ).map(([id, label]) => (
                  <button
                    key={id}
                    onClick={() => handleTemplateChange(id)}
                    className={`rounded px-2 py-1 text-[11px] font-medium transition ${
                      selectedTemplate === id
                        ? "text-accent-fg shadow-2xs bg-accent"
                        : "text-muted hover:text-fg"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Accent Color Picker */}
            <div className="flex items-center gap-1.5">
              <span className="font-medium text-muted">Accent:</span>
              <div className="flex items-center gap-1">
                {ACCENT_COLORS.map((col) => (
                  <button
                    key={col.value}
                    onClick={() => handleAccentChange(col.value)}
                    className={`h-5 w-5 rounded-full border transition ${
                      selectedAccent === col.value
                        ? "border-white scale-110 ring-2 ring-accent"
                        : "border-transparent opacity-80 hover:opacity-100"
                    }`}
                    style={{ backgroundColor: col.value }}
                    title={col.name}
                  />
                ))}
              </div>
            </div>

            {/* Layout Mode */}
            <div className="flex items-center gap-1.5">
              <span className="font-medium text-muted">Layout:</span>
              <div className="bg-surface-elevated flex rounded-md border border-line p-0.5">
                {(
                  [
                    ["cinema", "Cinema 16:9"],
                    ["masonry", "Masonry Grid"],
                    ["case-studies", "Case Studies"],
                  ] as const
                ).map(([id, label]) => (
                  <button
                    key={id}
                    onClick={() => handleLayoutChange(id)}
                    className={`rounded px-2 py-1 text-[11px] font-medium transition ${
                      selectedLayout === id
                        ? "text-accent-fg shadow-2xs bg-accent"
                        : "text-muted hover:text-fg"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {onBackToDirectory && (
              <Button variant="secondary" size="sm" onClick={onBackToDirectory}>
                ← Return to Directory
              </Button>
            )}
          </div>
        </div>

        {/* Platform Managed Infra Badge */}
        <div className="mt-3 flex flex-wrap items-center justify-between border-t border-line/60 pt-2 text-[11px] text-muted">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-500 flex h-2 w-2 animate-pulse rounded-full" />
            <span>
              <strong>Platform-Managed URL:</strong> workaora.com/@
              {config.customSlug}
            </span>
            <span>&middot;</span>
            <span>Mumbai Edge (bom1) &middot; &lt;28ms</span>
          </div>
          <span className="rounded bg-surface-elevated px-2 py-0.5 text-[10px] text-muted">
            SSL Active (TLS 1.3) &middot; Zero DNS Setup Needed
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* THE ACTUAL BESPOKE CREATOR HOMEPAGE CONTAINER                             */}
      {/* ========================================================================= */}
      <div
        className={`rounded-2xl shadow-xl overflow-hidden border transition-all duration-300 ${getThemeWrapperClass()}`}
      >
        {/* Hero Banner Section */}
        <div
          className={`border-white/10 relative border-b bg-gradient-to-b ${getThemeHeaderGradient()} px-6 py-10 sm:px-10`}
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div
                className="rounded-2xl shadow-lg relative flex h-20 w-20 shrink-0 items-center justify-center text-2xl font-black"
                style={{
                  backgroundColor: `${selectedAccent}25`,
                  color: selectedAccent,
                  borderColor: `${selectedAccent}60`,
                  borderWidth: 2,
                }}
              >
                {creator.avatar}
                <span className="bg-emerald-500 text-black absolute -right-1 -bottom-1 rounded-full p-1 text-[10px]">
                  ✓
                </span>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-display text-2xl font-extrabold sm:text-3xl">
                    {creator.name}
                  </h1>
                  <span
                    className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                    style={{
                      backgroundColor: `${selectedAccent}20`,
                      color: selectedAccent,
                    }}
                  >
                    {creator.handle}
                  </span>
                  <Badge tone="neutral">{creator.category}</Badge>
                </div>

                <p className="mt-1 text-sm font-medium opacity-90">
                  {creator.headline}
                </p>

                <p className="mt-2 max-w-xl text-xs opacity-75">
                  {config.heroTagline}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs opacity-80">
                  <span>📍 {creator.location}</span>
                  <span>&middot;</span>
                  <span>🗣️ {creator.languages.join(", ")}</span>
                  <span>&middot;</span>
                  <span>⏱️ {creator.rates.turnaround} SLA</span>
                </div>
              </div>
            </div>

            {/* Direct Hire CTA in Hero */}
            <div className="flex flex-col gap-2 sm:items-end">
              <button
                onClick={() => onRequestContact(creator)}
                className="rounded-xl shadow-lg flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold transition duration-200 hover:opacity-95 active:scale-95"
                style={{
                  backgroundColor: selectedAccent,
                  color:
                    selectedAccent === "#06b6d4" || selectedAccent === "#10b981"
                      ? "#000000"
                      : "#ffffff",
                }}
              >
                <span>⚡ Hire {creator.name.split(" ")[0]}</span>
              </button>
              <span className="text-[11px] opacity-70">
                Primary: <strong>{creator.rates.primaryRate}</strong> (
                {creator.rates.primaryUnit.slice(0, 18)}...)
              </span>
            </div>
          </div>

          {/* Verified Stats Ribbon */}
          {config.showVerifiedMetrics && (
            <div className="border-white/10 mt-8 grid grid-cols-2 gap-3 border-t pt-6 sm:grid-cols-4">
              <div className="rounded-xl bg-white/5 border-white/5 border p-3 backdrop-blur-sm">
                <span className="text-[11px] font-semibold tracking-wider uppercase opacity-65">
                  Retention Score
                </span>
                <p
                  className="mt-1 text-lg font-black"
                  style={{ color: selectedAccent }}
                >
                  64% 30s
                </p>
                <span className="text-[10px] opacity-60">
                  Verified YouTube Analytics
                </span>
              </div>

              <div className="rounded-xl bg-white/5 border-white/5 border p-3 backdrop-blur-sm">
                <span className="text-[11px] font-semibold tracking-wider uppercase opacity-65">
                  Aggregate Views
                </span>
                <p
                  className="mt-1 text-lg font-black"
                  style={{ color: selectedAccent }}
                >
                  20M+ Views
                </p>
                <span className="text-[10px] opacity-60">Across 40+ cuts</span>
              </div>

              <div className="rounded-xl bg-white/5 border-white/5 border p-3 backdrop-blur-sm">
                <span className="text-[11px] font-semibold tracking-wider uppercase opacity-65">
                  Guaranteed SLA
                </span>
                <p
                  className="mt-1 text-lg font-black"
                  style={{ color: selectedAccent }}
                >
                  {creator.rates.turnaround}
                </p>
                <span className="text-[10px] opacity-60">
                  Strict delivery guarantee
                </span>
              </div>

              <div className="rounded-xl bg-white/5 border-white/5 border p-3 backdrop-blur-sm">
                <span className="text-[11px] font-semibold tracking-wider uppercase opacity-65">
                  Confirmed Collabs
                </span>
                <p
                  className="mt-1 text-lg font-black"
                  style={{ color: selectedAccent }}
                >
                  2 Partners
                </p>
                <span className="text-[10px] opacity-60">
                  TechnoGamerz, S8UL
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Media Showcase Navigation */}
        <div className="border-white/10 flex items-center justify-between border-b px-6 py-3 sm:px-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold tracking-wider uppercase opacity-80">
              Featured Work ({config.featuredMedia.length})
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            {["All", "Videos", "Art", "Photos"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveMediaFilter(tab)}
                className={`rounded-lg px-2.5 py-1 text-xs transition ${
                  activeMediaFilter === tab
                    ? "bg-white/15 text-white font-semibold"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Layout Rendering */}
        <div className="p-6 sm:p-10">
          {/* LAYOUT 1: CINEMA SHOWREEL */}
          {selectedLayout === "cinema" && (
            <div className="space-y-6">
              {/* Spotlight Cinema Frame */}
              {filteredMedia[0] && (
                <div className="rounded-2xl border-white/15 bg-black shadow-2xl group relative overflow-hidden border">
                  <div className="relative aspect-video w-full overflow-hidden">
                    <img
                      src={filteredMedia[0].url}
                      alt={filteredMedia[0].title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="from-black via-black/30 absolute inset-0 bg-gradient-to-t to-transparent" />

                    {/* Spotlight Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="text-black shadow-2xl flex h-16 w-16 items-center justify-center rounded-full transition duration-300 group-hover:scale-110"
                        style={{ backgroundColor: selectedAccent }}
                      >
                        <svg
                          className="ml-1 h-7 w-7 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>

                    {/* Spotlight Meta Overlay */}
                    <div className="absolute right-6 bottom-6 left-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <span
                          className="rounded-full px-2.5 py-1 text-[11px] font-bold"
                          style={{
                            backgroundColor: selectedAccent,
                            color: "#000000",
                          }}
                        >
                          ★ FEATURED SHOWREEL
                        </span>
                        <h2 className="text-white mt-2 font-display text-xl font-black sm:text-2xl">
                          {filteredMedia[0].title}
                        </h2>
                        <p className="text-white/80 text-xs">
                          {filteredMedia[0].subtitle}
                        </p>
                      </div>

                      {filteredMedia[0].metric && (
                        <div className="rounded-xl bg-black/80 border-white/20 text-emerald-400 border px-3 py-1.5 text-xs font-semibold backdrop-blur-md">
                          ⚡ {filteredMedia[0].metric}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Cinema Timecode Chapter Bar */}
                  <div className="border-white/10 bg-white/5 flex flex-wrap items-center justify-between border-t px-6 py-3 text-xs opacity-80">
                    <div className="flex items-center gap-4">
                      <span>
                        <strong>00:00</strong> Hook &amp; Cold Open
                      </span>
                      <span>
                        <strong>01:15</strong> Dynamic Pacing Transition
                      </span>
                      <span>
                        <strong>08:30</strong> Climax Sound Design
                      </span>
                    </div>
                    <span className="text-[11px]">
                      Tools: Premiere Pro &middot; After Effects &middot;
                      DaVinci
                    </span>
                  </div>
                </div>
              )}

              {/* Supporting Secondary Cuts */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {filteredMedia.slice(1).map((media) => (
                  <div
                    key={media.id}
                    onClick={() => setSelectedMediaLightbox(media)}
                    className="group rounded-xl border-white/10 bg-white/5 hover:border-white/20 cursor-pointer overflow-hidden border p-3 transition"
                  >
                    <div className="rounded-lg bg-black aspect-video w-full overflow-hidden">
                      <img
                        src={media.url}
                        alt={media.title}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="mt-3">
                      <h4 className="text-sm font-bold">{media.title}</h4>
                      <p className="mt-0.5 text-xs opacity-70">
                        {media.subtitle}
                      </p>
                      {media.metric && (
                        <span
                          className="rounded mt-2 inline-block px-2 py-0.5 text-[10px] font-semibold"
                          style={{
                            backgroundColor: `${selectedAccent}25`,
                            color: selectedAccent,
                          }}
                        >
                          {media.metric}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* LAYOUT 2: MASONRY GALLERY */}
          {selectedLayout === "masonry" && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {filteredMedia.map((media) => (
                <div
                  key={media.id}
                  onClick={() => setSelectedMediaLightbox(media)}
                  className="group rounded-xl border-white/10 bg-white/5 hover:shadow-2xl cursor-pointer overflow-hidden border transition hover:scale-[1.02]"
                >
                  <div className="bg-black relative aspect-square w-full overflow-hidden">
                    <img
                      src={media.url}
                      alt={media.title}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                    />
                    <div className="from-black/80 absolute inset-0 flex items-end bg-gradient-to-t via-transparent to-transparent p-4 opacity-0 transition duration-300 group-hover:opacity-100">
                      <div>
                        <span
                          className="rounded text-black px-2 py-0.5 text-[10px] font-bold"
                          style={{ backgroundColor: selectedAccent }}
                        >
                          {media.type.toUpperCase()}
                        </span>
                        <h4 className="text-white mt-1 text-xs font-bold">
                          {media.title}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <h4 className="text-xs font-bold">{media.title}</h4>
                    <p className="text-[11px] opacity-70">{media.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* LAYOUT 3: CASE STUDIES */}
          {selectedLayout === "case-studies" && (
            <div className="space-y-6">
              {creator.works.map((work) => (
                <div
                  key={work.id}
                  className="rounded-2xl border-white/10 bg-white/5 border p-6 backdrop-blur-md"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <span
                        className="rounded px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase"
                        style={{
                          backgroundColor: `${selectedAccent}25`,
                          color: selectedAccent,
                        }}
                      >
                        Case Study &middot; {work.category}
                      </span>
                      <h3 className="mt-2 font-display text-lg font-bold">
                        {work.title}
                      </h3>
                      <p className="mt-1 text-xs opacity-75">
                        Role: <strong>{work.role}</strong> &middot; Turnaround:{" "}
                        {work.turnaround}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="rounded-xl bg-black/60 border-white/10 text-emerald-400 border px-3 py-1.5 text-xs font-bold">
                        {work.retention}
                      </div>
                      <div className="rounded-xl bg-black/60 border-white/10 border px-3 py-1.5 text-xs font-bold opacity-90">
                        {work.views}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="rounded-xl bg-black aspect-video w-full overflow-hidden">
                      <img
                        src={work.thumbnailUrl}
                        alt={work.title}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="rounded-xl bg-black/40 border-white/5 flex flex-col justify-between space-y-3 border p-4">
                      <div className="space-y-2 text-xs">
                        <div>
                          <strong className="text-white/90">
                            The Client Challenge:
                          </strong>
                          <p className="mt-0.5 opacity-70">
                            Creator channel had high drop-off at the 15-second
                            mark due to slow narrative pacing and generic stock
                            audio cues.
                          </p>
                        </div>
                        <div>
                          <strong className="text-white/90">
                            The Creative Strategy:
                          </strong>
                          <p className="mt-0.5 opacity-70">
                            Constructed rapid sound-designed cold hook, injected
                            custom comedic visual zooms, and cut redundant 3-min
                            b-roll segments.
                          </p>
                        </div>
                        <div>
                          <strong className="text-white/90">The Result:</strong>
                          <p className="text-emerald-400 mt-0.5 font-semibold">
                            Retained 64% viewers past 30 seconds; overall
                            retention lifted by 24% vs channel average.
                          </p>
                        </div>
                      </div>

                      <div className="border-white/10 flex flex-wrap gap-1.5 border-t pt-2">
                        {work.tools.map((t) => (
                          <span
                            key={t}
                            className="rounded bg-white/10 px-2 py-0.5 text-[10px] opacity-80"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Transparent Rate Card & SLA Guarantee Block */}
          {config.showRateCard && (
            <div className="rounded-2xl border-white/10 bg-white/5 mt-10 border p-6 backdrop-blur-md">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-display text-base font-bold">
                    Transparent Rate Card &amp; Guaranteed SLA
                  </h3>
                  <p className="mt-0.5 text-xs opacity-75">
                    No hidden fees. Bookings route through Workaora verified
                    escrow &amp; collaboration milestones.
                  </p>
                </div>
                <button
                  onClick={() => onRequestContact(creator)}
                  className="rounded-xl px-4 py-2 text-xs font-bold transition hover:opacity-95"
                  style={{
                    backgroundColor: selectedAccent,
                    color:
                      selectedAccent === "#06b6d4" ||
                      selectedAccent === "#10b981"
                        ? "#000000"
                        : "#ffffff",
                  }}
                >
                  Request Direct Contact
                </button>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-black/40 border-white/10 border p-4">
                  <span className="text-[11px] font-semibold uppercase opacity-60">
                    Standard Project Rate
                  </span>
                  <p
                    className="mt-1 text-xl font-black"
                    style={{ color: selectedAccent }}
                  >
                    {creator.rates.primaryRate}
                  </p>
                  <p className="mt-1 text-xs opacity-70">
                    {creator.rates.primaryUnit}
                  </p>
                </div>

                <div className="rounded-xl bg-black/40 border-white/10 border p-4">
                  <span className="text-[11px] font-semibold uppercase opacity-60">
                    Monthly Retainer
                  </span>
                  <p
                    className="mt-1 text-xl font-black"
                    style={{ color: selectedAccent }}
                  >
                    {creator.rates.retainerRate || "Custom Retainer"}
                  </p>
                  <p className="mt-1 text-xs opacity-70">
                    Dedicated turnaround bandwidth
                  </p>
                </div>

                <div className="rounded-xl bg-black/40 border-white/10 border p-4">
                  <span className="text-[11px] font-semibold uppercase opacity-60">
                    Turnaround &amp; Revisions
                  </span>
                  <p
                    className="mt-1 text-xl font-black"
                    style={{ color: selectedAccent }}
                  >
                    {creator.rates.turnaround}
                  </p>
                  <p className="mt-1 text-xs opacity-70">
                    {creator.rates.revisions}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Platform Footer */}
        <div className="border-white/10 bg-black/60 flex flex-col gap-2 border-t px-6 py-4 text-xs opacity-70 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold">Workaora Pages</span>
            <span>&middot;</span>
            <span>Zero-Config Hosting &amp; Global CDN</span>
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <span>100% DPDP Act Compliant</span>
            <span>&middot;</span>
            <span>Encrypted Verification Seal</span>
          </div>
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      <Dialog
        open={!!selectedMediaLightbox}
        onOpenChange={(open) => !open && setSelectedMediaLightbox(null)}
      >
        <DialogContent
          title={selectedMediaLightbox?.title || "Portfolio Asset"}
          description={selectedMediaLightbox?.subtitle || ""}
          className="bg-black text-white border-white/20 sm:max-w-2xl"
        >
          {selectedMediaLightbox && (
            <div className="space-y-4">
              <div className="rounded-xl bg-black aspect-video w-full overflow-hidden">
                <img
                  src={selectedMediaLightbox.url}
                  alt={selectedMediaLightbox.title}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="border-white/10 flex items-center justify-between border-t pt-3 text-xs">
                <span className="text-emerald-400 font-semibold">
                  {selectedMediaLightbox.metric}
                </span>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setSelectedMediaLightbox(null);
                    onRequestContact(creator);
                  }}
                >
                  Hire for Project Like This
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

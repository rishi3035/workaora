# Workaora: Master Engineering & Product Specification

## 1. Executive Architecture Overview

Workaora is an India-first professional network and hiring platform for digital creators, video editors, designers, thumbnail artists, and esports professionals.

The architecture combines three primary operational surfaces:
1. **The Hiring Gateway & Marketplace**: Connecting talent managers, content creators, and esports orgs with vetted creative talent through verified proof of work and DPDP-compliant contact dispatch.
2. **The Social Discovery Feed**: An Instagram/LinkedIn-style vertical work feed fostering daily creator-to-creator engagement, work drops, impressions telemetry, likes, and threaded comments.
3. **Custom Creator Pages (No-Code Portfolio Builder)**: Giving every creator their own bespoke homepage (`workaora.com/@handle`) with instant theme templates, layout modes (Masonry, Cinema, Case Studies), and platform-managed zero-config hosting.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                             CLIENT APPLICATION                              │
│                (Next.js 16 App Router · TypeScript · Tailwind CSS)          │
├───────────────────┬─────────────────────────┬───────────────────────────────┤
│   Role Gateway    │   Social Discovery Feed │    Custom Creator Pages       │
│ • Role Switcher   │ • Real-time Work Drops  │ • Aesthetic Themes (4 Types)  │
│ • Creator Studio  │ • Likes & Views Counter │ • Layouts: Masonry / Cinema   │
│ • Manager Hub     │ • Interactive Comments  │ • Rate Cards & Booking CTA    │
│ • Instant Preview │ • Category Filters      │ • Platform Infra Drawer       │
└───────────────────┴─────────────────────────┴───────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    PLATFORM-MANAGED INFRASTRUCTURE LAYER                    │
├─────────────────────────────────────────────────────────────────────────────┤
│ • Zero-Config Edge Routing: Instant subdomain & slug mapping (/@handle)     │
│ • Global Media CDN: Mumbai (bom1) & Delhi (del1) PoPs (<300ms latency)      │
│ • Lossless Transcoding: Automatic WebP/AVIF media pipeline                  │
│ • Edge Analytics: Real-time visits, manager inquiries, 100% DPDP compliant │
│ • Automated SSL & Dynamic OpenGraph Meta generation                         │
└─────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           PERSISTENCE & SECURITY                            │
├─────────────────────────────────────────────────────────────────────────────┤
│ • Supabase Postgres + RLS: Profiles, Portfolio, Feed Posts, Likes, Comments │
│ • Dual-Role Auth & DPDP Compliance: Guarded contact disclosure              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Core Domain Data Models

### 2.1 Social Discovery Feed Models

```typescript
export type FeedComment = {
  id: string;
  authorName: string;
  authorHandle: string;
  authorAvatar: string;
  authorRole: string; // e.g. "Creator", "Talent Manager", "Esports Director"
  content: string;
  timestamp: string;
};

export type FeedPost = {
  id: string;
  creatorId: string;
  creatorName: string;
  creatorHandle: string;
  creatorAvatar: string;
  creatorCategory: string;
  timestamp: string;
  caption: string;
  mediaType: "video" | "art" | "thumbnail" | "reel";
  mediaUrl: string;
  mediaAspectRatio?: "16:9" | "1:1" | "9:16";
  metricsBadge?: {
    label: string; // e.g. "68% 30s Retention", "1.4M Organic Views"
    iconType?: "trending" | "views" | "verified";
  };
  clientCollab?: string; // e.g. "Techno Gamerz", "S8UL Esports"
  likesCount: number;
  isLikedByUser: boolean;
  viewsCount: number;
  comments: FeedComment[];
  tags: string[];
};
```

### 2.2 Custom Creator Page & Theming Models

```typescript
export type PageTemplate =
  | "cyberpunk"   // Deep slate `#090d16`, neon cyan & violet accents, esports gaming vibe
  | "minimalist"  // Crisp monochrome editorial, stone borders, understated luxury
  | "vibrant"     // Warm amber/gold accents, energetic lifestyle/entertainment creator
  | "hyper-dark"; // Deep obsidian `#050505`, electric emerald highlights, technical grid

export type LayoutMode =
  | "masonry"      // Multi-column visual grid for art, photos, thumbnails
  | "cinema"       // Widescreen spotlight hero showreel + chapter breakdowns
  | "case-studies";// Structured problem/solution/retention analytical breakdown

export type MediaAsset = {
  id: string;
  title: string;
  type: "video" | "photo" | "art";
  url: string;
  aspect: "16:9" | "9:16" | "1:1";
  subtitle?: string;
  metric?: string;
};

export type CreatorCustomPageConfig = {
  template: PageTemplate;
  accentColor: string; // e.g. "#06b6d4", "#8b5cf6", "#10b981", "#f59e0b", "#f43f5e"
  layoutMode: LayoutMode;
  heroTagline: string;
  bannerStyle: "gradient" | "mesh" | "geometric" | "esports-neon";
  showVerifiedMetrics: boolean;
  showRateCard: boolean;
  showContactCTA: boolean;
  featuredMedia: MediaAsset[];
  customSlug: string; // e.g. "amansharma"
};
```

### 2.3 Platform-Managed Infrastructure Model

```typescript
export type PlatformInfraStatus = {
  slugUrl: string; // e.g. "https://workaora.com/@amansharma"
  cdnStatus: "active" | "provisioning";
  cdnRegion: string; // "Mumbai (bom1) & Delhi (del1) PoP"
  edgeLatency: string; // "< 32ms"
  sslStatus: "tls-1.3-active";
  ogMetaStatus: "auto-generated";
  analyticsSummary: {
    totalViews: number;
    uniqueManagers: number;
    profileClicks: number;
    avgTimeOnPage: string;
  };
};
```

---

## 3. UI Component Hierarchy & View Routing

The prototype incorporates client-side state routing across roles and experiences:

```
PrototypeApp
 └─ ToastProvider
     └─ PrototypeInner
         ├─ Navigation Bar
         │   ├─ Brand Logo ("Workaora")
         │   └─ Navigation Pills:
         │       • "🏠 Home Gateway"
         │       • "⚡ Social Feed" (Unread drop counter)
         │       • "🎨 Creator Studio"
         │       • "🌐 Custom Page Preview" (Live preview of @handle)
         │       • "🏢 Manager Hub (4 Creators)"
         │
         ├─ View: Home Role Gateway (`role === "gateway"`)
         │   ├─ Hero Headline & Value Proposition
         │   └─ Role Selection Cards (Social Feed, Creator Studio, Manager Hub, Custom Page)
         │
         ├─ View: Social Discovery Feed (`role === "feed"`)
         │   ├─ Feed Category Filter Bar (All, Video & VFX, Thumbnails & Art, Esports)
         │   ├─ Creator Quick-Composer ("Share New Work Drop")
         │   └─ Feed Post Stream:
         │       ├─ Post Header (Creator avatar, handle, role, timestamp)
         │       ├─ Post Body (Caption, tags, verified collab)
         │       ├─ Media Showcase (Video player, art lightbox, thumbnail)
         │       ├─ Performance Proof Badge (Retention, Views)
         │       ├─ Interactive Action Bar (Like toggle, Views count, Comment toggle, Hire CTA)
         │       └─ Expandable Threaded Comments Drawer (Thread list + Add Comment form)
         │
         ├─ View: Creator Studio (`role === "creator"`)
         │   ├─ Creator Profile Card & Live Metrics
         │   ├─ Platform-Managed Infrastructure Drawer (Edge status, Slug, SSL, CDN)
         │   ├─ Portfolio Asset Manager (Add/Edit items, SLA, Retention badges)
         │   ├─ Rate Card & SLA Configurator
         │   └─ Custom Page Editor Card (Theme presets, Accent picker, Layout toggle)
         │
         ├─ View: Custom Creator Page (`role === "custom-page"`)
         │   ├─ Customizable Hero Banner (Branded pattern, Avatar, Tagline, Stats)
         │   ├─ Custom Theme Styler Bar (Live theme, accent, and layout switcher)
         │   ├─ Media Showcase Section:
         │   │   • Masonry Gallery View (Art, Photos, Thumbnails)
         │   │   • Cinema Showreel View (Video player spotlight)
         │   │   • Case Studies View (Problem, retention metrics, tools)
         │   ├─ Verified Rate Card & Turnaround SLA Block
         │   ├─ Sticky "Book / Hire Creator" Action
         │   └─ Platform Footer ("Hosted on Workaora Edge Infrastructure")
         │
         └─ View: Manager Hub (`role === "manager"`)
             ├─ Search & Category Filter Bar
             ├─ Shortlist Drawer & Counter
             ├─ Creator Grid (4 Creator Profiles with live updates)
             └─ Modal Dialogs (Creator Details, DPDP Contact Request)
```

---

## 4. Platform-Managed Infrastructure Directives

1. **Zero DevSecOps Overhead for Creators**:
   Creators never edit DNS CNAME records, upload SSL certificates, configure Nginx, or manage CDN invalidations. The platform handles all hosting automatically upon profile creation.
2. **India-Optimized Edge CDN**:
   Static assets (WebP/AVIF images, video previews) are distributed across edge nodes in Mumbai (`bom1`) and Delhi (`del1`), ensuring sub-300ms loading on 4G/5G networks.
3. **Automated Social OpenGraph Generation**:
   Whenever a creator's URL (`workaora.com/@handle`) is pasted into WhatsApp, Twitter/X, Discord, or LinkedIn, the platform automatically renders a rich preview card with their name, category, top retention metric, and verified badges.
4. **DPDP Compliance & Edge Analytics**:
   In strict compliance with India's Digital Personal Data Protection (DPDP) Act, analytics capture aggregate page views and manager interactions without personal tracking cookies or cross-site fingerprinting.

// --- WORKAORA PROTOTYPE SHARED DOMAIN TYPES ---

export type WorkspaceRole =
  "gateway" | "feed" | "creator" | "custom-page" | "manager" | "org";

export type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  views: string;
  retention: string;
  role: string;
  tools: string[];
  turnaround: string;
  thumbnailUrl: string;
  dateAdded: string;
  confirmedCollab?: {
    channelName: string;
    verifiedDate: string;
  };
  appreciateCount: number;
};

export type PageTemplate =
  | "cyberpunk" // Dark slate #090d16, cyan & violet neon accents, gaming/esports vibe
  | "minimalist" // Crisp monochrome editorial, stone borders, understated luxury
  | "vibrant" // Warm amber/gold highlights, high-energy entertainment & lifestyle
  | "hyper-dark"; // Deep obsidian #050505, electric emerald accents, technical grid

export type LayoutMode =
  | "masonry" // Multi-column visual grid for art, photos, thumbnails
  | "cinema" // Widescreen spotlight hero showreel + chapter breakdowns
  | "case-studies"; // Deep analytical case studies with problem, retention, and tools

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

export type CreatorProfile = {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  category:
    | "Video Editing"
    | "Thumbnail Design"
    | "Scriptwriting"
    | "Motion Graphics"
    | "Esports";
  headline: string;
  location: string;
  languages: string[];
  experienceYears: number;
  rates: {
    primaryRate: string;
    primaryUnit: string;
    retainerRate?: string;
    turnaround: string;
    revisions: string;
  };
  bio: string;
  lastUpdated: string;
  latestUpdateNote: string;
  works: PortfolioItem[];
  contactDetails: {
    whatsapp: string;
    email: string;
    discord?: string;
  };
  pageConfig: CreatorCustomPageConfig;
};

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

export type Opportunity = {
  id: string;
  title: string;
  creatorOrg: string;
  rate: string;
  rateType: string;
  turnaround: string;
  category: string;
  applicantsCount: number;
};

export type PlatformInfraStatus = {
  slugUrl: string;
  cdnStatus: "active" | "provisioning";
  cdnRegion: string;
  edgeLatency: string;
  sslStatus: "tls-1.3-active";
  ogMetaStatus: "auto-generated";
  analyticsSummary: {
    totalViews: number;
    uniqueManagers: number;
    profileClicks: number;
    avgTimeOnPage: string;
  };
};

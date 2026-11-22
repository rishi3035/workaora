"use client";

import { useState } from "react";
import { Avatar } from "@/ui/avatar";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import { Checkbox } from "@/ui/checkbox";
import { Dialog, DialogContent } from "@/ui/dialog";
import { Field, Input, Select, Textarea } from "@/ui/field";
import { AlertIcon, CheckIcon, CloseIcon, InfoIcon } from "@/ui/icons";
import { ToastProvider, useToast } from "@/ui/toast";

// --- CORE TYPES ---
export type WorkspaceRole = "gateway" | "creator" | "manager" | "org";

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

// --- INITIAL CREATORS SEED DATA ---
const INITIAL_CREATORS: CreatorProfile[] = [
  {
    id: "creator-1",
    name: "Aman Sharma",
    handle: "@aman_edits",
    avatar: "AS",
    category: "Video Editing",
    headline: "Senior Video Editor & Retention Pacing Specialist",
    location: "Mumbai, India (Remote)",
    languages: ["Hindi", "English"],
    experienceYears: 4,
    rates: {
      primaryRate: "₹3,500",
      primaryUnit: "per long-form video (8–15 min)",
      retainerRate: "₹40,000 / month (10 videos)",
      turnaround: "48 hours",
      revisions: "2 rounds free",
    },
    bio: "Pacing-driven video editor specialized in long-form YouTube essays, comedic timing, and multi-track audio leveling with 20M+ cumulative views.",
    lastUpdated: "10 mins ago",
    latestUpdateNote:
      "Added new 1.4M view esports documentary cut & updated turn-around to 48h.",
    contactDetails: {
      whatsapp: "+91 98765 43210",
      email: "aman.edits@example.com",
      discord: "aman_cuts#1234",
    },
    works: [
      {
        id: "work-1",
        title: "1M+ Views Pacing Edit: Inside India's Mobile Esports Scene",
        category: "Long-form YouTube Documentary",
        views: "1.4M views",
        retention: "64% 30s Retention",
        role: "Lead Editor & Story Pacer",
        tools: ["Premiere Pro", "After Effects", "Sound Design"],
        turnaround: "48 Hours",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
        dateAdded: "Yesterday",
        confirmedCollab: {
          channelName: "S8UL Gaming",
          verifiedDate: "Oct 2026",
        },
        appreciateCount: 142,
      },
      {
        id: "work-2",
        title: "High-Retention Cut: The Untold Story of India's UPI Revolution",
        category: "Finance Breakdown",
        views: "890K views",
        retention: "59% Average View Duration",
        role: "Motion Graphics & Editor",
        tools: ["After Effects", "Illustrator"],
        turnaround: "4 Days",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
        dateAdded: "3 days ago",
        confirmedCollab: {
          channelName: "Tanmay Bhat Productions",
          verifiedDate: "Sep 2026",
        },
        appreciateCount: 98,
      },
    ],
  },
  {
    id: "creator-2",
    name: "Rhea Sen",
    handle: "@rhea_thumbnails",
    avatar: "RS",
    category: "Thumbnail Design",
    headline: "Esports 3D Thumbnail Designer & Asset Illustrator",
    location: "Bengaluru, India (Remote)",
    languages: ["English", "Hindi", "Bengali"],
    experienceYears: 3,
    rates: {
      primaryRate: "₹1,800",
      primaryUnit: "per 3D rendered thumbnail",
      retainerRate: "₹30,000 / month (20 thumbnails)",
      turnaround: "12–24 hours",
      revisions: "Unlimited text/color tweaks",
    },
    bio: "High CTR thumbnail artist creating clickable 3D character poses in Blender with dynamic rim lighting for tier-1 gaming channels.",
    lastUpdated: "1 hour ago",
    latestUpdateNote: "Uploaded BGMI World Invitational 14.2% CTR thumbnail.",
    contactDetails: {
      whatsapp: "+91 98450 11223",
      email: "rhea.design@example.com",
      discord: "rhea_art#9901",
    },
    works: [
      {
        id: "work-r1",
        title: "14.2% CTR BGMI World Invitational Click-Magnet",
        category: "3D Blender + Photoshop",
        views: "850K Views (14.2% CTR)",
        retention: "Tested across 3 A/B Variants",
        role: "3D Posing & Lighting Artist",
        tools: ["Blender 3D", "Photoshop"],
        turnaround: "12 Hours",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80",
        dateAdded: "Today",
        confirmedCollab: {
          channelName: "S8UL Esports",
          verifiedDate: "Nov 2026",
        },
        appreciateCount: 312,
      },
      {
        id: "work-r2",
        title: "Valorant Radiant Rank Push: High-Contrast Lighting",
        category: "Gaming Thumbnail",
        views: "620K Views (11.8% CTR)",
        retention: "Clean CTR lift",
        role: "Character Extraction",
        tools: ["Photoshop", "Lightroom"],
        turnaround: "18 Hours",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=800&q=80",
        dateAdded: "4 days ago",
        confirmedCollab: {
          channelName: "GodLike Esports",
          verifiedDate: "Aug 2026",
        },
        appreciateCount: 189,
      },
    ],
  },
  {
    id: "creator-3",
    name: "Kabir Joshi",
    handle: "@kabir_writes",
    avatar: "KJ",
    category: "Scriptwriting",
    headline: "YouTube Tech & Finance Scriptwriter (Breakdowns & Storylines)",
    location: "Delhi NCR, India (Remote)",
    languages: ["Hindi", "English"],
    experienceYears: 5,
    rates: {
      primaryRate: "₹4,000",
      primaryUnit: "per 10-12 min script",
      retainerRate: "₹35,000 / month (8 scripts)",
      turnaround: "48–72 hours",
      revisions: "Full research revision",
    },
    bio: "Researched scriptwriter blending consumer psychology, structured comedic callbacks, and deep tech/finance breakdowns.",
    lastUpdated: "5 hours ago",
    latestUpdateNote:
      "Published new script breakdown on smartphone display wars.",
    contactDetails: {
      whatsapp: "+91 98112 33445",
      email: "kabir.scripts@example.com",
    },
    works: [
      {
        id: "work-k1",
        title: "Smartphone Teardown: The Secret Trillion-Dollar Display War",
        category: "Tech Deep-Dive Script",
        views: "1.8M Views (72% Hook Retention)",
        retention: "68% Retention through min 5",
        role: "Lead Researcher & Scriptwriter",
        tools: ["Notion", "Google Docs"],
        turnaround: "48 Hours",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
        dateAdded: "2 days ago",
        confirmedCollab: {
          channelName: "Tech Burner Media",
          verifiedDate: "Sep 2026",
        },
        appreciateCount: 165,
      },
    ],
  },
  {
    id: "creator-4",
    name: "Priya Nair",
    handle: "@priya_motion",
    avatar: "PN",
    category: "Motion Graphics",
    headline: "Lead 2D/3D Motion Graphic Designer & Title Specialist",
    location: "Hyderabad, India (Remote)",
    languages: ["English", "Telugu", "Hindi"],
    experienceYears: 4,
    rates: {
      primaryRate: "₹6,000",
      primaryUnit: "per kinetic motion sequence",
      retainerRate: "₹45,000 / month (Studio retainer)",
      turnaround: "48 hours",
      revisions: "2 review stages",
    },
    bio: "Kinetic motion graphic artist crafting pop-culture title sequences, character overlays, dynamic graph animations, and visual memes.",
    lastUpdated: "Yesterday",
    latestUpdateNote:
      "Updated retainer availability for upcoming December creator schedules.",
    contactDetails: {
      whatsapp: "+91 99001 22334",
      email: "priya.motion@example.com",
      discord: "priya_vfx#4040",
    },
    works: [
      {
        id: "work-p1",
        title: "Dynamic Pop-Up Meme Overlay & Animated Title Package",
        category: "Motion Graphics & After Effects",
        views: "3.2M Views",
        retention: "Used across 12 episodes",
        role: "Motion Director & Animator",
        tools: ["After Effects", "Cinema 4D"],
        turnaround: "3 Days",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
        dateAdded: "5 days ago",
        confirmedCollab: {
          channelName: "Mythpat Studio",
          verifiedDate: "Oct 2026",
        },
        appreciateCount: 275,
      },
    ],
  },
];

const DEFAULT_CREATOR: CreatorProfile = INITIAL_CREATORS[0]!;

export function PrototypeApp() {
  return (
    <ToastProvider>
      <PrototypeInner />
    </ToastProvider>
  );
}

function PrototypeInner() {
  const toast = useToast();

  // Active Role/Profile Mode: "gateway" (Home Switcher), "creator" (Studio), "manager" (Talent Discovery & Hiring), "org" (Brands)
  const [activeRole, setActiveRole] = useState<WorkspaceRole>("gateway");

  // In-Memory Shared State (Live synchronization between Creator edits and Manager discovery)
  const [creators, setCreators] = useState<CreatorProfile[]>(INITIAL_CREATORS);

  // In Creator Mode: which creator is logged in (default to Aman Sharma)
  const [myCreatorId, setMyCreatorId] = useState<string>("creator-1");
  const myProfile: CreatorProfile =
    creators.find((c) => c.id === myCreatorId) ?? DEFAULT_CREATOR;

  // In Manager Mode: currently viewed creator's separate page (null = viewing all creators feed)
  const [inspectedCreatorId, setInspectedCreatorId] = useState<string | null>(
    null,
  );
  const inspectedCreator = creators.find((c) => c.id === inspectedCreatorId);

  // In Manager Mode: search and role filter
  const [managerFilter, setManagerFilter] = useState<string>("All");

  // Manager Shortlisted Creators list
  const [shortlistedCreatorIds, setShortlistedCreatorIds] = useState<string[]>(
    [],
  );

  // Dialog State: Add/Edit Portfolio Item (in Creator Mode)
  const [editWorkModalOpen, setEditWorkModalOpen] = useState(false);
  const [editingWorkId, setEditingWorkId] = useState<string | null>(null);
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState("Long-form YouTube");
  const [formViews, setFormViews] = useState("500K views");
  const [formRetention, setFormRetention] = useState("60% 30s Retention");
  const [formRole, setFormRole] = useState("Lead Editor");
  const [formTurnaround, setFormTurnaround] = useState("48 Hours");
  const [formThumbnail, setFormThumbnail] = useState(
    "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80",
  );

  // Dialog State: Edit Rate Card (in Creator Mode)
  const [rateCardModalOpen, setRateCardModalOpen] = useState(false);
  const [formPrimaryRate, setFormPrimaryRate] = useState(
    myProfile.rates.primaryRate,
  );
  const [formPrimaryUnit, setFormPrimaryUnit] = useState(
    myProfile.rates.primaryUnit,
  );
  const [formRetainer, setFormRetainer] = useState(
    myProfile.rates.retainerRate || "₹40,000 / month",
  );
  const [formSla, setFormSla] = useState(myProfile.rates.turnaround);

  // Dialog State: Manager Request Contact Modal
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactTargetCreator, setContactTargetCreator] =
    useState<CreatorProfile | null>(null);
  const [contactRequestedSuccess, setContactRequestedSuccess] = useState(false);

  // Open "Add Work" Modal
  const handleOpenAddWork = () => {
    setEditingWorkId(null);
    setFormTitle("");
    setFormCategory("Long-form YouTube");
    setFormViews("500K views");
    setFormRetention("60% 30s Retention");
    setFormRole("Lead Editor");
    setFormTurnaround("48 Hours");
    setFormThumbnail(
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80",
    );
    setEditWorkModalOpen(true);
  };

  // Open "Edit Work" Modal
  const handleOpenEditWork = (work: PortfolioItem) => {
    setEditingWorkId(work.id);
    setFormTitle(work.title);
    setFormCategory(work.category);
    setFormViews(work.views);
    setFormRetention(work.retention);
    setFormRole(work.role);
    setFormTurnaround(work.turnaround);
    setFormThumbnail(work.thumbnailUrl);
    setEditWorkModalOpen(true);
  };

  // Save Portfolio Item (Add or Edit)
  const handleSaveWork = () => {
    if (!formTitle.trim()) {
      toast.show({ title: "Please enter a work title.", tone: "danger" });
      return;
    }

    setCreators((prev) =>
      prev.map((creator) => {
        if (creator.id !== myCreatorId) return creator;

        let updatedWorks: PortfolioItem[];
        if (editingWorkId) {
          // Edit existing
          updatedWorks = creator.works.map((w) =>
            w.id === editingWorkId
              ? {
                  ...w,
                  title: formTitle,
                  category: formCategory,
                  views: formViews,
                  retention: formRetention,
                  role: formRole,
                  turnaround: formTurnaround,
                  thumbnailUrl: formThumbnail,
                }
              : w,
          );
        } else {
          // Add new
          const newWork: PortfolioItem = {
            id: `work-${Date.now()}`,
            title: formTitle,
            category: formCategory,
            views: formViews,
            retention: formRetention,
            role: formRole,
            tools: ["Premiere Pro", "After Effects"],
            turnaround: formTurnaround,
            thumbnailUrl: formThumbnail,
            dateAdded: "Just now",
            appreciateCount: 0,
          };
          updatedWorks = [newWork, ...creator.works];
        }

        return {
          ...creator,
          works: updatedWorks,
          lastUpdated: "Just now",
          latestUpdateNote: editingWorkId
            ? `Updated "${formTitle}" portfolio item.`
            : `Published new work: "${formTitle}".`,
        };
      }),
    );

    setEditWorkModalOpen(false);
    toast.show({
      title: editingWorkId
        ? "Work item updated!"
        : "New work published to portfolio!",
      description:
        "Changes are live and immediately visible to Managers and Hirers.",
      tone: "success",
    });
  };

  // Delete Portfolio Item
  const handleDeleteWork = (workId: string) => {
    setCreators((prev) =>
      prev.map((c) =>
        c.id === myCreatorId
          ? { ...c, works: c.works.filter((w) => w.id !== workId) }
          : c,
      ),
    );
    toast.show({ title: "Portfolio item removed.", tone: "neutral" });
  };

  // Save Rate Card
  const handleSaveRateCard = () => {
    setCreators((prev) =>
      prev.map((c) =>
        c.id === myCreatorId
          ? {
              ...c,
              rates: {
                ...c.rates,
                primaryRate: formPrimaryRate,
                primaryUnit: formPrimaryUnit,
                retainerRate: formRetainer,
                turnaround: formSla,
              },
              lastUpdated: "Just now",
              latestUpdateNote: `Updated rate card to ${formPrimaryRate} ${formPrimaryUnit}.`,
            }
          : c,
      ),
    );
    setRateCardModalOpen(false);
    toast.show({
      title: "Rate card updated successfully!",
      description: `New rate: ${formPrimaryRate}. Managers will see this rate when hiring.`,
      tone: "success",
    });
  };

  // Toggle Shortlist in Manager view
  const handleToggleShortlist = (creatorId: string) => {
    setShortlistedCreatorIds((prev) =>
      prev.includes(creatorId)
        ? prev.filter((id) => id !== creatorId)
        : [...prev, creatorId],
    );
    const creator = creators.find((c) => c.id === creatorId);
    toast.show({
      title: shortlistedCreatorIds.includes(creatorId)
        ? "Removed from shortlist"
        : "Added to Candidate Shortlist!",
      description: creator
        ? `${creator.name} is saved in your hiring pipeline.`
        : undefined,
      tone: "success",
    });
  };

  return (
    <div className="flex flex-1 flex-col bg-bg text-fg">
      {/* PERSPECTIVE NAVIGATION BAR */}
      <header className="sticky top-0 z-30 border-b border-line bg-surface/95 backdrop-blur-xs">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setActiveRole("gateway");
                setInspectedCreatorId(null);
              }}
              className="flex items-center gap-2 text-left transition-opacity hover:opacity-80"
            >
              <div className="h-6 w-1.5 rounded-full bg-accent" />
              <span className="font-display text-xl font-bold tracking-tight">
                Workaora
              </span>
            </button>
            <span className="hidden text-xs text-muted sm:inline-block">/</span>
            <span className="text-xs font-semibold text-fg">
              {activeRole === "gateway"
                ? "Role Gateway"
                : activeRole === "creator"
                  ? "Creator Studio (Portfolio & Work Owner)"
                  : activeRole === "manager"
                    ? "Manager Workspace (Talent Discovery & Hiring)"
                    : "Brand & Org Hub"}
            </span>
          </div>

          {/* Quick Role Switcher Buttons */}
          <div className="flex items-center gap-1.5 rounded-md border border-line bg-sunken p-1">
            <button
              type="button"
              onClick={() => {
                setActiveRole("gateway");
                setInspectedCreatorId(null);
              }}
              className={`rounded px-2.5 py-1 text-xs font-semibold transition-colors ${
                activeRole === "gateway"
                  ? "shadow-xs bg-surface text-fg"
                  : "text-muted hover:text-fg"
              }`}
            >
              Home Gateway
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveRole("creator");
                setInspectedCreatorId(null);
              }}
              className={`rounded px-2.5 py-1 text-xs font-semibold transition-colors ${
                activeRole === "creator"
                  ? "shadow-xs bg-accent text-on-accent"
                  : "text-muted hover:text-fg"
              }`}
            >
              🎨 Creator Studio
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveRole("manager");
                setInspectedCreatorId(null);
              }}
              className={`rounded px-2.5 py-1 text-xs font-semibold transition-colors ${
                activeRole === "manager"
                  ? "shadow-xs bg-primary text-on-primary"
                  : "text-muted hover:text-fg"
              }`}
            >
              🏢 Manager Hub ({creators.length} Creators)
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 1. HOMEPAGE ROLE GATEWAY: CHOOSE WHAT PROFILE / PERSPECTIVE TO ENTER      */}
      {/* ========================================================================= */}
      {activeRole === "gateway" && (
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-12 sm:px-6">
          <div className="space-y-3 text-center">
            <Badge tone="accent">Workaora Multi-Profile Architecture</Badge>
            <h2 className="font-display text-3xl font-bold text-fg sm:text-4xl">
              Select Your Profile to Enter Workspace
            </h2>
            <p className="mx-auto max-w-xl text-sm text-muted sm:text-base">
              Workaora connects creative talent with managers and creator-led
              studios. Experience the product from each profile&apos;s distinct
              perspective:
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {/* PROFILE 1: THE CREATOR (PORTFOLIO OWNER) */}
            <Card
              edge="accent"
              className="flex cursor-pointer flex-col justify-between p-7 transition-all hover:border-line-strong"
              onClick={() => setActiveRole("creator")}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex size-12 items-center justify-center rounded-full bg-accent/10 text-xl font-bold text-accent">
                      🎨
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold">
                        1. Creator / Talent Profile
                      </h3>
                      <p className="text-xs text-muted">
                        Video Editors, Thumbnail Artists, Scriptwriters
                      </p>
                    </div>
                  </div>
                  <Badge tone="accent">Studio Mode</Badge>
                </div>

                <p className="text-sm leading-relaxed text-fg">
                  Enter your private Creator Studio. Manage your live portfolio,{" "}
                  <strong>add and edit video cuts</strong>, update retention
                  stats, adjust your transparent rate card, and track confirmed
                  collaborations.
                </p>

                <div className="rounded space-y-1 border border-line bg-sunken p-3 text-xs">
                  <strong className="block text-fg">
                    What you can test inside:
                  </strong>
                  <div className="text-muted">
                    &bull; Click &ldquo;+ Add New Work&rdquo; to publish cuts
                  </div>
                  <div className="text-muted">
                    &bull; Edit titles, 30s retention %, and rates
                  </div>
                  <div className="text-muted">
                    &bull; Live sync: Manager hub updates instantly!
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-line pt-4">
                <Button variant="primary" className="w-full justify-between">
                  <span>Enter Creator Studio (Manage Portfolio)</span>
                  <span>&rarr;</span>
                </Button>
              </div>
            </Card>

            {/* PROFILE 2: THE MANAGER / AGENCY (HIRER) */}
            <Card
              edge="accent"
              className="flex cursor-pointer flex-col justify-between p-7 transition-all hover:border-line-strong"
              onClick={() => setActiveRole("manager")}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-fg">
                      🏢
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold">
                        2. Manager / Agency Profile
                      </h3>
                      <p className="text-xs text-muted">
                        Talent Managers, Producers, Esports Orgs
                      </p>
                    </div>
                  </div>
                  <Badge tone="neutral">Recruiter Hub</Badge>
                </div>

                <p className="text-sm leading-relaxed text-fg">
                  Enter the Manager Hub. Discover{" "}
                  <strong>N number of creators</strong> and their latest live
                  updates, inspect their full separate portfolio pages, compare
                  rate cards, and shortlist candidates.
                </p>

                <div className="rounded space-y-1 border border-line bg-sunken p-3 text-xs">
                  <strong className="block text-fg">
                    What you can test inside:
                  </strong>
                  <div className="text-muted">
                    &bull; Browse all {creators.length} creators &amp; their
                    latest posts
                  </div>
                  <div className="text-muted">
                    &bull; Click any creator to open their separate profile page
                  </div>
                  <div className="text-muted">
                    &bull; Shortlist candidates &amp; request direct contact
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-line pt-4">
                <Button variant="secondary" className="w-full justify-between">
                  <span>Enter Manager Hub (Discover Creators)</span>
                  <span>&rarr;</span>
                </Button>
              </div>
            </Card>
          </div>
        </main>
      )}

      {/* ========================================================================= */}
      {/* 2. CREATOR DASHBOARD: MANAGE PORTFOLIO, ADD / EDIT WORK & RATES           */}
      {/* ========================================================================= */}
      {activeRole === "creator" && (
        <main className="mx-auto w-full max-w-6xl flex-1 space-y-8 px-4 py-8 sm:px-6">
          {/* Creator Header with Switcher */}
          <div className="flex flex-col justify-between gap-4 border-b border-line pb-6 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <Avatar name={myProfile.name} size="lg" />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-display text-2xl font-bold">
                    {myProfile.name}&apos;s Studio
                  </h2>
                  <Badge tone="accent">Creator Dashboard</Badge>
                </div>
                <p className="text-xs text-muted">
                  {myProfile.headline} &middot; {myProfile.location} &middot;{" "}
                  {myProfile.works.length} Portfolio Cuts
                </p>
                <div className="mt-1 flex items-center gap-2 text-xs">
                  <span className="text-muted">Active Rate:</span>
                  <strong className="text-fg">
                    {myProfile.rates.primaryRate}
                  </strong>
                  <span className="text-muted">
                    {myProfile.rates.primaryUnit}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setFormPrimaryRate(myProfile.rates.primaryRate);
                      setFormPrimaryUnit(myProfile.rates.primaryUnit);
                      setFormRetainer(myProfile.rates.retainerRate || "");
                      setFormSla(myProfile.rates.turnaround);
                      setRateCardModalOpen(true);
                    }}
                    className="ml-2 font-semibold text-accent underline hover:opacity-80"
                  >
                    Edit Rate Card
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary" onClick={handleOpenAddWork}>
                + Add New Portfolio Work
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setActiveRole("manager");
                  setInspectedCreatorId(myProfile.id);
                }}
              >
                Preview as Manager &rarr;
              </Button>
            </div>
          </div>

          {/* Live Studio Insights Banner */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded border border-line bg-surface p-4">
              <span className="text-xs text-muted">Total Portfolio Items</span>
              <p className="mt-1 font-display text-2xl font-bold text-fg">
                {myProfile.works.length}
              </p>
            </div>
            <div className="rounded border border-line bg-surface p-4">
              <span className="text-xs text-muted">Turnaround SLA</span>
              <p className="mt-1 font-display text-2xl font-bold text-fg">
                {myProfile.rates.turnaround}
              </p>
            </div>
            <div className="rounded border border-line bg-surface p-4">
              <span className="text-xs text-muted">Confirmed Collabs</span>
              <p className="mt-1 font-display text-2xl font-bold text-success">
                {myProfile.works.filter((w) => w.confirmedCollab).length}{" "}
                Verified
              </p>
            </div>
            <div className="rounded border border-line bg-surface p-4">
              <span className="text-xs text-muted">
                Last Update Broadcasted
              </span>
              <p className="mt-1 truncate text-xs font-semibold text-fg">
                {myProfile.latestUpdateNote}
              </p>
            </div>
          </div>

          {/* My Portfolio Cuts (Editable & Manageable) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-xl font-bold">
                  Manage Portfolio &amp; Work Samples
                </h3>
                <p className="text-xs text-muted">
                  Add new cuts, edit retention figures, or adjust thumbnails.
                  All updates sync to Managers immediately.
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {myProfile.works.map((item) => (
                <Card
                  key={item.id}
                  edge="accent"
                  className="flex flex-col justify-between overflow-hidden p-0"
                >
                  <div className="relative aspect-video w-full bg-sunken">
                    <img
                      src={item.thumbnailUrl}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="rounded absolute bottom-2 left-2 bg-fg/80 px-2 py-0.5 text-xs font-semibold text-bg backdrop-blur-xs">
                      {item.views}
                    </div>
                    {item.retention && (
                      <div className="rounded absolute top-2 right-2 bg-accent px-2 py-0.5 text-xs font-bold text-on-accent">
                        {item.retention}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 p-5">
                    <div className="flex items-center justify-between text-xs text-muted">
                      <span>{item.category}</span>
                      <span>SLA: {item.turnaround}</span>
                    </div>

                    <h4 className="font-display text-base font-bold text-fg">
                      {item.title}
                    </h4>
                    <p className="text-xs text-muted">Role: {item.role}</p>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {item.tools.map((t) => (
                        <Badge key={t} tone="neutral" className="text-xs">
                          {t}
                        </Badge>
                      ))}
                    </div>

                    {item.confirmedCollab && (
                      <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-success">
                        <CheckIcon className="size-4 shrink-0" />
                        <span>
                          Confirmed by {item.confirmedCollab.channelName}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Edit / Delete Controls */}
                  <div className="flex items-center justify-between border-t border-line bg-surface px-5 py-3 text-xs">
                    <span className="text-muted">Added {item.dateAdded}</span>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleOpenEditWork(item)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDeleteWork(item.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* ========================================================================= */}
      {/* 3. MANAGER HUB: DISCOVER N CREATORS, VIEW POSTS, GO TO SEPARATE PAGES     */}
      {/* ========================================================================= */}
      {activeRole === "manager" && (
        <main className="mx-auto w-full max-w-6xl flex-1 space-y-8 px-4 py-8 sm:px-6">
          {/* If inspecting an individual creator's separate page */}
          {inspectedCreator ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setInspectedCreatorId(null)}
                >
                  &larr; Back to Creators Feed
                </Button>
                <div className="text-xs text-muted">
                  Viewing Separate Creator Page:{" "}
                  <strong className="text-fg">{inspectedCreator.name}</strong>
                </div>
              </div>

              {/* Creator Overview Card */}
              <Card edge="accent" className="space-y-6 p-6 sm:p-8">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex items-start gap-4">
                    <Avatar name={inspectedCreator.name} size="lg" />
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="font-display text-2xl font-bold">
                          {inspectedCreator.name}
                        </h2>
                        <span className="font-mono text-xs text-muted">
                          {inspectedCreator.handle}
                        </span>
                        <Badge tone="accent">{inspectedCreator.category}</Badge>
                      </div>
                      <p className="font-semibold text-fg">
                        {inspectedCreator.headline}
                      </p>
                      <p className="text-xs text-muted">
                        {inspectedCreator.location} &middot; Languages:{" "}
                        {inspectedCreator.languages.join(", ")} &middot;{" "}
                        {inspectedCreator.experienceYears} Years Exp
                      </p>
                      <p className="max-w-xl pt-1 text-sm leading-relaxed text-fg">
                        {inspectedCreator.bio}
                      </p>
                    </div>
                  </div>

                  {/* Rate Card & Actions */}
                  <div className="shrink-0 space-y-3 rounded-md border border-line bg-sunken p-5 text-sm lg:w-80">
                    <div className="text-xs font-bold text-muted uppercase">
                      Verified Rate Card
                    </div>
                    <div>
                      <span className="text-xs text-muted">Primary Rate:</span>
                      <p className="font-display text-xl font-bold text-fg">
                        {inspectedCreator.rates.primaryRate}
                      </p>
                      <span className="text-xs text-muted">
                        {inspectedCreator.rates.primaryUnit}
                      </span>
                    </div>
                    {inspectedCreator.rates.retainerRate && (
                      <div className="border-t border-line/60 pt-2 text-xs">
                        <span className="text-muted">Retainer:</span>
                        <p className="font-bold text-fg">
                          {inspectedCreator.rates.retainerRate}
                        </p>
                      </div>
                    )}
                    <div className="border-t border-line/60 pt-2 text-xs text-muted">
                      Turnaround SLA:{" "}
                      <strong className="text-fg">
                        {inspectedCreator.rates.turnaround}
                      </strong>
                    </div>

                    <div className="flex flex-col gap-2 pt-2">
                      <Button
                        variant="primary"
                        className="w-full text-xs"
                        onClick={() => {
                          setContactTargetCreator(inspectedCreator);
                          setContactRequestedSuccess(false);
                          setContactModalOpen(true);
                        }}
                      >
                        Request Contact Details
                      </Button>
                      <Button
                        variant="secondary"
                        className="w-full text-xs"
                        onClick={() =>
                          handleToggleShortlist(inspectedCreator.id)
                        }
                      >
                        {shortlistedCreatorIds.includes(inspectedCreator.id)
                          ? "✓ Shortlisted"
                          : "+ Add to Candidate Shortlist"}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Creator's Full Portfolio Samples */}
              <div className="space-y-4">
                <h3 className="font-display text-xl font-bold">
                  {inspectedCreator.name}&apos;s Portfolio Cuts (
                  {inspectedCreator.works.length})
                </h3>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {inspectedCreator.works.map((w) => (
                    <Card
                      key={w.id}
                      edge="accent"
                      className="flex flex-col justify-between overflow-hidden p-0"
                    >
                      <div className="relative aspect-video w-full bg-sunken">
                        <img
                          src={w.thumbnailUrl}
                          alt={w.title}
                          className="h-full w-full object-cover"
                        />
                        <div className="rounded absolute bottom-2 left-2 bg-fg/80 px-2 py-0.5 text-xs font-semibold text-bg backdrop-blur-xs">
                          {w.views}
                        </div>
                        {w.retention && (
                          <div className="rounded absolute top-2 right-2 bg-accent px-2 py-0.5 text-xs font-bold text-on-accent">
                            {w.retention}
                          </div>
                        )}
                      </div>

                      <div className="space-y-2 p-5">
                        <div className="flex items-center justify-between text-xs text-muted">
                          <span>{w.category}</span>
                          <span>SLA: {w.turnaround}</span>
                        </div>
                        <h4 className="font-display text-base font-bold text-fg">
                          {w.title}
                        </h4>
                        <p className="text-xs text-muted">Role: {w.role}</p>

                        <div className="flex flex-wrap gap-1">
                          {w.tools.map((t) => (
                            <Badge key={t} tone="neutral" className="text-xs">
                              {t}
                            </Badge>
                          ))}
                        </div>

                        {w.confirmedCollab && (
                          <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-success">
                            <CheckIcon className="size-4 shrink-0" />
                            <span>
                              Confirmed by {w.confirmedCollab.channelName}
                            </span>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Manager Feed: All N Creators and Their Live Updates */
            <div className="space-y-6">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h2 className="font-display text-2xl font-bold sm:text-3xl">
                    Manager &amp; Agency Hub
                  </h2>
                  <p className="text-sm text-muted">
                    Discover {creators.length} verified creators, watch live
                    portfolio updates, and inspect their separate pages.
                  </p>
                </div>
                {shortlistedCreatorIds.length > 0 && (
                  <Badge tone="success" className="text-xs">
                    {shortlistedCreatorIds.length} Candidate(s) Shortlisted
                  </Badge>
                )}
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap items-center gap-2 border-y border-line py-3">
                <span className="text-xs font-semibold text-muted">
                  Filter Creator Role:
                </span>
                {[
                  "All",
                  "Video Editing",
                  "Thumbnail Design",
                  "Scriptwriting",
                  "Motion Graphics",
                ].map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setManagerFilter(filter)}
                    className={`rounded-md px-3 py-1 text-xs font-semibold transition-colors ${
                      managerFilter === filter
                        ? "bg-primary text-on-primary"
                        : "border border-line bg-surface text-fg hover:bg-sunken"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* Feed of Creators with Live Updates */}
              <div className="grid gap-6 md:grid-cols-2">
                {creators
                  .filter(
                    (c) =>
                      managerFilter === "All" || c.category === managerFilter,
                  )
                  .map((creator) => (
                    <Card
                      key={creator.id}
                      edge="accent"
                      className="flex cursor-pointer flex-col justify-between space-y-4 p-6 transition-all hover:border-line-strong"
                      onClick={() => {
                        setInspectedCreatorId(creator.id);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      <div className="space-y-3">
                        {/* Header */}
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar name={creator.name} size="md" />
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-display font-bold text-fg">
                                  {creator.name}
                                </span>
                                <CheckIcon className="size-3.5 text-success" />
                              </div>
                              <span className="text-xs text-muted">
                                {creator.handle} &middot; {creator.location}
                              </span>
                            </div>
                          </div>
                          <Badge tone="accent" className="text-xs">
                            {creator.category}
                          </Badge>
                        </div>

                        {/* Recent Broadcast / Update */}
                        <div className="rounded space-y-1 border border-line bg-sunken p-2.5 text-xs">
                          <div className="flex items-center justify-between text-muted">
                            <span>Latest Update:</span>
                            <span className="font-mono">
                              {creator.lastUpdated}
                            </span>
                          </div>
                          <p className="font-semibold text-fg italic">
                            &ldquo;{creator.latestUpdateNote}&rdquo;
                          </p>
                        </div>

                        {/* Rate and SLA */}
                        <div className="flex items-center justify-between border-y border-line py-2 text-xs">
                          <div>
                            <span className="text-muted">Primary Rate:</span>
                            <strong className="ml-1 text-fg">
                              {creator.rates.primaryRate}
                            </strong>
                          </div>
                          <div>
                            <span className="text-muted">SLA:</span>
                            <strong className="ml-1 text-fg">
                              {creator.rates.turnaround}
                            </strong>
                          </div>
                        </div>

                        {/* Recent Work Preview Thumbnails */}
                        <div>
                          <span className="text-xs font-semibold text-muted">
                            Recent Works ({creator.works.length}):
                          </span>
                          <div className="mt-1.5 grid grid-cols-2 gap-2">
                            {creator.works.slice(0, 2).map((w) => (
                              <div
                                key={w.id}
                                className="rounded relative aspect-video overflow-hidden bg-sunken"
                              >
                                <img
                                  src={w.thumbnailUrl}
                                  alt={w.title}
                                  className="h-full w-full object-cover"
                                />
                                <div className="rounded absolute bottom-1 left-1 bg-fg/80 px-1 py-0.5 text-[10px] text-bg">
                                  {w.views}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Action */}
                      <div className="flex items-center justify-between border-t border-line pt-3 text-xs">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleShortlist(creator.id);
                          }}
                          className={`font-semibold hover:underline ${
                            shortlistedCreatorIds.includes(creator.id)
                              ? "font-bold text-success"
                              : "text-muted"
                          }`}
                        >
                          {shortlistedCreatorIds.includes(creator.id)
                            ? "✓ Shortlisted"
                            : "+ Shortlist"}
                        </button>

                        <Button
                          size="sm"
                          variant="primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            setInspectedCreatorId(creator.id);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        >
                          Open Creator Page &rarr;
                        </Button>
                      </div>
                    </Card>
                  ))}
              </div>
            </div>
          )}
        </main>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD / EDIT WORK (IN CREATOR STUDIO)                                 */}
      {/* ========================================================================= */}
      <Dialog open={editWorkModalOpen} onOpenChange={setEditWorkModalOpen}>
        <DialogContent
          title={
            editingWorkId ? "Edit Portfolio Work" : "Add New Work to Portfolio"
          }
          description="Changes update in real-time and will be broadcasted to all Managers on Workaora."
          className="sm:max-w-lg"
        >
          <div className="space-y-4">
            <Field label="Work / Project Title">
              {(control) => (
                <Input
                  {...control}
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. 1M+ Views Pacing Edit: Rise of Esports"
                />
              )}
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Category">
                {(control) => (
                  <Select
                    {...control}
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                  >
                    <option value="Long-form YouTube">Long-form YouTube</option>
                    <option value="Finance Breakdown">Finance Breakdown</option>
                    <option value="Gaming / Esports">Gaming / Esports</option>
                    <option value="Thumbnail Design">Thumbnail Design</option>
                    <option value="Motion Graphics">Motion Graphics</option>
                  </Select>
                )}
              </Field>
              <Field label="Turnaround SLA">
                {(control) => (
                  <Input
                    {...control}
                    value={formTurnaround}
                    onChange={(e) => setFormTurnaround(e.target.value)}
                    placeholder="48 Hours"
                  />
                )}
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field label="View Count">
                {(control) => (
                  <Input
                    {...control}
                    value={formViews}
                    onChange={(e) => setFormViews(e.target.value)}
                    placeholder="1.4M views"
                  />
                )}
              </Field>
              <Field label="Retention Metric">
                {(control) => (
                  <Input
                    {...control}
                    value={formRetention}
                    onChange={(e) => setFormRetention(e.target.value)}
                    placeholder="64% 30s Retention"
                  />
                )}
              </Field>
            </div>

            <Field label="Thumbnail Image URL">
              {(control) => (
                <Input
                  {...control}
                  value={formThumbnail}
                  onChange={(e) => setFormThumbnail(e.target.value)}
                  placeholder="https://..."
                />
              )}
            </Field>

            <div className="flex justify-end gap-3 border-t border-line pt-4">
              <Button
                variant="secondary"
                onClick={() => setEditWorkModalOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSaveWork}>
                {editingWorkId ? "Save Changes" : "Publish to Portfolio"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* ========================================================================= */}
      {/* MODAL: EDIT RATE CARD (IN CREATOR STUDIO)                                 */}
      {/* ========================================================================= */}
      <Dialog open={rateCardModalOpen} onOpenChange={setRateCardModalOpen}>
        <DialogContent
          title="Edit Transparent Rate Card"
          description="Set your verified public rates. Managers see these rates directly when reviewing you."
          className="sm:max-w-md"
        >
          <div className="space-y-4">
            <Field label="Primary Rate (₹)">
              {(control) => (
                <Input
                  {...control}
                  value={formPrimaryRate}
                  onChange={(e) => setFormPrimaryRate(e.target.value)}
                  placeholder="₹3,500"
                />
              )}
            </Field>
            <Field label="Per Unit Structure">
              {(control) => (
                <Input
                  {...control}
                  value={formPrimaryUnit}
                  onChange={(e) => setFormPrimaryUnit(e.target.value)}
                  placeholder="per long-form video (8–15 min)"
                />
              )}
            </Field>
            <Field label="Monthly Retainer (optional)">
              {(control) => (
                <Input
                  {...control}
                  value={formRetainer}
                  onChange={(e) => setFormRetainer(e.target.value)}
                  placeholder="₹40,000 / month"
                />
              )}
            </Field>
            <Field label="Guaranteed Turnaround SLA">
              {(control) => (
                <Input
                  {...control}
                  value={formSla}
                  onChange={(e) => setFormSla(e.target.value)}
                  placeholder="48 hours"
                />
              )}
            </Field>

            <div className="flex justify-end gap-3 border-t border-line pt-4">
              <Button
                variant="secondary"
                onClick={() => setRateCardModalOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSaveRateCard}>
                Save Rate Card
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* ========================================================================= */}
      {/* MODAL: MANAGER REQUEST CONTACT (DPDP RULE D-009)                          */}
      {/* ========================================================================= */}
      <Dialog open={contactModalOpen} onOpenChange={setContactModalOpen}>
        <DialogContent
          title={
            contactRequestedSuccess
              ? "Contact Request Sent"
              : `Contact ${contactTargetCreator?.name}`
          }
          description={
            contactRequestedSuccess
              ? "Candidate has been notified and can release WhatsApp/Email directly to you."
              : "In accordance with India's DPDP Act, creator phone numbers are private until requested."
          }
          className="sm:max-w-md"
        >
          {contactTargetCreator && !contactRequestedSuccess ? (
            <div className="space-y-4">
              <div className="rounded border border-line bg-sunken p-3 text-xs">
                Candidate: <strong>{contactTargetCreator.name}</strong> (
                {contactTargetCreator.category})
                <p className="mt-0.5 text-muted">
                  Rate: {contactTargetCreator.rates.primaryRate}
                </p>
              </div>

              <p className="text-xs leading-relaxed text-muted">
                Workaora will notify {contactTargetCreator.name} to release
                their WhatsApp and Email for direct off-platform communication.
              </p>

              <div className="flex justify-end gap-3 border-t border-line pt-4">
                <Button
                  variant="secondary"
                  onClick={() => setContactModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    setContactRequestedSuccess(true);
                    toast.show({
                      title: "Contact request dispatched!",
                      description:
                        "Creator will grant access to their phone/email.",
                      tone: "success",
                    });
                  }}
                >
                  Send Request
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded space-y-1 border border-success bg-success-soft p-3 text-xs text-success">
                <strong>Request Dispatched Successfully!</strong>
                <p>Candidate notified via dashboard alert.</p>
              </div>
              <div className="flex justify-end border-t border-line pt-3">
                <Button
                  variant="primary"
                  onClick={() => setContactModalOpen(false)}
                >
                  Done
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

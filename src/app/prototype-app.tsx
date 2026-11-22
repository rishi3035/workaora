"use client";

import { useState } from "react";
import { Avatar } from "@/ui/avatar";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import { Dialog, DialogContent } from "@/ui/dialog";
import { Field, Input, Select } from "@/ui/field";
import { ToastProvider, useToast } from "@/ui/toast";
import { PrototypeCustomPage } from "./prototype-custom-page";
import { INITIAL_CREATORS, INITIAL_FEED_POSTS } from "./prototype-data";
import { PrototypeFeed } from "./prototype-feed";
import {
  CreatorCustomPageConfig,
  CreatorProfile,
  FeedPost,
  PortfolioItem,
  WorkspaceRole,
} from "./prototype-types";

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

  // Active Role/Profile Mode: "gateway" (Home Switcher), "feed" (Social Feed), "creator" (Studio), "custom-page" (Personal Page), "manager" (Talent Discovery)
  const [activeRole, setActiveRole] = useState<WorkspaceRole>("gateway");

  // In-Memory Shared State
  const [creators, setCreators] = useState<CreatorProfile[]>(INITIAL_CREATORS);
  const [feedPosts, setFeedPosts] = useState<FeedPost[]>(INITIAL_FEED_POSTS);

  // In Creator Mode: which creator is logged in (default to Aman Sharma)
  const [myCreatorId, setMyCreatorId] = useState<string>("creator-1");
  const myProfile: CreatorProfile =
    creators.find((c) => c.id === myCreatorId) ?? DEFAULT_CREATOR;

  // Currently inspected creator for Custom Page or Details dialog
  const [inspectedCreatorId, setInspectedCreatorId] = useState<string | null>(
    null,
  );
  const activeCustomPageCreator: CreatorProfile =
    creators.find((c) => c.id === (inspectedCreatorId || myCreatorId)) ??
    DEFAULT_CREATOR;

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

  // =========================================================================
  // SOCIAL FEED HANDLERS
  // =========================================================================
  const handleToggleFeedLike = (postId: string) => {
    setFeedPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;
        const willLike = !post.isLikedByUser;
        return {
          ...post,
          isLikedByUser: willLike,
          likesCount: willLike ? post.likesCount + 1 : post.likesCount - 1,
        };
      }),
    );
  };

  const handleAddFeedComment = (postId: string, commentText: string) => {
    const newComment = {
      id: `c-${Date.now()}`,
      authorName: myProfile.name,
      authorHandle: myProfile.handle,
      authorAvatar: myProfile.avatar,
      authorRole: myProfile.headline.slice(0, 24),
      content: commentText,
      timestamp: "Just now",
    };

    setFeedPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;
        return {
          ...post,
          comments: [...post.comments, newComment],
        };
      }),
    );

    toast.show({
      title: "Comment posted to community feed!",
      description: "Visible to creators and hiring managers.",
      tone: "success",
    });
  };

  const handleCreateFeedPost = (newPostData: {
    caption: string;
    mediaUrl: string;
    category: string;
    clientCollab?: string;
    metricsLabel?: string;
  }) => {
    const newFeedPost: FeedPost = {
      id: `post-${Date.now()}`,
      creatorId: myProfile.id,
      creatorName: myProfile.name,
      creatorHandle: myProfile.handle,
      creatorAvatar: myProfile.avatar,
      creatorCategory: myProfile.category,
      timestamp: "Just now",
      caption: newPostData.caption,
      mediaType: newPostData.category.includes("Thumb") ? "thumbnail" : "video",
      mediaUrl: newPostData.mediaUrl,
      mediaAspectRatio: "16:9",
      metricsBadge: newPostData.metricsLabel
        ? { label: newPostData.metricsLabel, iconType: "trending" }
        : undefined,
      clientCollab: newPostData.clientCollab,
      likesCount: 1,
      isLikedByUser: true,
      viewsCount: 12,
      comments: [],
      tags: [
        "#WorkDrop",
        "#Workaora",
        `#${myProfile.category.replace(" ", "")}`,
      ],
    };

    setFeedPosts((prev) => [newFeedPost, ...prev]);
    toast.show({
      title: "Work Drop published to feed!",
      description: "Your project is now in the community discovery stream.",
      tone: "success",
    });
  };

  // Open Creator's Custom Page from Feed or Manager Hub
  const handleOpenCustomPageForCreator = (creatorId: string) => {
    setInspectedCreatorId(creatorId);
    setActiveRole("custom-page");
  };

  // Update Page Customization Config for a Creator
  const handleUpdatePageConfig = (newConfig: CreatorCustomPageConfig) => {
    setCreators((prev) =>
      prev.map((c) =>
        c.id === (inspectedCreatorId || myCreatorId)
          ? { ...c, pageConfig: newConfig }
          : c,
      ),
    );
    toast.show({
      title: "Page styling updated!",
      description: `Template: ${newConfig.template} & Layout: ${newConfig.layoutMode}`,
      tone: "success",
    });
  };

  // Open Contact Request Modal
  const handleInitiateContact = (creator: CreatorProfile) => {
    setContactTargetCreator(creator);
    setContactRequestedSuccess(false);
    setContactModalOpen(true);
  };

  // =========================================================================
  // CREATOR STUDIO HANDLERS
  // =========================================================================
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
        "Changes are live and immediately visible across the platform.",
      tone: "success",
    });
  };

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
                : activeRole === "feed"
                  ? "Social Discovery Feed"
                  : activeRole === "creator"
                    ? "Creator Studio (Portfolio & Work Owner)"
                    : activeRole === "custom-page"
                      ? `Custom Page (@${activeCustomPageCreator.pageConfig.customSlug})`
                      : "Manager Hub (Talent Discovery & Hiring)"}
            </span>
          </div>

          {/* Quick Role Switcher Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 rounded-md border border-line bg-sunken p-1">
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
              🏠 Gateway
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveRole("feed");
                setInspectedCreatorId(null);
              }}
              className={`rounded px-2.5 py-1 text-xs font-semibold transition-colors ${
                activeRole === "feed"
                  ? "shadow-xs text-accent-fg bg-accent"
                  : "text-muted hover:text-fg"
              }`}
            >
              ⚡ Social Feed
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveRole("creator");
                setInspectedCreatorId(null);
              }}
              className={`rounded px-2.5 py-1 text-xs font-semibold transition-colors ${
                activeRole === "creator"
                  ? "shadow-xs text-accent-fg bg-accent"
                  : "text-muted hover:text-fg"
              }`}
            >
              🎨 Creator Studio
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveRole("custom-page");
                setInspectedCreatorId(myCreatorId);
              }}
              className={`rounded px-2.5 py-1 text-xs font-semibold transition-colors ${
                activeRole === "custom-page"
                  ? "shadow-xs bg-surface-elevated border border-line text-fg"
                  : "text-muted hover:text-fg"
              }`}
            >
              🌐 Custom Page
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
              🏢 Manager Hub ({creators.length})
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 1. HOMEPAGE ROLE GATEWAY                                                  */}
      {/* ========================================================================= */}
      {activeRole === "gateway" && (
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-12 sm:px-6">
          <div className="space-y-3 text-center">
            <Badge tone="accent">Workaora Multi-Profile Architecture</Badge>
            <h2 className="font-display text-3xl font-bold text-fg sm:text-4xl">
              Select Your Profile to Enter Workspace
            </h2>
            <p className="mx-auto max-w-xl text-sm text-muted sm:text-base">
              Workaora connects creative talent, managers, and creator-led
              studios. Experience the product from each distinct perspective:
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {/* CARD 1: SOCIAL DISCOVERY FEED */}
            <Card
              edge="accent"
              className="hover:shadow-lg flex cursor-pointer flex-col justify-between p-7 transition-all hover:border-line-strong"
              onClick={() => setActiveRole("feed")}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl flex size-12 items-center justify-center bg-accent/15 text-2xl font-bold text-accent">
                      ⚡
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold">
                        1. Social Discovery Feed
                      </h3>
                      <p className="text-xs text-muted">
                        Instagram/LinkedIn-style Creator Community
                      </p>
                    </div>
                  </div>
                  <Badge tone="accent">Discovery</Badge>
                </div>

                <p className="text-xs leading-relaxed text-muted">
                  Discover what India&apos;s top video editors, thumbnail
                  designers, and esports creators are dropping today. Features
                  likes, view telemetry, and interactive threaded comments.
                </p>

                <div className="rounded-lg border border-line bg-sunken p-3 text-xs text-muted">
                  <p className="font-semibold text-fg">Interactive Features:</p>
                  <ul className="mt-1 list-inside list-disc space-y-0.5 text-[11px]">
                    <li>Real-time work drops with retention proof tags</li>
                    <li>One-click likes &amp; impression view counters</li>
                    <li>Interactive comment threads &amp; peer inquiries</li>
                    <li>
                      Direct &quot;⚡ Hire Creator&quot; conversion action
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                <span className="text-xs font-semibold text-accent">
                  Explore Community Feed &rarr;
                </span>
                <span className="text-[11px] text-muted">
                  {feedPosts.length} Live Drops
                </span>
              </div>
            </Card>

            {/* CARD 2: CUSTOM CREATOR PAGE BUILDER */}
            <Card
              edge="none"
              className="hover:shadow-lg flex cursor-pointer flex-col justify-between p-7 transition-all hover:border-line-strong"
              onClick={() => {
                setInspectedCreatorId("creator-1");
                setActiveRole("custom-page");
              }}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-emerald-500/15 text-emerald-400 flex size-12 items-center justify-center text-2xl font-bold">
                      🌐
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold">
                        2. Custom Creator Page
                      </h3>
                      <p className="text-xs text-muted">
                        Bespoke Homepage &amp; Zero-Config Hosting
                      </p>
                    </div>
                  </div>
                  <Badge tone="success">Platform-Managed</Badge>
                </div>

                <p className="text-xs leading-relaxed text-muted">
                  Give every creator their own customizable personal homepage
                  (e.g., <code>workaora.com/@amansharma</code>). Choose from
                  curated themes (Cyberpunk, Minimalist, Vibrant, Hyper-Dark)
                  and layout modes.
                </p>

                <div className="rounded-lg border border-line bg-sunken p-3 text-xs text-muted">
                  <p className="font-semibold text-fg">
                    Platform-Managed Infra:
                  </p>
                  <ul className="mt-1 list-inside list-disc space-y-0.5 text-[11px]">
                    <li>Zero DNS or server setup required from creators</li>
                    <li>
                      India-edge CDN (Mumbai &amp; Delhi &lt;30ms latency)
                    </li>
                    <li>Auto-WebP/AVIF video and media transcoding</li>
                    <li>Pre-rendered OpenGraph cards for WhatsApp &amp; X</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                <span className="text-emerald-400 text-xs font-semibold">
                  Preview Live Custom Page &rarr;
                </span>
                <span className="text-[11px] text-muted">4 Theme Presets</span>
              </div>
            </Card>

            {/* CARD 3: THE CREATOR (STUDIO MODE) */}
            <Card
              edge="none"
              className="hover:shadow-lg flex cursor-pointer flex-col justify-between p-7 transition-all hover:border-line-strong"
              onClick={() => setActiveRole("creator")}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-purple-500/15 text-purple-400 flex size-12 items-center justify-center text-2xl font-bold">
                      🎨
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold">
                        3. Creator Studio
                      </h3>
                      <p className="text-xs text-muted">
                        Portfolio Manager, Rate Cards &amp; SLAs
                      </p>
                    </div>
                  </div>
                  <Badge tone="neutral">Studio</Badge>
                </div>

                <p className="text-xs leading-relaxed text-muted">
                  Manage your portfolio pieces, configure transparent rate cards
                  and turnaround SLAs, and monitor edge visits. Changes update
                  live across the platform.
                </p>

                <div className="rounded-lg border border-line bg-sunken p-3 text-xs text-muted">
                  <p className="font-semibold text-fg">Active Studio Data:</p>
                  <p className="mt-1 text-[11px]">
                    Editing as: <strong>{myProfile.name}</strong> (
                    {myProfile.works.length} items &middot;{" "}
                    {myProfile.rates.primaryRate})
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                <span className="text-xs font-semibold text-accent">
                  Enter Creator Studio &rarr;
                </span>
                <span className="text-[11px] text-muted">
                  Live Syncing Active
                </span>
              </div>
            </Card>

            {/* CARD 4: THE MANAGER (TALENT HUB) */}
            <Card
              edge="none"
              className="hover:shadow-lg flex cursor-pointer flex-col justify-between p-7 transition-all hover:border-line-strong"
              onClick={() => setActiveRole("manager")}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl flex size-12 items-center justify-center bg-primary/10 text-2xl font-bold text-primary">
                      🏢
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold">
                        4. Manager Hub
                      </h3>
                      <p className="text-xs text-muted">
                        Talent Discovery, Filters &amp; Direct Hiring
                      </p>
                    </div>
                  </div>
                  <Badge tone="neutral">Hiring Hub</Badge>
                </div>

                <p className="text-xs leading-relaxed text-muted">
                  Discover {creators.length} verified creators across Video
                  Editing, 3D Thumbnails, Motion Graphics, and Esports
                  Broadcasts. Review proof of work, shortlist, and request
                  contacts.
                </p>

                <div className="rounded-lg border border-line bg-sunken p-3 text-xs text-muted">
                  <p className="font-semibold text-fg">Manager Directives:</p>
                  <ul className="mt-1 list-inside list-disc space-y-0.5 text-[11px]">
                    <li>Browse creators by discipline &amp; metrics</li>
                    <li>Shortlist candidates into hiring pipelines</li>
                    <li>DPDP-compliant direct contact dispatch</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                <span className="text-xs font-semibold text-primary">
                  Browse {creators.length} Creators &rarr;
                </span>
                <span className="text-[11px] text-muted">
                  {shortlistedCreatorIds.length} Shortlisted
                </span>
              </div>
            </Card>
          </div>
        </main>
      )}

      {/* ========================================================================= */}
      {/* 2. SOCIAL DISCOVERY FEED VIEW                                             */}
      {/* ========================================================================= */}
      {activeRole === "feed" && (
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6">
          <PrototypeFeed
            posts={feedPosts}
            onToggleLike={handleToggleFeedLike}
            onAddComment={handleAddFeedComment}
            onOpenCreatorPage={handleOpenCustomPageForCreator}
            onQuickHire={(creatorId) => {
              const target = creators.find((c) => c.id === creatorId);
              if (target) handleInitiateContact(target);
            }}
            onCreatePost={handleCreateFeedPost}
          />
        </main>
      )}

      {/* ========================================================================= */}
      {/* 3. CUSTOM CREATOR PAGE VIEW                                               */}
      {/* ========================================================================= */}
      {activeRole === "custom-page" && (
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6">
          <PrototypeCustomPage
            creator={activeCustomPageCreator}
            isOwner={activeCustomPageCreator.id === myCreatorId}
            onUpdateConfig={handleUpdatePageConfig}
            onRequestContact={handleInitiateContact}
            onBackToDirectory={() => setActiveRole("manager")}
          />
        </main>
      )}

      {/* ========================================================================= */}
      {/* 4. CREATOR STUDIO VIEW                                                    */}
      {/* ========================================================================= */}
      {activeRole === "creator" && (
        <main className="mx-auto w-full max-w-5xl flex-1 space-y-6 px-4 py-8 sm:px-6">
          {/* Creator Profile Summary Bar */}
          <Card className="p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <Avatar name={myProfile.name} size="lg" />
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-display text-xl font-bold">
                      {myProfile.name}
                    </h2>
                    <span className="text-xs text-muted">
                      {myProfile.handle}
                    </span>
                    <Badge tone="accent">Creator Studio</Badge>
                  </div>
                  <p className="mt-0.5 text-xs text-muted">
                    {myProfile.headline}
                  </p>
                  <p className="mt-1 text-[11px] text-muted">
                    📍 {myProfile.location} &middot; ⏱️{" "}
                    {myProfile.rates.turnaround} SLA
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Switch Active Creator Persona */}
                <div className="flex items-center gap-1 rounded-md border border-line bg-sunken p-0.5 text-xs">
                  <span className="px-1 text-[10px] font-semibold text-muted uppercase">
                    Persona:
                  </span>
                  {creators.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        setMyCreatorId(c.id);
                        setFormPrimaryRate(c.rates.primaryRate);
                        setFormPrimaryUnit(c.rates.primaryUnit);
                        setFormRetainer(c.rates.retainerRate || "");
                        setFormSla(c.rates.turnaround);
                      }}
                      className={`rounded px-2 py-0.5 text-[11px] font-medium transition ${
                        myCreatorId === c.id
                          ? "text-accent-fg shadow-2xs bg-accent"
                          : "text-muted hover:text-fg"
                      }`}
                    >
                      {c.name.split(" ")[0]}
                    </button>
                  ))}
                </div>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setInspectedCreatorId(myCreatorId);
                    setActiveRole("custom-page");
                  }}
                >
                  🌐 View Live Custom Page
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setRateCardModalOpen(true)}
                >
                  Edit Rate Card
                </Button>
              </div>
            </div>

            {/* Platform-Managed Technical Setup Status Banner */}
            <div className="rounded-xl mt-6 border border-line bg-sunken/60 p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-emerald-500 flex h-2 w-2 animate-pulse rounded-full" />
                    <span className="text-xs font-bold text-fg">
                      Platform-Managed Infrastructure &amp; Edge CDN
                    </span>
                    <Badge tone="success">100% Zero-Config</Badge>
                  </div>
                  <p className="mt-1 text-[11px] text-muted">
                    The platform abstracts all hosting, CDN transcoding, and SSL
                    behind the scenes. No DevOps required.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <code className="rounded border border-line bg-surface px-2.5 py-1 font-mono text-[11px]">
                    workaora.com/@{myProfile.pageConfig.customSlug}
                  </code>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard?.writeText(
                        `https://workaora.com/@${myProfile.pageConfig.customSlug}`,
                      );
                      toast.show({
                        title: "Custom link copied!",
                        description: `https://workaora.com/@${myProfile.pageConfig.customSlug}`,
                        tone: "success",
                      });
                    }}
                  >
                    Copy Link
                  </Button>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 border-t border-line/60 pt-3 text-[11px] text-muted sm:grid-cols-4">
                <div>
                  <span className="text-[10px] text-muted uppercase">
                    Edge CDN:
                  </span>
                  <p className="font-semibold text-fg">Active (Mumbai bom1)</p>
                </div>
                <div>
                  <span className="text-[10px] text-muted uppercase">
                    Edge Latency:
                  </span>
                  <p className="text-emerald-500 font-semibold">&lt;28ms</p>
                </div>
                <div>
                  <span className="text-[10px] text-muted uppercase">
                    SSL Certificate:
                  </span>
                  <p className="font-semibold text-fg">TLS 1.3 Active</p>
                </div>
                <div>
                  <span className="text-[10px] text-muted uppercase">
                    Analytics (DPDP):
                  </span>
                  <p className="font-semibold text-fg">
                    342 visits &middot; 48 hirers
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Portfolio Items Management Section */}
          <Card className="p-6">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div>
                <h3 className="font-display text-base font-bold">
                  My Portfolio Work Items ({myProfile.works.length})
                </h3>
                <p className="text-xs text-muted">
                  These verified pieces appear across the community feed, your
                  custom homepage, and manager searches.
                </p>
              </div>
              <Button variant="primary" size="sm" onClick={handleOpenAddWork}>
                + Add Work Item
              </Button>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {myProfile.works.map((work) => (
                <div
                  key={work.id}
                  className="rounded-xl overflow-hidden border border-line bg-surface transition hover:border-line-strong"
                >
                  <div className="bg-black aspect-video w-full overflow-hidden">
                    <img
                      src={work.thumbnailUrl}
                      alt={work.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="space-y-2 p-4">
                    <div className="flex items-center justify-between">
                      <span className="rounded bg-accent/15 px-2 py-0.5 text-[10px] font-semibold text-accent">
                        {work.category}
                      </span>
                      <span className="font-mono text-[10px] text-muted">
                        {work.turnaround}
                      </span>
                    </div>
                    <h4 className="line-clamp-2 text-xs leading-snug font-bold">
                      {work.title}
                    </h4>
                    <div className="flex items-center gap-2 text-[11px] text-muted">
                      <span className="text-emerald-500 font-semibold">
                        {work.retention}
                      </span>
                      <span>&middot;</span>
                      <span>{work.views}</span>
                    </div>

                    <div className="mt-2 flex items-center justify-end gap-2 border-t border-line/60 pt-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleOpenEditWork(work)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteWork(work.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </main>
      )}

      {/* ========================================================================= */}
      {/* 5. MANAGER HUB VIEW                                                       */}
      {/* ========================================================================= */}
      {activeRole === "manager" && (
        <main className="mx-auto w-full max-w-5xl flex-1 space-y-6 px-4 py-8 sm:px-6">
          <div className="rounded-xl flex flex-col gap-4 border border-line bg-surface p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-lg font-bold">
                  Manager Talent Directory
                </h2>
                <Badge tone="neutral">
                  {creators.length} Verified Candidates
                </Badge>
              </div>
              <p className="mt-1 text-xs text-muted">
                Review verified retention rates, turnaround SLAs, and open
                bespoke creator portfolios.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                "All",
                "Video Editing",
                "Thumbnail Design",
                "Esports",
                "Motion Graphics",
              ].map((role) => (
                <button
                  key={role}
                  onClick={() => setManagerFilter(role)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                    managerFilter === role
                      ? "bg-primary text-on-primary"
                      : "bg-surface-elevated text-muted hover:text-fg"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* Creators Grid */}
          <div className="grid gap-6 sm:grid-cols-2">
            {creators
              .filter(
                (c) => managerFilter === "All" || c.category === managerFilter,
              )
              .map((creator) => {
                const isShortlisted = shortlistedCreatorIds.includes(
                  creator.id,
                );

                return (
                  <Card
                    key={creator.id}
                    className="flex flex-col justify-between p-6"
                  >
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar name={creator.name} size="md" />
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-display text-base font-bold">
                                {creator.name}
                              </h3>
                              <span className="text-xs text-muted">
                                {creator.handle}
                              </span>
                            </div>
                            <p className="text-xs text-muted">
                              {creator.category}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => handleToggleShortlist(creator.id)}
                          className={`rounded px-2.5 py-1 text-xs font-semibold transition ${
                            isShortlisted
                              ? "border border-success/40 bg-success-soft text-success"
                              : "bg-surface-elevated border border-line text-muted hover:text-fg"
                          }`}
                        >
                          {isShortlisted ? "✓ Shortlisted" : "+ Shortlist"}
                        </button>
                      </div>

                      <p className="text-xs leading-relaxed text-fg">
                        {creator.headline}
                      </p>

                      <div className="rounded-lg space-y-1 border border-line bg-sunken p-3 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-muted">Rate:</span>
                          <span className="font-semibold text-fg">
                            {creator.rates.primaryRate}{" "}
                            <span className="font-normal text-muted">
                              ({creator.rates.primaryUnit.slice(0, 16)}...)
                            </span>
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted">Turnaround SLA:</span>
                          <span className="font-semibold text-fg">
                            {creator.rates.turnaround}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted">Portfolio Items:</span>
                          <span className="font-semibold text-fg">
                            {creator.works.length} verified pieces
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-end gap-2 border-t border-line pt-4">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() =>
                          handleOpenCustomPageForCreator(creator.id)
                        }
                      >
                        🌐 View Custom Page
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleInitiateContact(creator)}
                      >
                        ⚡ Contact Candidate
                      </Button>
                    </div>
                  </Card>
                );
              })}
          </div>
        </main>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD / EDIT PORTFOLIO ITEM                                          */}
      {/* ========================================================================= */}
      <Dialog open={editWorkModalOpen} onOpenChange={setEditWorkModalOpen}>
        <DialogContent
          title={
            editingWorkId ? "Edit Portfolio Item" : "Add Work Item to Portfolio"
          }
          description="Highlight your client collaboration, retention proof, and turnaround SLA."
          className="sm:max-w-md"
        >
          <div className="space-y-4">
            <Field label="Work Title">
              {(control) => (
                <Input
                  {...control}
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. 1.4M View Esports Documentary Cut"
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
                    <option value="Shorts / Reels">Shorts / Reels</option>
                    <option value="Thumbnail Design">Thumbnail Design</option>
                    <option value="3D Art & Motion">3D Art &amp; Motion</option>
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
              <Field label="Retention / CTR Metric">
                {(control) => (
                  <Input
                    {...control}
                    value={formRetention}
                    onChange={(e) => setFormRetention(e.target.value)}
                    placeholder="64% 30s Retention"
                  />
                )}
              </Field>
              <Field label="Views Metric">
                {(control) => (
                  <Input
                    {...control}
                    value={formViews}
                    onChange={(e) => setFormViews(e.target.value)}
                    placeholder="1.4M views"
                  />
                )}
              </Field>
            </div>

            <Field label="Preview Image URL">
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
                Save Work
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* ========================================================================= */}
      {/* MODAL: EDIT RATE CARD                                                     */}
      {/* ========================================================================= */}
      <Dialog open={rateCardModalOpen} onOpenChange={setRateCardModalOpen}>
        <DialogContent
          title="Configure Transparent Rate Card"
          description="Set your standard project rate, retainer pricing, and turnaround SLA."
          className="sm:max-w-md"
        >
          <div className="space-y-4">
            <Field label="Standard Project Rate">
              {(control) => (
                <Input
                  {...control}
                  value={formPrimaryRate}
                  onChange={(e) => setFormPrimaryRate(e.target.value)}
                  placeholder="₹3,500"
                />
              )}
            </Field>

            <Field label="Rate Unit / Deliverable">
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
              : "In accordance with India's DPDP Act, creator contact details are private until requested."
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
                their WhatsApp and Email for direct communication.
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

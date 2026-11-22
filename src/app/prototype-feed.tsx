"use client";

import { useState } from "react";
import { Avatar } from "@/ui/avatar";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import { Dialog, DialogContent } from "@/ui/dialog";
import { Field, Input, Select, Textarea } from "@/ui/field";
import { FeedPost } from "./prototype-types";

type PrototypeFeedProps = {
  posts: FeedPost[];
  onToggleLike: (postId: string) => void;
  onAddComment: (postId: string, commentText: string) => void;
  onOpenCreatorPage: (creatorId: string) => void;
  onQuickHire: (creatorId: string) => void;
  onCreatePost: (newPost: {
    caption: string;
    mediaUrl: string;
    category: string;
    clientCollab?: string;
    metricsLabel?: string;
  }) => void;
};

export function PrototypeFeed({
  posts,
  onToggleLike,
  onAddComment,
  onOpenCreatorPage,
  onQuickHire,
  onCreatePost,
}: PrototypeFeedProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [expandedComments, setExpandedComments] = useState<
    Record<string, boolean>
  >({});
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>(
    {},
  );
  const [publishModalOpen, setPublishModalOpen] = useState(false);

  // Publish Form State
  const [formCaption, setFormCaption] = useState("");
  const [formCategory, setFormCategory] = useState("Video & VFX");
  const [formMediaUrl, setFormMediaUrl] = useState(
    "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80",
  );
  const [formClientCollab, setFormClientCollab] = useState("");
  const [formMetricsLabel, setFormMetricsLabel] = useState(
    "65% 30s Retention • 1M+ Views",
  );

  const categories = [
    "All",
    "Video & VFX",
    "Thumbnails & Art",
    "Esports & Motion",
  ];

  const filteredPosts = posts.filter((post) => {
    if (activeCategory === "All") return true;
    if (
      activeCategory === "Video & VFX" &&
      post.creatorCategory === "Video Editing"
    )
      return true;
    if (
      activeCategory === "Thumbnails & Art" &&
      post.creatorCategory === "Thumbnail Design"
    )
      return true;
    if (
      activeCategory === "Esports & Motion" &&
      (post.creatorCategory === "Esports" ||
        post.creatorCategory === "Motion Graphics")
    )
      return true;
    return false;
  });

  const toggleComments = (postId: string) => {
    setExpandedComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleCommentSubmit = (postId: string) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;
    onAddComment(postId, text);
    setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
    // Ensure comments drawer is open
    setExpandedComments((prev) => ({ ...prev, [postId]: true }));
  };

  const handleCreatePostSubmit = () => {
    if (!formCaption.trim()) return;
    onCreatePost({
      caption: formCaption,
      mediaUrl: formMediaUrl,
      category: formCategory,
      clientCollab: formClientCollab.trim() || undefined,
      metricsLabel: formMetricsLabel.trim() || undefined,
    });
    setFormCaption("");
    setPublishModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Feed Header & Banner */}
      <div className="rounded-xl shadow-sm border border-line bg-surface p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20 text-xs text-accent">
                ⚡
              </span>
              <h2 className="font-display text-lg font-bold text-fg">
                Creator Community Discovery Feed
              </h2>
              <Badge tone="accent">Live Drops</Badge>
            </div>
            <p className="mt-1 text-xs text-muted">
              Discover real-time work drops, video edits, 3D thumbnails, and
              esports highlights. Connect, comment, and hire directly from proof
              of work.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => setPublishModalOpen(true)}
            >
              + Share Work Drop
            </Button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-line/60 pt-3">
          <span className="text-[11px] font-medium text-muted uppercase">
            Filter:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                activeCategory === cat
                  ? "text-accent-fg shadow-sm bg-accent"
                  : "bg-surface-elevated text-muted hover:text-fg"
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="ml-auto text-[11px] text-muted">
            Showing {filteredPosts.length} of {posts.length} drops
          </span>
        </div>
      </div>

      {/* Feed Posts Stream */}
      <div className="mx-auto max-w-3xl space-y-6">
        {filteredPosts.map((post) => {
          const isCommentsOpen = !!expandedComments[post.id];
          const currentCommentText = commentInputs[post.id] || "";

          return (
            <Card
              key={post.id}
              className="overflow-hidden border-line transition hover:border-line-strong"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-line/60 bg-surface px-4 py-3">
                <div className="flex items-center gap-3">
                  <Avatar name={post.creatorName} size="md" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-fg">
                        {post.creatorName}
                      </span>
                      <span className="text-xs text-muted">
                        {post.creatorHandle}
                      </span>
                      <span className="text-[10px] text-muted">&middot;</span>
                      <span className="text-xs text-muted">
                        {post.timestamp}
                      </span>
                    </div>
                    <div className="mt-0.5 flex items-center gap-1.5">
                      <Badge tone="neutral">{post.creatorCategory}</Badge>
                      {post.clientCollab && (
                        <span className="rounded bg-success-soft px-1.5 py-0.5 text-[10px] font-medium text-success">
                          ✓ Collab: {post.clientCollab}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onOpenCreatorPage(post.creatorId)}
                    title="View bespoke custom creator portfolio"
                  >
                    View Page
                  </Button>
                </div>
              </div>

              {/* Card Body & Caption */}
              <div className="px-4 py-3">
                <p className="text-xs leading-relaxed whitespace-pre-line text-fg">
                  {post.caption}
                </p>
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="cursor-pointer text-[11px] font-medium text-accent hover:underline"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Media Container with Proof Badge */}
              <div className="bg-black/90 relative border-y border-line/60">
                <div className="group relative flex aspect-video w-full items-center justify-center overflow-hidden">
                  <img
                    src={post.mediaUrl}
                    alt={post.caption.slice(0, 40)}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                  />
                  {/* Subtle video / view indicator overlay */}
                  <div className="from-black/60 pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />

                  {post.mediaType === "video" && (
                    <div className="bg-black/70 text-white shadow-lg absolute flex h-12 w-12 items-center justify-center rounded-full backdrop-blur-sm transition group-hover:scale-110">
                      <svg
                        className="ml-0.5 h-5 w-5 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  )}

                  {/* Proof Badge overlay */}
                  {post.metricsBadge && (
                    <div className="bg-black/80 text-emerald-300 border-emerald-500/30 absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium backdrop-blur-md">
                      <span>⚡</span>
                      <span>{post.metricsBadge.label}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Engagement & Action Bar */}
              <div className="flex items-center justify-between bg-surface px-4 py-2.5">
                <div className="flex items-center gap-4">
                  {/* Like Button */}
                  <button
                    onClick={() => onToggleLike(post.id)}
                    className={`flex items-center gap-1.5 text-xs font-medium transition ${
                      post.isLikedByUser
                        ? "text-rose-500 font-semibold"
                        : "text-muted hover:text-fg"
                    }`}
                  >
                    <svg
                      className={`h-4 w-4 ${
                        post.isLikedByUser ? "fill-rose-500" : "fill-none"
                      } stroke-current`}
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    <span>{post.likesCount}</span>
                  </button>

                  {/* Impression Counter */}
                  <div className="flex items-center gap-1.5 text-xs text-muted">
                    <svg
                      className="h-4 w-4 fill-none stroke-current"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    <span>{post.viewsCount.toLocaleString()} views</span>
                  </div>

                  {/* Comments Trigger */}
                  <button
                    onClick={() => toggleComments(post.id)}
                    className="flex items-center gap-1.5 text-xs font-medium text-muted transition hover:text-fg"
                  >
                    <svg
                      className="h-4 w-4 fill-none stroke-current"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    <span>{post.comments.length} comments</span>
                  </button>
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onQuickHire(post.creatorId)}
                >
                  ⚡ Hire Creator
                </Button>
              </div>

              {/* Collapsible Threaded Comments Drawer */}
              {isCommentsOpen && (
                <div className="space-y-3 border-t border-line bg-sunken/40 px-4 py-3">
                  <div className="max-h-60 space-y-2.5 overflow-y-auto pr-1">
                    {post.comments.length === 0 ? (
                      <p className="py-1 text-xs text-muted italic">
                        No comments yet. Start the conversation below!
                      </p>
                    ) : (
                      post.comments.map((comment) => (
                        <div
                          key={comment.id}
                          className="flex items-start gap-2.5 text-xs"
                        >
                          <Avatar name={comment.authorName} size="sm" />
                          <div className="rounded-lg shadow-2xs flex-1 border border-line/60 bg-surface p-2.5">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1.5">
                                <span className="font-semibold text-fg">
                                  {comment.authorName}
                                </span>
                                <span className="text-[10px] text-muted">
                                  {comment.authorHandle}
                                </span>
                                <span className="rounded bg-surface-elevated py-0.2 px-1 text-[9px] text-muted">
                                  {comment.authorRole}
                                </span>
                              </div>
                              <span className="text-[10px] text-muted">
                                {comment.timestamp}
                              </span>
                            </div>
                            <p className="mt-1 leading-relaxed text-fg">
                              {comment.content}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Add a Comment Input Box */}
                  <div className="flex items-center gap-2 border-t border-line/60 pt-2.5">
                    <Input
                      value={currentCommentText}
                      onChange={(e) =>
                        setCommentInputs((prev) => ({
                          ...prev,
                          [post.id]: e.target.value,
                        }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleCommentSubmit(post.id);
                        }
                      }}
                      placeholder="Add a comment or inquiry for creator..."
                      className="text-xs"
                    />
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleCommentSubmit(post.id)}
                      disabled={!currentCommentText.trim()}
                    >
                      Post
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* MODAL: SHARE WORK DROP */}
      <Dialog open={publishModalOpen} onOpenChange={setPublishModalOpen}>
        <DialogContent
          title="Share a Work Drop to the Community Feed"
          description="Publish your latest edit, 3D artwork, or esports highlight to get discovered by peers and hiring managers."
          className="sm:max-w-lg"
        >
          <div className="space-y-4">
            <Field label="Caption / Project Breakdown">
              {(control) => (
                <Textarea
                  {...control}
                  value={formCaption}
                  onChange={(e) => setFormCaption(e.target.value)}
                  rows={3}
                  placeholder="Describe the challenge, key creative hooks, tools used, and what retention results you achieved..."
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
                    <option value="Video & VFX">Video &amp; VFX</option>
                    <option value="Thumbnails & Art">
                      Thumbnails &amp; Art
                    </option>
                    <option value="Esports & Motion">
                      Esports &amp; Motion
                    </option>
                  </Select>
                )}
              </Field>

              <Field label="Verified Client / Channel (optional)">
                {(control) => (
                  <Input
                    {...control}
                    value={formClientCollab}
                    onChange={(e) => setFormClientCollab(e.target.value)}
                    placeholder="e.g. S8UL, Techno Gamerz"
                  />
                )}
              </Field>
            </div>

            <Field label="Performance Badge / Verified Metric">
              {(control) => (
                <Input
                  {...control}
                  value={formMetricsLabel}
                  onChange={(e) => setFormMetricsLabel(e.target.value)}
                  placeholder="e.g. 64% 30s Retention • 1.4M Organic Views"
                />
              )}
            </Field>

            <Field label="Preview Media / Screenshot Image URL">
              {(control) => (
                <Input
                  {...control}
                  value={formMediaUrl}
                  onChange={(e) => setFormMediaUrl(e.target.value)}
                  placeholder="https://..."
                />
              )}
            </Field>

            <div className="flex justify-end gap-3 border-t border-line pt-4">
              <Button
                variant="secondary"
                onClick={() => setPublishModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleCreatePostSubmit}
                disabled={!formCaption.trim()}
              >
                Publish Drop
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

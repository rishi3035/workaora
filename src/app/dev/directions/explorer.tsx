"use client";

import { useState } from "react";

type DirectionId = "studio" | "arena" | "signal";
type Mode = "light" | "dark";

const DIRECTIONS: {
  id: DirectionId;
  letter: string;
  name: string;
  idea: string;
  firstMode: Mode;
  feels: string;
  strongFor: string;
  watchOut: string;
}[] = [
  {
    id: "studio",
    letter: "A",
    name: "Studio",
    idea: "An editorial portfolio. Warm paper, ink, and one strong colour.",
    firstMode: "light",
    feels:
      "Like a design magazine or a studio's own website. The work is the hero; the interface steps back.",
    strongFor:
      "Editors, designers, writers, photographers. Makes portfolios look crafted and serious.",
    watchOut:
      "The quietest of the three. Esports users may find it less energetic.",
  },
  {
    id: "arena",
    letter: "B",
    name: "Arena",
    idea: "Dark-first and sporty. Wide capitals, stat-style numbers, electric lime.",
    firstMode: "dark",
    feels:
      "Like a tournament broadcast or a scoreboard. Confident, fast, competitive.",
    strongFor:
      "Gamers, esports professionals, streamers, and younger creators. The most distinctive of the three.",
    watchOut:
      "Agencies and brands may read it as a gaming product first and a hiring product second.",
  },
  {
    id: "signal",
    letter: "C",
    name: "Signal",
    idea: "Calm and trustworthy. Deep indigo, soft cards, a marigold highlight.",
    firstMode: "light",
    feels:
      "Like a modern banking or careers product. Friendly, clear, safe to hand your details to.",
    strongFor:
      "Hirers, agencies, parents and guardians. Makes trust and safety features feel natural.",
    watchOut:
      "The closest to products people already know, so the least distinctive on first glance.",
  },
];

const TILES = [
  {
    format: "16:9 · Long-form edit",
    title: "Tech review, 14 minutes",
    tone: 1,
  },
  {
    format: "16:9 · Thumbnail set",
    title: "Gaming channel, 6 thumbnails",
    tone: 2,
  },
  { format: "9:16 · Short", title: "Podcast highlight", tone: 3 },
];

export function DirectionExplorer({
  fontVariables,
}: {
  fontVariables: string;
}) {
  const [directionId, setDirectionId] = useState<DirectionId>("studio");
  const [mode, setMode] = useState<Mode>("light");

  const direction =
    DIRECTIONS.find((item) => item.id === directionId) ?? DIRECTIONS[0];

  function chooseDirection(id: DirectionId) {
    const next = DIRECTIONS.find((item) => item.id === id);
    setDirectionId(id);
    if (next) {
      setMode(next.firstMode);
    }
  }

  return (
    <div className={`dx-page ${fontVariables}`}>
      <header className="dx-toolbar">
        <p className="dx-toolbar-note">
          <strong>Design preview.</strong>{" "}
          <span>
            Sample content only. Nothing on this page works or is saved.
          </span>
        </p>
        <div className="dx-toolbar-controls">
          <div role="group" aria-label="Direction" className="dx-switch">
            {DIRECTIONS.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={item.id === directionId}
                onClick={() => chooseDirection(item.id)}
              >
                {item.letter} · {item.name}
              </button>
            ))}
          </div>
          <div role="group" aria-label="Light or dark" className="dx-switch">
            {(["light", "dark"] as const).map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={item === mode}
                onClick={() => setMode(item)}
              >
                {item === "light" ? "Light" : "Dark"}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="dx" data-direction={directionId} data-mode={mode}>
        <div className="dx-inner">
          <section className="dx-intro" aria-label="About this direction">
            <p className="dx-label">Direction {direction?.letter}</p>
            <h1 className="dx-display dx-display-xl">{direction?.name}</h1>
            <p className="dx-lead">{direction?.idea}</p>
            <dl className="dx-facts">
              <div>
                <dt className="dx-label">Feels like</dt>
                <dd>{direction?.feels}</dd>
              </div>
              <div>
                <dt className="dx-label">Strongest for</dt>
                <dd>{direction?.strongFor}</dd>
              </div>
              <div>
                <dt className="dx-label">Watch out for</dt>
                <dd>{direction?.watchOut}</dd>
              </div>
            </dl>
          </section>

          <nav className="dx-nav" aria-label="Sample navigation">
            <span className="dx-wordmark">Workaora</span>
            <span className="dx-nav-links">
              <span aria-current="page">Feed</span>
              <span>Discover</span>
              <span>Opportunities</span>
            </span>
            <span className="dx-avatar dx-avatar-sm" aria-hidden="true">
              A
            </span>
          </nav>

          <div className="dx-columns">
            <section className="dx-card dx-profile" aria-label="Sample profile">
              <div className="dx-profile-top">
                <span className="dx-avatar" aria-hidden="true">
                  A
                </span>
                <div>
                  <h2 className="dx-display dx-display-lg">Ananya Sharma</h2>
                  <p className="dx-native-name" lang="hi">
                    अनन्या शर्मा
                  </p>
                </div>
              </div>
              <p className="dx-headline">
                Video editor and motion designer for tech and gaming channels
              </p>
              <p className="dx-meta">
                <span>Pune, Maharashtra</span>
                <span className="dx-status">Open to work</span>
              </p>
              <ul className="dx-chips" aria-label="Skills and languages">
                <li>Premiere Pro</li>
                <li>After Effects</li>
                <li>Long-form</li>
                <li>Hindi</li>
                <li>English</li>
                <li lang="ta">தமிழ்</li>
              </ul>
              <dl className="dx-stats">
                <div>
                  <dt className="dx-label">Starts at</dt>
                  <dd className="dx-number">₹2,500</dd>
                  <dd className="dx-unit">per video</dd>
                </div>
                <div>
                  <dt className="dx-label">Confirmed work</dt>
                  <dd className="dx-number">12</dd>
                  <dd className="dx-unit">collaborations</dd>
                </div>
              </dl>
              <div className="dx-actions">
                <button type="button" className="dx-btn dx-btn-primary">
                  Follow
                </button>
                <button type="button" className="dx-btn dx-btn-secondary">
                  Share profile
                </button>
              </div>
            </section>

            <div className="dx-stack">
              <section aria-label="Sample portfolio">
                <div className="dx-section-head">
                  <h2 className="dx-display dx-display-md">Portfolio</h2>
                  <span className="dx-link">View all 18</span>
                </div>
                <ul className="dx-tiles">
                  {TILES.map((tile) => (
                    <li key={tile.title} className="dx-tile">
                      <div
                        className="dx-tile-frame"
                        data-tone={tile.tone}
                        aria-hidden="true"
                      >
                        <span>{tile.format}</span>
                      </div>
                      <p className="dx-tile-title">{tile.title}</p>
                      {tile.tone === 1 ? (
                        <p className="dx-confirmed">
                          Collaboration confirmed by Sample Studio
                        </p>
                      ) : (
                        <p className="dx-tile-sub">Added 3 days ago</p>
                      )}
                    </li>
                  ))}
                </ul>
              </section>

              <section
                className="dx-card dx-job"
                aria-label="Sample opportunity"
              >
                <p className="dx-label">Opportunity · Freelance · Remote</p>
                <h2 className="dx-display dx-display-md">
                  Thumbnail designer for a gaming channel
                </h2>
                <p className="dx-meta">
                  <span>Sample Studio</span>
                  <span className="dx-verified">Verified organisation</span>
                </p>
                <p className="dx-pay">
                  <span className="dx-number">₹800–1,500</span>
                  <span className="dx-unit">per thumbnail</span>
                </p>
                <div className="dx-actions">
                  <button type="button" className="dx-btn dx-btn-primary">
                    Apply with portfolio
                  </button>
                  <button type="button" className="dx-btn dx-btn-ghost">
                    Save
                  </button>
                </div>
              </section>

              <section className="dx-card dx-form" aria-label="Sample form">
                <label className="dx-label" htmlFor="dx-sample-input">
                  Professional headline
                </label>
                <input
                  id="dx-sample-input"
                  className="dx-input"
                  type="text"
                  defaultValue="Video editor for gaming channels"
                />
                <p className="dx-help">
                  One line that says what you do. Shown under your name.
                </p>
                <p className="dx-error" role="note">
                  Example of an error message: keep it under 80 characters.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

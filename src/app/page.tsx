import { PrototypeApp } from "./prototype-app";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Top Banner asserting product development phase & authentic requirements */}
      <div className="border-b border-line bg-surface px-4 py-3 text-xs text-muted">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="font-display text-base font-bold text-fg">
              Workaora
            </h1>
            <span className="text-label text-muted uppercase">
              &middot; In development interactive prototype
            </span>
          </div>
          <span className="hidden text-xs text-muted sm:inline-block">
            Phase 1 Foundation &amp; PRD v2.0 Architecture
          </span>
        </div>
      </div>

      {/* Interactive Prototype Component */}
      <PrototypeApp />
    </div>
  );
}

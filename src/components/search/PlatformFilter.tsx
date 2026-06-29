import type { Platform } from "@/types";
import { PLATFORMS, getPlatformLabel } from "@/utils/dataHelpers";

const platformIcons: Record<Platform, string> = {
  instagram: "📸",
  youtube: "▶️",
  tiktok: "🎵",
};

interface PlatformFilterProps {
  selected: Platform;
  onChange: (platform: Platform) => void;
}

export function PlatformFilter({ selected, onChange }: PlatformFilterProps) {
  return (
    <div
      className="flex items-center gap-2 flex-wrap"
      role="group"
      aria-label="Filter by platform"
    >
      {PLATFORMS.map((p) => {
        const isSelected = selected === p;
        return (
          <button
            key={p}
            id={`platform-filter-${p}`}
            type="button"
            onClick={() => onChange(p)}
            aria-pressed={isSelected}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border ${
              isSelected
                ? "bg-violet-600 border-violet-500 text-white shadow-lg shadow-violet-500/25"
                : "bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20"
            }`}
          >
            <span role="img" aria-hidden="true">{platformIcons[p]}</span>
            {getPlatformLabel(p)}
          </button>
        );
      })}
    </div>
  );
}

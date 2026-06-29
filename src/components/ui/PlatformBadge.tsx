import type { Platform } from "@/types";

const platformColors: Record<Platform, string> = {
  instagram:
    "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
  youtube: "bg-red-500 text-white",
  tiktok: "bg-gray-900 text-white",
};

const platformIcons: Record<Platform, string> = {
  instagram: "📸",
  youtube: "▶️",
  tiktok: "🎵",
};

interface PlatformBadgeProps {
  platform: Platform;
  className?: string;
}

export function PlatformBadge({ platform, className = "" }: PlatformBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${platformColors[platform]} ${className}`}
    >
      <span>{platformIcons[platform]}</span>
      <span className="capitalize">{platform}</span>
    </span>
  );
}

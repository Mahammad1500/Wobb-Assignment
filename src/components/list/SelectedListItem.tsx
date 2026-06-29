import { memo, useCallback } from "react";
import { X, ExternalLink } from "lucide-react";
import type { UserProfileSummary } from "@/types";
import { useInfluencerStore } from "@/store/useInfluencerStore";
import { Avatar } from "@/components/ui/Avatar";
import { formatFollowers } from "@/utils/formatters";

interface SelectedListItemProps {
  profile: UserProfileSummary;
}

export const SelectedListItem = memo(function SelectedListItem({
  profile,
}: SelectedListItemProps) {
  const removeFromList = useInfluencerStore((s) => s.removeFromList);

  const handleRemove = useCallback(() => {
    removeFromList(profile.user_id);
  }, [removeFromList, profile.user_id]);

  return (
    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 group hover:border-white/20 transition-all">
      <Avatar
        src={profile.picture}
        alt={profile.fullname}
        size="sm"
        verified={profile.is_verified}
      />
      <div className="flex-1 min-w-0 text-left">
        <p className="text-white text-sm font-medium truncate">
          @{profile.username}
        </p>
        <p className="text-slate-400 text-xs truncate">
          {formatFollowers(profile.followers)} followers
        </p>
      </div>
      <div className="flex items-center gap-1 shrink-0">
        {profile.url && (
          <a
            href={profile.url}
            target="_blank"
            rel="noreferrer noopener"
            onClick={(e) => e.stopPropagation()}
            className="p-1 text-slate-500 hover:text-violet-400 transition-colors"
            aria-label={`View ${profile.username} on platform`}
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
        <button
          type="button"
          onClick={handleRemove}
          className="p-1 text-slate-500 hover:text-red-400 transition-colors"
          aria-label={`Remove ${profile.fullname} from list`}
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
});

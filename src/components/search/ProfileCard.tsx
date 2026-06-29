import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Check, Users } from "lucide-react";
import type { Platform, UserProfileSummary } from "@/types";
import { useInfluencerStore } from "@/store/useInfluencerStore";
import { Avatar } from "@/components/ui/Avatar";
import { formatFollowers, formatEngagementRate } from "@/utils/formatters";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
}

export const ProfileCard = memo(function ProfileCard({
  profile,
  platform,
}: ProfileCardProps) {
  const navigate = useNavigate();
  const addToList = useInfluencerStore((s) => s.addToList);
  const removeFromList = useInfluencerStore((s) => s.removeFromList);
  const isInList = useInfluencerStore((s) => s.isInList);
  const inList = isInList(profile.user_id);

  const handleCardClick = useCallback(() => {
    navigate(`/profile/${profile.username}?platform=${platform}`, {
      state: { profile },
    });
  }, [navigate, profile, platform]);

  const handleListToggle = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (inList) {
        removeFromList(profile.user_id);
      } else {
        addToList({ ...profile, platform });
      }
    },
    [inList, addToList, removeFromList, profile, platform]
  );

  return (
    <article
      onClick={handleCardClick}
      className="group relative flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl cursor-pointer hover:bg-white/[0.08] hover:border-white/20 transition-all duration-200 hover:shadow-xl hover:shadow-black/20"
      aria-label={`View profile of ${profile.fullname}`}
    >
      {/* Avatar */}
      <Avatar
        src={profile.picture}
        alt={profile.fullname}
        size="md"
        verified={profile.is_verified}
      />

      {/* Info */}
      <div className="flex-1 min-w-0 text-left">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-white font-semibold text-sm truncate">
            @{profile.username}
          </span>
        </div>
        <p className="text-slate-400 text-sm truncate">{profile.fullname}</p>

        {/* Stats row */}
        <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {formatFollowers(profile.followers)}
          </span>
          {profile.engagement_rate !== undefined && (
            <span className="text-emerald-400/80">
              {formatEngagementRate(profile.engagement_rate)} ER
            </span>
          )}
        </div>
      </div>

      {/* Add to list button */}
      <button
        id={`add-to-list-${profile.user_id}`}
        type="button"
        onClick={handleListToggle}
        aria-label={
          inList
            ? `Remove ${profile.fullname} from list`
            : `Add ${profile.fullname} to list`
        }
        className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
          inList
            ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 hover:bg-red-500/20 hover:border-red-500/40 hover:text-red-400"
            : "bg-violet-600/20 border border-violet-500/40 text-violet-300 hover:bg-violet-600 hover:text-white hover:border-violet-500"
        }`}
      >
        {inList ? (
          <>
            <Check className="w-3 h-3" />
            <span className="hidden sm:inline">Added</span>
          </>
        ) : (
          <>
            <Plus className="w-3 h-3" />
            <span className="hidden sm:inline">Add</span>
          </>
        )}
      </button>
    </article>
  );
});

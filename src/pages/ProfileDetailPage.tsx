import { useEffect, useState, useCallback } from "react";
import { Link, useParams, useSearchParams, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  ExternalLink,
  Users,
  TrendingUp,
  BarChart2,
  Heart,
  MessageCircle,
  Eye,
  Plus,
  Check,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Avatar } from "@/components/ui/Avatar";
import { StatCard } from "@/components/ui/StatCard";
import { PlatformBadge } from "@/components/ui/PlatformBadge";
import type {
  FullUserProfile,
  Platform,
  ProfileDetailResponse,
  UserProfileSummary,
} from "@/types";
import {
  formatFollowers,
  formatEngagementRate,
  formatCount,
} from "@/utils/formatters";
import { loadProfileByUsername } from "@/utils/profileLoader";
import { useInfluencerStore } from "@/store/useInfluencerStore";

type LoadState =
  | { status: "loading" }
  | { status: "loaded"; data: ProfileDetailResponse }
  | { status: "summary"; profile: UserProfileSummary }
  | { status: "error" };

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const platform = (searchParams.get("platform") || "instagram") as Platform;

  // Profile passed via navigation state from search results
  const stateProfile = (location.state as { profile?: UserProfileSummary } | null)
    ?.profile ?? null;

  const [loadState, setLoadState] = useState<LoadState>({ status: "loading" });

  const addToList = useInfluencerStore((s) => s.addToList);
  const removeFromList = useInfluencerStore((s) => s.removeFromList);
  const isInList = useInfluencerStore((s) => s.isInList);

  useEffect(() => {
    if (!username) return;
    let cancelled = false;
    loadProfileByUsername(username).then((data) => {
      if (cancelled) return;
      if (data) {
        setLoadState({ status: "loaded", data });
      } else if (stateProfile) {
        // Fallback: use the summary profile passed from search
        setLoadState({ status: "summary", profile: stateProfile });
      } else {
        setLoadState({ status: "error" });
      }
    });
    return () => {
      cancelled = true;
    };
    // stateProfile is stable (from location.state); excluding it from deps is intentional
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  // Derive the user object from whichever load state we're in
  const user: FullUserProfile | UserProfileSummary | null =
    loadState.status === "loaded"
      ? loadState.data.data.user_profile
      : loadState.status === "summary"
      ? loadState.profile
      : null;

  const inList = user ? isInList(user.user_id) : false;

  const handleListToggle = useCallback(() => {
    if (!user) return;
    if (inList) {
      removeFromList(user.user_id);
    } else {
      addToList({ ...user, platform });
    }
  }, [inList, addToList, removeFromList, user, platform]);

  if (!username) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <p className="text-red-400 text-lg font-semibold">Invalid profile</p>
          <Link
            to="/"
            className="flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to search
          </Link>
        </div>
      </Layout>
    );
  }

  if (loadState.status === "loading") {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="w-16 h-16 rounded-full border-4 border-violet-500/30 border-t-violet-500 animate-spin" />
          <p className="text-slate-400">Loading profile…</p>
        </div>
      </Layout>
    );
  }

  if (loadState.status === "error" || !user) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <p className="text-red-400 text-lg font-semibold">
            Could not load profile for @{username}
          </p>
          <Link
            to="/"
            className="flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to search
          </Link>
        </div>
      </Layout>
    );
  }

  const fullUser = user as FullUserProfile;

  return (
    <Layout>
      {/* Back link */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        Back to search
      </Link>

      {/* Profile hero card */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden mb-6">
        {/* Banner gradient */}
        <div className="h-28 sm:h-36 bg-gradient-to-br from-violet-900/60 via-purple-900/40 to-slate-900" />

        <div className="px-6 pb-6 -mt-12 sm:-mt-16">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            {/* Avatar + name */}
            <div className="flex items-end gap-4">
              <div className="ring-4 ring-slate-950 rounded-full">
                <Avatar
                  src={user.picture}
                  alt={user.fullname}
                  size="xl"
                  verified={user.is_verified}
                />
              </div>
              <div className="mb-1">
                <h1 className="text-white text-xl sm:text-2xl font-extrabold leading-tight">
                  {user.fullname}
                </h1>
                <p className="text-slate-400 text-sm mt-0.5">
                  @{user.username}
                </p>
                <div className="mt-2">
                  <PlatformBadge platform={platform} />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 sm:mb-1 flex-wrap">
              {user.url && (
                <a
                  href={user.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-all text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Profile
                </a>
              )}
              <button
                id="profile-add-to-list-btn"
                type="button"
                onClick={handleListToggle}
                aria-label={
                  inList
                    ? `Remove ${user.fullname} from list`
                    : `Add ${user.fullname} to list`
                }
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  inList
                    ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 hover:bg-red-500/20 hover:border-red-500/40 hover:text-red-400"
                    : "bg-violet-600 border border-violet-500 text-white hover:bg-violet-700 shadow-lg shadow-violet-500/25"
                }`}
              >
                {inList ? (
                  <>
                    <Check className="w-4 h-4" />
                    In My List
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Add to List
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Bio — only available in full profile */}
          {fullUser.description && (
            <p className="mt-5 text-slate-300 text-sm leading-relaxed max-w-2xl">
              {fullUser.description}
            </p>
          )}
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
        <StatCard
          label="Followers"
          value={formatFollowers(user.followers)}
          icon={<Users className="w-4 h-4 text-violet-400" />}
        />
        <StatCard
          label="Engagement Rate"
          value={formatEngagementRate(user.engagement_rate)}
          icon={<TrendingUp className="w-4 h-4 text-emerald-400" />}
        />
        {user.engagements !== undefined && (
          <StatCard
            label="Total Engagements"
            value={formatCount(user.engagements)}
            icon={<BarChart2 className="w-4 h-4 text-blue-400" />}
          />
        )}
        {fullUser.posts_count !== undefined && (
          <StatCard
            label="Posts"
            value={String(fullUser.posts_count)}
            icon={<BarChart2 className="w-4 h-4 text-slate-400" />}
          />
        )}
        {fullUser.avg_likes !== undefined && (
          <StatCard
            label="Avg Likes"
            value={formatCount(fullUser.avg_likes)}
            icon={<Heart className="w-4 h-4 text-pink-400" />}
          />
        )}
        {fullUser.avg_comments !== undefined && (
          <StatCard
            label="Avg Comments"
            value={formatCount(fullUser.avg_comments)}
            icon={<MessageCircle className="w-4 h-4 text-yellow-400" />}
          />
        )}
        {user.avg_views !== undefined && user.avg_views > 0 && (
          <StatCard
            label="Avg Views"
            value={formatCount(user.avg_views)}
            icon={<Eye className="w-4 h-4 text-cyan-400" />}
          />
        )}
      </div>
    </Layout>
  );
}

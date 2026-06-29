import { ListChecks, Trash2, Users } from "lucide-react";
import { useInfluencerStore } from "@/store/useInfluencerStore";
import { SelectedListItem } from "./SelectedListItem";

export function SelectedList() {
  const selectedList = useInfluencerStore((s) => s.selectedList);
  const clearList = useInfluencerStore((s) => s.clearList);

  return (
    <aside
      className="flex flex-col bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden sticky top-24 max-h-[calc(100vh-8rem)]"
      aria-label="Selected influencers list"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2">
          <ListChecks className="w-4 h-4 text-violet-400" />
          <span className="text-white font-semibold text-sm">My List</span>
          {selectedList.length > 0 && (
            <span className="bg-violet-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {selectedList.length}
            </span>
          )}
        </div>
        {selectedList.length > 0 && (
          <button
            type="button"
            onClick={clearList}
            className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
            aria-label="Clear all from list"
            title="Clear list"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 min-h-0">
        {selectedList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-slate-600" />
            </div>
            <div>
              <p className="text-slate-400 text-sm font-medium">
                No influencers yet
              </p>
              <p className="text-slate-600 text-xs mt-0.5">
                Click "Add" on any profile
              </p>
            </div>
          </div>
        ) : (
          selectedList.map((profile) => (
            <SelectedListItem key={profile.user_id} profile={profile} />
          ))
        )}
      </div>

      {/* Footer */}
      {selectedList.length > 0 && (
        <div className="p-3 border-t border-white/10 shrink-0">
          <p className="text-slate-500 text-xs text-center">
            {selectedList.length} influencer{selectedList.length !== 1 ? "s" : ""} selected · Saved to browser
          </p>
        </div>
      )}
    </aside>
  );
}

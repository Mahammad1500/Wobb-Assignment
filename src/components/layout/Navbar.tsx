import { Link } from "react-router-dom";
import { Sparkles, ListChecks } from "lucide-react";
import { useInfluencerStore } from "@/store/useInfluencerStore";

export function Navbar() {
  const selectedList = useInfluencerStore((s) => s.selectedList);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group"
          aria-label="Wobb Influencer Search — Home"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center shadow-lg shadow-violet-500/25">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-bold text-lg tracking-tight">
            Wobb<span className="text-violet-400">.</span>
          </span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="text-sm text-slate-400 hover:text-white transition-colors hidden sm:block"
          >
            Discover
          </Link>
          <div className="relative flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-slate-300">
            <ListChecks className="w-4 h-4 text-violet-400" />
            <span className="hidden sm:inline">My List</span>
            {selectedList.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[1.25rem] h-5 flex items-center justify-center rounded-full bg-violet-500 text-white text-xs font-bold px-1 shadow-lg shadow-violet-500/40">
                {selectedList.length}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

import { useState, useMemo, useCallback } from "react";
import type { Platform } from "@/types";
import { Layout } from "@/components/layout/Layout";
import { PlatformFilter } from "@/components/search/PlatformFilter";
import { ProfileList } from "@/components/search/ProfileList";
import { SearchBar } from "@/components/search/SearchBar";
import { SelectedList } from "@/components/list/SelectedList";
import { extractProfiles, filterProfiles } from "@/utils/dataHelpers";

export function SearchPage() {
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [searchQuery, setSearchQuery] = useState("");

  const allProfiles = useMemo(() => extractProfiles(platform), [platform]);
  const filteredProfiles = useMemo(
    () => filterProfiles(allProfiles, searchQuery),
    [allProfiles, searchQuery]
  );

  const handlePlatformChange = useCallback((p: Platform) => {
    setPlatform(p);
    setSearchQuery("");
  }, []);

  return (
    <Layout>
      {/* Hero section */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-3">
          Discover{" "}
          <span className="bg-gradient-to-r from-violet-400 to-purple-300 bg-clip-text text-transparent">
            Influencers
          </span>
        </h1>
        <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto">
          Find and curate top creators across Instagram, YouTube, and TikTok.
        </p>
      </div>

      {/* Two-column layout */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
        {/* Main content — takes remaining width, scrolls naturally */}
        <div className="flex-1 min-w-0 w-full">
          {/* Filters row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 flex-wrap">
            <PlatformFilter
              selected={platform}
              onChange={handlePlatformChange}
            />
            <div className="w-full sm:flex-1">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>
          </div>

          {/* Results count */}
          <p className="text-slate-400 text-sm mb-4">
            Showing{" "}
            <span className="text-white font-semibold">
              {filteredProfiles.length}
            </span>{" "}
            of{" "}
            <span className="text-white font-semibold">
              {allProfiles.length}
            </span>{" "}
            influencers
          </p>

          {/* Profile list — all results render, page scrolls */}
          <ProfileList
            profiles={filteredProfiles}
            platform={platform}
            searchQuery={searchQuery}
          />
        </div>

        {/* Sidebar — fixed width, sticky, scrolls independently */}
        <div className="w-full lg:w-72 xl:w-80 shrink-0">
          <SelectedList />
        </div>
      </div>
    </Layout>
  );
}

# Wobb Influencer Search

A modern influencer discovery platform built with React, TypeScript, Vite, and Tailwind CSS.

## Live Demo

🔗 **Live URL:** <!-- Add your Vercel URL here after deploying -->

> Deploy with `npm run build`. The `dist/` folder is production-ready for Vercel/Netlify.

---

## Getting Started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # Production build
npm run lint       # ESLint check
```

---

## What Changed

### Bugs Fixed
| Bug | Fix |
|-----|-----|
| `console.log` + pointless `clickCount` state in SearchPage | Removed entirely |
| Engagement rate formula using `* 10000` instead of `* 100` | Fixed to use `formatEngagementRate` consistently |
| Engagements stat card showed rate, not actual count | Now displays `formatCount(user.engagements)` |
| Case-sensitive username search | Both username and fullname now `.toLowerCase()` before matching |
| Hard-coded `w-[700px]` on ProfileCard | Replaced with responsive flex layout |
| `SearchBar.tsx` was dead code (never imported) | Removed; replaced with new accessible SearchBar in `search/` |
| No `alt` attribute on profile images | Added descriptive `alt` on all `<img>` tags |
| No `rel="noreferrer"` on external links | Added `rel="noreferrer noopener"` |
| `react-beautiful-dnd` installed but never used | Uninstalled |
| `Add to List` button was disabled/stubbed | Fully implemented with Zustand + localStorage |

### State Management
- **Replaced**: plain `useState` scattered across components
- **With**: [Zustand](https://github.com/pmndrs/zustand) store (`src/store/useInfluencerStore.ts`) with the `persist` middleware syncing to `localStorage`

### Architecture

```
src/
  components/
    ui/              # Reusable primitives: Avatar, StatCard, PlatformBadge
    layout/          # Layout, Navbar
    search/          # SearchBar, PlatformFilter, ProfileCard, ProfileList
    list/            # SelectedList, SelectedListItem
  pages/
    SearchPage.tsx
    ProfileDetailPage.tsx
  store/
    useInfluencerStore.ts   # Zustand store
  types/
    index.ts
  utils/
    dataHelpers.ts
    formatters.ts
    profileLoader.ts
```

### UI / UX Redesign
- **Dark mode** SaaS dashboard aesthetic (slate-950 base)
- **Inter** font via Google Fonts
- **Glassmorphism** cards (`bg-white/5 border border-white/10 rounded-2xl`)
- **Gradient** hero section with animated underline on hover
- **Sticky navbar** with live list badge counter
- **Two-column layout** — search results + selected list sidebar
- **Meaningful empty states** with icons
- **Animated spinner** loading state
- **Hover effects** on all interactive elements
- **Responsive** — mobile, tablet, desktop

### Performance Optimizations
- `ProfileCard` wrapped in `React.memo` — no re-renders unless props change
- `ProfileList` wrapped in `React.memo`
- `extractProfiles` and `filterProfiles` results memoized with `useMemo` in SearchPage
- Event handlers memoized with `useCallback` where passed as props
- `SearchPage` and `ProfileDetailPage` are **lazy loaded** with `React.lazy` + `Suspense`
- Profile data loading uses a cleanup flag (`cancelled = true`) to prevent state updates on unmounted components

### Add to List Feature
- Works from **both** the search card and the profile detail page
- **Deduplication** enforced in the Zustand store (`user_id` based)
- **Persists after refresh** via Zustand `persist` middleware → `localStorage`
- **Remove** individual profiles or **clear all** from the sidebar
- Platform is stored alongside the profile for display purposes

---

## Libraries Added

| Library | Purpose |
|---------|---------|
| `zustand` | Global state management with localStorage persistence |
| `lucide-react` | Consistent, lightweight icon system |
| `framer-motion` | (installed, available for future animations) |

## Libraries Removed

| Library | Reason |
|---------|--------|
| `react-beautiful-dnd` | Was installed but never used; adds ~50KB to bundle |

---

## Assumptions

- Profile JSON files in `src/assets/data/profiles/` are matched by username from the URL — the existing `profileLoader.ts` convention is preserved.
- The platform query param (`?platform=instagram`) passed from search to profile detail is used for display only; no cross-platform API calls are made.
- "Add to List" persists to `localStorage` keyed as `wobb-influencer-list`.

## Trade-offs

- **Large JSON data files** are bundled per-profile via Vite's dynamic import (`import.meta.glob`). For a real app, these would be served from an API.
- `framer-motion` is installed but not used for animations — it's available for the next iteration.
- No pagination — all profiles are rendered. For 10+ profiles a virtual list (`tanstack-virtual`) would improve performance.

## Remaining Improvements (Future)

- [ ] Add unit tests (Vitest + Testing Library)
- [ ] Add Framer Motion page transition animations
- [ ] Virtual list rendering for large datasets
- [ ] Export selected list as CSV
- [ ] Filter by follower count / engagement rate range
- [ ] Dark/light mode toggle

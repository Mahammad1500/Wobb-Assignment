import type { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: string;
  icon?: ReactNode;
}

export function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-2">
      {icon && <div className="w-fit">{icon}</div>}
      <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">
        {label}
      </div>
      <div className="text-lg font-bold text-white">{value}</div>
    </div>
  );
}

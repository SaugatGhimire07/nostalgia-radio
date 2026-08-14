"use client";

import { useEffect, useState } from "react";

const BASE = 1284;

export function ListenerCount() {
  const [count, setCount] = useState(BASE);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((prev) => {
        const drift = Math.round((Math.random() - 0.5) * 6);
        const next = prev + drift;
        return Math.max(BASE - 40, Math.min(BASE + 60, next));
      });
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-1.5 text-xs text-white/70 sm:text-sm">
      <span className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_6px_1px_rgba(34,197,94,0.7)]" />
      <span className="font-mono-nums">{count.toLocaleString("en-IN")}</span>
      <span className="hidden text-white/50 sm:inline">listening now</span>
    </div>
  );
}

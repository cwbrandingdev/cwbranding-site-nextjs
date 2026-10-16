"use client";

import { useState } from "react";

type Tab = "leads" | "blog";

// Abas do painel. As duas ficam montadas (só escondidas) para os leads
// continuarem chegando em tempo real enquanto você mexe no blog.
export function AdminTabs({ leads, blog }: { leads: React.ReactNode; blog: React.ReactNode }) {
  const [tab, setTab] = useState<Tab>("leads");

  const tabClass = (name: Tab) =>
    `rounded-full px-5 py-2 text-xs uppercase tracking-[0.2em] transition-colors ${
      tab === name ? "bg-[#E8C39E] text-[#004D4C]" : "text-white/70 hover:text-white"
    }`;

  return (
    <div className="min-h-screen bg-[#032826]">
      <nav className="flex gap-2 px-4 pt-6 sm:px-8" aria-label="Seções do painel">
        <button type="button" onClick={() => setTab("leads")} className={tabClass("leads")}>
          Leads
        </button>
        <button type="button" onClick={() => setTab("blog")} className={tabClass("blog")}>
          Blog
        </button>
      </nav>

      <div className={tab === "leads" ? "" : "hidden"}>{leads}</div>
      <div className={tab === "blog" ? "" : "hidden"}>{blog}</div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLogout } from "@/features/auth/hooks";
import { useState } from "react";

const NAV_ITEMS = [
  {
    href: "/workouts",
    label: "Workouts",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 5v14M18 5v14M2 9h4M18 9h4M2 15h4M18 15h4" />
      </svg>
    ),
  },
  {
    href: "/me",
    label: "Profile",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
  {
    href: "/stats",
    label: "Stats",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 3v18h18" />
        <path d="M7 16l4-4 4 4 4-6" />
      </svg>
    ),
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { mutate: logout, isPending } = useLogout();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`app-sidebar ${collapsed ? "app-sidebar--collapsed" : ""}`}
    >
      {/* Logo + toggle */}
      <div className="app-sidebar__header">
        {!collapsed && (
          <div className="app-sidebar__logo">
            <span className="app-sidebar__logo-icon">🏋️</span>
            <span className="app-sidebar__logo-text">Training</span>
          </div>
        )}
        <button
          className="app-sidebar__toggle"
          onClick={() => setCollapsed((prev) => !prev)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`app-sidebar__toggle-icon ${collapsed ? "app-sidebar__toggle-icon--flipped" : ""}`}
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      </div>

      {/* Nav */}
      <nav className="app-sidebar__nav">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/workouts"
              ? pathname.startsWith("/workouts")
              : pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`app-sidebar__link ${isActive ? "app-sidebar__link--active" : ""}`}
              title={collapsed ? item.label : undefined}
            >
              <span className="app-sidebar__link-icon">{item.icon}</span>
              {!collapsed && (
                <span className="app-sidebar__link-label">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="app-sidebar__bottom">
        <button
          className="app-sidebar__logout"
          onClick={() => logout()}
          disabled={isPending}
          title={collapsed ? "Log out" : undefined}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          {!collapsed && (
            <span>{isPending ? "Logging out..." : "Log out"}</span>
          )}
        </button>
      </div>
    </aside>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLogout } from "@/features/auth/hooks";
import { setTheme } from "../store/theme/theme.slice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectTheme } from "../store/theme/theme.selectors";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  {
    href: "/workouts",
    label: "Workouts",
    matchPath: (p: string) => p.startsWith("/workouts"),
    icon: (
      <svg
        width="24"
        height="24"
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
    href: "/stats",
    label: "Stats",
    matchPath: (p: string) => p === "/stats",
    icon: (
      <svg
        width="24"
        height="24"
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
  {
    href: "/profile",
    label: "Profile",
    matchPath: (p: string) => p === "/profile",
    icon: (
      <svg
        width="24"
        height="24"
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
];

export function MobileNav() {
  const pathname = usePathname();
  const { mutate: logout } = useLogout();
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Не показуємо на /auth сторінках
  if (pathname.startsWith("/auth")) return null;

  return (
    <nav className="mobile-nav md:hidden">
      <div className="mobile-nav__inner">
        {NAV_ITEMS.map((item) => {
          const isActive = item.matchPath(pathname);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`mobile-nav__item ${isActive ? "mobile-nav__item--active" : ""}`}
            >
              <span className="mobile-nav__icon">{item.icon}</span>
              <span className="mobile-nav__label">{item.label}</span>
            </Link>
          );
        })}

        {/* Theme toggle */}
        <button
          className="mobile-nav__item"
          onClick={() =>
            dispatch(setTheme(theme === "dark" ? "light" : "dark"))
          }
          aria-label="Toggle theme"
        >
          <span className="mobile-nav__icon">
            {mounted && theme === "dark" ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </span>
          <span className="mobile-nav__label">Theme</span>
        </button>

        {/* Logout */}
        <button
          className="mobile-nav__item mobile-nav__item--danger"
          onClick={() => logout()}
          aria-label="Log out"
        >
          <span className="mobile-nav__icon">
            <svg
              width="24"
              height="24"
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
          </span>
          <span className="mobile-nav__label">Logout</span>
        </button>
      </div>
    </nav>
  );
}

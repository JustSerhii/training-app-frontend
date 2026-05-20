"use client";

import { useEffect, PropsWithChildren } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setTheme } from "../store/theme/theme.slice";
import { selectTheme } from "../store/theme/theme.selectors";

export function ThemeProvider({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);

  useEffect(() => {
    const saved = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | "system"
      | null;
    if (saved) dispatch(setTheme(saved));
  }, [dispatch]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "system") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      root.classList.toggle("dark", prefersDark);
    } else {
      root.classList.toggle("dark", theme === "dark");
    }
  }, [theme]);

  return <>{children}</>;
}

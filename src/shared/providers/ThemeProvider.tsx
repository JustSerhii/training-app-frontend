"use client";

import { useEffect, PropsWithChildren } from "react";
import { useAppSelector } from "../store/hooks";
import { selectTheme } from "../store/theme/theme.selectors";

export function ThemeProvider({ children }: PropsWithChildren) {
  const theme = useAppSelector(selectTheme);

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

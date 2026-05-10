"use client";

import { PropsWithChildren } from "react";
import { TanstackQueryProvider } from "./TanstackQueryProvider";
import { ThemeProvider } from ".";

export function MainProvider({ children }: PropsWithChildren<unknown>) {
  return (
    <TanstackQueryProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </TanstackQueryProvider>
  );
}

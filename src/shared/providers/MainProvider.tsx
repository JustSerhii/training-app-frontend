"use client";

import { PropsWithChildren } from "react";
import { TanstackQueryProvider } from "./TanstackQueryProvider";
import { ThemeProvider } from ".";
import { Toaster } from "sonner";

export function MainProvider({ children }: PropsWithChildren<unknown>) {
  return (
    <TanstackQueryProvider>
      <ThemeProvider>
        {children}
        <Toaster />
      </ThemeProvider>
    </TanstackQueryProvider>
  );
}

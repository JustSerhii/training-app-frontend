"use client";

import { PropsWithChildren } from "react";
import { TanstackQueryProvider } from "./TanstackQueryProvider";
import { ThemeProvider } from ".";
import { Toaster } from "sonner";
import { ReduxProvider } from "./ReduxProvider";

export function MainProvider({ children }: PropsWithChildren<unknown>) {
  return (
    <TanstackQueryProvider>
      <ReduxProvider>
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </ReduxProvider>
    </TanstackQueryProvider>
  );
}

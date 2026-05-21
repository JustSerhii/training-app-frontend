import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../shared/globals.css";
import { MainProvider } from "@/shared/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Training App",
  description: "Training App",
};

const themeInitScript = `
  (function() {
    try {
      var theme = localStorage.getItem('theme');
      var root = document.documentElement;
      if (theme === 'dark') {
        root.classList.add('dark');
      } else if (theme === 'system' || !theme) {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          root.classList.add('dark');
        }
      }
    } catch (e) {}
  })();
`;

const sidebarScript = `
  (function() {
    try {
      var collapsed = localStorage.getItem('sidebar-collapsed');
      if (collapsed === 'true') {
        document.documentElement.setAttribute('data-sidebar-collapsed', 'true');
      }
    } catch(e) {}
  })();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="antialiased" suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script dangerouslySetInnerHTML={{ __html: sidebarScript }} />
        <MainProvider>{children}</MainProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { StatsClient } from "@/features/stats/components/StatsClient";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Stats | Training App",
};

export default function StatsPage() {
  return (
    <Suspense
      fallback={<div className="p-8 text-center">Loading stats...</div>}
    >
      <StatsClient />
    </Suspense>
  );
}

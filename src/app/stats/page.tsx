import type { Metadata } from "next";
import { StatsClient } from "@/features/stats/components/StatsClient";

export const metadata: Metadata = {
  title: "Stats | Training App",
};

export default function StatsPage() {
  return <StatsClient />;
}

import { ProfileClient } from "@/features/profile/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile | Training App",
};

export default function WorkoutsPage() {
  return <ProfileClient />;
}

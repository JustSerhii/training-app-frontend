import { DesktopSidebar } from "@/shared/components/DesktopSidebar";
import { MobileNav } from "@/shared/components/MobileNav";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="app-layout">
      <DesktopSidebar />
      <main className="app-main">{children}</main>
      <MobileNav />
    </div>
  );
}

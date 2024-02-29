import { Metadata } from "next";
import SideMenu from "@/components/dashboard/SideMenu";

export const metadata: Metadata = {
  title: "Foresta | Dashboard",
  description: "Navigate the future of carbon credit management with the Foresta Dashboard. Access comprehensive tools for issuing, trading, and retiring carbon credits, all designed to streamline your sustainability efforts. Explore our interactive examples to discover how you can enhance your carbon offset strategies and contribute to global environmental goals.",
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      <div className="flex h-screen bg-gray-50 dark:bg-background">
        <SideMenu />
        <div className="flex flex-col flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </>
  );
}

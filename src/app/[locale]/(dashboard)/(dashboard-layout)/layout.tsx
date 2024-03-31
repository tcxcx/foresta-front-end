import React, { Suspense } from "react";
import SideMenu from "@/components/dashboard/SideMenu";
import Navbar from "@/components/dashboard/navbar";
import SideMenuSkeleton from "@/components/dashboard/Skeleton/SideMenuSkeleton";
import { Toaster } from "@/components/ui/toaster";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-background border border-gray-100 dark:border-secondary z-50">
      <Suspense fallback={<SideMenuSkeleton />}>
        <SideMenu />
      </Suspense>
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <main className="flex flex-col h-screen overflow-hidden">
          {children}
        </main>
        <Toaster />
      </div>
    </div>
  );
}

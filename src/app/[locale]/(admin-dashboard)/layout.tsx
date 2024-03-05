import React, { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Foresta | Admin Dashboard",
  description:
    "Navigate the future of carbon credit management with the Foresta Dashboard. Access comprehensive tools for issuing, trading, and retiring carbon credits, all designed to streamline your sustainability efforts. Explore our interactive examples to discover how you can enhance your carbon offset strategies and contribute to global environmental goals.",
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return <>{children}</>;
}

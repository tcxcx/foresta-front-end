"use client";

import React, { ReactNode, useEffect } from "react"; // Import ReactNode
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/context/account";
import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { account, role } = useAuth();
  const router = useRouter();
  const adminAddress = process.env.NEXT_PUBLIC_ADMIN_WALLET_ADDRESS;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (role !== "admin" || account?.address !== adminAddress) {
        router.push("/");
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [account, role, router, adminAddress]);

  return role === "admin" && account?.address === adminAddress ? (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50 dark:bg-background border border-gray-100 dark:border-secondary">
      <div className="max-w-full w-full px-4">{children}</div>
    </div>
  ) : (
    <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-background border border-gray-100 dark:border-secondary">
      <div className="text-center">
        <p className="mb-4">You are not an admin.</p>
        <Button
          variant="outline"
          onClick={() => router.push("/")}
          className="mb-4"
        >
          Go Home You&apos;re Drunk
        </Button>
      </div>
    </div>
  );
};

export default DashboardLayout;

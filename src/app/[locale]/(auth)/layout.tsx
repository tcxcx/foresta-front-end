import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { Metadata } from "next";
import LeftPanelImage from "@/components/auth/LeftPanelImage";

export const metadata: Metadata = {
  title: "Foresta | Substrate-based Authentication",
  description: "Connect your wallet to login to the platform",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        {/* Left panel with images, quote and overlay - hidden on small screens */}
        <LeftPanelImage />

        {/* Right panel with wallet - always visible */}
        <div className="flex-1 w-full h-full py-0 px-10 dark:bg-background bg-white overflow-auto">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "absolute mt-4 z-10 uppercase"
            )}
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Go Home
          </Link>
          {children}
        </div>
      </div>
    </>
  );
}

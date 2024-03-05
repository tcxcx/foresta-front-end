"use client";

import React, { Suspense } from "react";
import { Metadata } from "next";
import SideMenu from "@/components/dashboard/SideMenu";
import SideMenuSkeleton from "@/components/dashboard/Skeleton/SideMenuSkeleton";
import Navbar from "@/components/dashboard/navbar";
import { useAuth } from "@/hooks/context/account";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ResizableSkeleton } from "@/components/dashboard/Skeleton/ResizableSkeleton";
import { useKYCSubscription } from "@/hooks/web3/useKycSubscription";
import { Terminal } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SheetKyc1 } from "@/components/dashboard/kycLevel1";

interface DashboardLayoutProps {
  children: React.ReactNode;
  marketplace: React.ReactNode;
  mapglobe: React.ReactNode;
  governance: React.ReactNode;
}

export default function DashboardLayout({
  children,
  marketplace,
  mapglobe,
  governance,
}: DashboardLayoutProps) {
  const { account } = useAuth();
  const router = useRouter();
  const accountId = account?.address || "";
  const { kycStatus, error } = useKYCSubscription(accountId);
  const needsKYC = !kycStatus || kycStatus.level === 0;


  // console.log("KYC Status: ", kycStatus);

  // console.log("this is the accountId: ", accountId);


  return account ? (
    <>
      <div className="flex h-screen bg-gray-50 dark:bg-background border border-gray-100 dark:border-secondary z-50">
        <Suspense fallback={<SideMenuSkeleton />}>
          <SideMenu />
        </Suspense>
        <div className="flex flex-col flex-1 overflow-hidden">
          <Navbar />
          <main className="flex flex-col h-screen overflow-hidden">
            {needsKYC && (
              <div className="flex justify-center mt-2 w-full border-b border-secondary">
                <Alert variant="green" className="max-w-lg w-full space-x-2 mb-2">
                  <div className="flex items-center space-x-2">
                    <Terminal className="h-6 w-6 font-clash" />
                    <AlertTitle className="font-clash text-xl  text-primary flex items-center p-2 pr-6">
                      User unverified! 
                      <span className="h-px flex-1 px-12 bg-black dark:bg-primary/30 z-1"> </span>
                      <SheetKyc1 />

                    </AlertTitle>
                  </div>
                  <AlertDescription className="font-violet ">
                      You need to complete KYC to access more features.
                  </AlertDescription>
                </Alert>
              </div>
            )}
            <Suspense fallback={<ResizableSkeleton />}>
              <ResizablePanelGroup
                direction="horizontal"
                className="w-full h-full p-4"
              >
                <ResizablePanel
                  defaultSize={250}
                  className="flex-1 overflow-hidden"
                >
                  {marketplace}
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel
                  defaultSize={400}
                  className="flex-1 overflow-hidden"
                >
                  <ResizablePanelGroup direction="vertical" className="h-full">
                    <ResizablePanel
                      defaultSize={400}
                      className="overflow-hidden"
                    >
                      {mapglobe}
                    </ResizablePanel>
                    <ResizableHandle withHandle />

                    <ResizablePanel
                      defaultSize={100}
                      className="overflow-hidden"
                    >
                      {needsKYC ? (
                        <div className="flex flex-col h-full w-full px-4 bg-[url('/images/topography.svg')] bg-cover">
                          <div className="font-clash font-bold text-2xl text-[#eaeaea]">
                            No Access
                          </div>
                        </div>
                      ) : (
                        governance
                      )}
                    </ResizablePanel>
                  </ResizablePanelGroup>
                </ResizablePanel>
              </ResizablePanelGroup>
            </Suspense>
          </main>
        </div>
      </div>
    </>
  ) : (
    <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-background border border-gray-100 dark:border-secondary">
      <div className="text-center">
        <p className="mb-4">
          You must log in with your Substrate account to view the dashboard
          contents.
        </p>
        <Button
          variant="outline"
          onClick={() => router.push("/")}
          className="mb-4"
        >
          Go Back Home
        </Button>
      </div>
    </div>
  );
}

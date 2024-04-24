"use client";

import React, { Suspense } from "react";
import { useAuth } from "@/hooks/context/account";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ResizableSkeleton } from "@/components/dashboard/Skeleton/ResizableSkeleton";
import { useKYCSubscription } from "@/hooks/web3/kycHooks/useKycSubscription";
import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SheetKyc1 } from "@/components/dashboard/Marketplace/kycLevel1";
import { useMarketplaceData } from "@/hooks/context/useMarketplaceData";
import { MarketplaceWrapper } from "@/components/dashboard/Marketplace/MarketplaceWrapper";
interface DashboardLayoutProps {
  children: React.ReactNode;
  marketplace: React.ReactElement;
  mapglobe: React.ReactNode;
  governance: React.ReactNode;
}
import { useLocale } from "next-intl";

export default function DashboardLayout({
  children,
  marketplace,
  mapglobe,
  governance,
}: DashboardLayoutProps) {
  const { account } = useAuth();
  const router = useRouter();
  const locale = useLocale();
  const accountId = account?.address || "";
  const { kycStatus } = useKYCSubscription(accountId);
  const { liveCollectives, acceptedProjects, selectCollective } =
    useMarketplaceData();
  const marketplaceData = {
    liveCollectives,
    acceptedProjects,
    selectCollective,
  };

  const hasAccess =
    kycStatus &&
    (kycStatus.level === "KYCLevel1" ||
      kycStatus.level === "KYCLevel2" ||
      kycStatus.level === "KYCLevel3");
  const marketplaceComponent = React.cloneElement(marketplace, {
    marketplaceData,
  });

  return account ? (
    <>
      {!hasAccess && (
        <div className="flex justify-center mt-2 w-full border-b border-secondary">
          <Alert variant="green" className="max-w-lg w-full space-x-2 mb-2">
            <div className="flex items-center space-x-2">
              <Terminal className="h-6 w-6 font-clash" />
              <AlertTitle className="font-clash text-xl  text-primary flex items-center p-2 pr-6">
                User unverified!
                <span className="h-px flex-1 px-12 bg-black dark:bg-primary/30 z-1">
                  {" "}
                </span>
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
          <ResizablePanel defaultSize={250} className="flex-1 overflow-hidden">
            <MarketplaceWrapper
              marketplaceData={marketplaceData}
              locale={locale}
            />
            {/* Render the MarketplaceWrapper component */}
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={400} className="flex-1 overflow-hidden">
            <ResizablePanelGroup direction="vertical" className="h-full">
              <ResizablePanel defaultSize={400} className="overflow-hidden">
                {mapglobe}
              </ResizablePanel>
              <ResizableHandle withHandle />

              <ResizablePanel defaultSize={100} className="overflow-hidden">
                {!hasAccess ? (
                  <div className="flex flex-col h-full w-full px-4 bg-[url('/images/topography.svg')] bg-cover">
                    <span className="flex items-center p-2">
                      <span className="h-px flex-1 bg-black dark:bg-white"></span>
                      <span className="pl-6 uppercase font-violet text-primary text-xl">
                        No Access w/o KYC
                      </span>
                    </span>
                  </div>
                ) : (
                  governance
                )}
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </Suspense>
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

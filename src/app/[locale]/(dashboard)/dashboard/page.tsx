import React, { Suspense } from "react";
import { useTranslations } from "next-intl";
const Resizable = React.lazy(
  () => import("../../../../components/dashboard/Resizable")
);

import { ResizableSkeleton } from "@/components/dashboard/Skeleton/ResizableSkeleton";

export default function Dashboard() {
  const t = useTranslations("Marketplace");

  return (
    <div className="flex flex-col h-screen overflow-hidden">
  
    </div>
  );
}

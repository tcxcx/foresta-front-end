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
      <Suspense fallback={<ResizableSkeleton />}>
        <Resizable
          marketTitle={t("marketplaceTitle")}
          governanceTitle={t("governanceTitle")}
          buttonText={t("button")}
          titleText={t("title")}
          descriptionText={t("description")}
          decreaseText={t("decrease")}
          increaseText={t("increase")}
          confirmText={t("confirm")}
          cancelText={t("cancel")}
          creditsText={t("credits")}
        />
      </Suspense>
    </div>
  );
}

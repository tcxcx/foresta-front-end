import React from "react";
import { ContainerTableView } from "@/components/dashboard/Marketplace/ContainerTableView";
import { useTranslations } from "next-intl";
import { CollectiveInfo, ProjectDetail } from "@/lib/data/CollectiveTypes";

interface MarketplacePageProps {
  marketplaceData?: {
    liveCollectives: CollectiveInfo[];
    acceptedProjects: ProjectDetail[];
    selectCollective: (id: number) => void;
  };
}

export default function MarketplacePage({
  marketplaceData,
}: MarketplacePageProps) {
  const t = useTranslations("Marketplace");
  console.log("marketplaceData in MarketplacePage: ", marketplaceData);

  if (!marketplaceData) {
    return <div>{t("loading")}</div>;
  }

  const { liveCollectives, acceptedProjects, selectCollective } =
    marketplaceData;

  return (
    <>
      <span className="flex items-center p-2">
        <span className="pr-6 uppercase font-violet text-primary p-0 pb-0 text-xl">
          {t("marketplaceTitle")}
        </span>
        <span className="h-px flex-1 bg-black dark:bg-white"></span>
      </span>
      <ContainerTableView
        buttonText={t("button")}
        titleText={t("title")}
        descriptionText={t("description")}
        decreaseText={t("decrease")}
        increaseText={t("increase")}
        confirmText={t("confirm")}
        cancelText={t("cancel")}
        creditsText={t("credits")}
        liveCollectives={liveCollectives}
        acceptedProjects={acceptedProjects}
        selectCollective={selectCollective}
      />
    </>
  );
}

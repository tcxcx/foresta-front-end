import React from "react";
import { ContainerTableView } from "@/components/dashboard/ContainerTableView";
import { useTranslations } from "next-intl";

export default function MarketplacePage() {
  const t = useTranslations("Marketplace");

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
      />
    </>
  );
}

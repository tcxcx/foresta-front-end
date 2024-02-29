import React from "react";
import { Resizable } from "@/components/dashboard/Resizable";
import { useTranslations } from "next-intl";

export default function Dashboard() {
  const t = useTranslations("Marketplace");

  return (
    <div className="flex flex-col h-screen">
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
    </div>
  );
}

import React from "react";
import GovernanceOverview from "@/components/dashboard/Marketplace/GovernanceOverview";
import { useTranslations } from "next-intl";



export default function Governance() {
  const t = useTranslations("Marketplace");

  return (
    <>
      <span className="flex items-center p-2">
        <span className="h-px flex-1 bg-black dark:bg-white"></span>
        <span className="pl-6 uppercase font-violet text-primary text-xl">
        {t("governanceTitle")}
        </span>
      </span>
      <GovernanceOverview />
    </>
  );
}

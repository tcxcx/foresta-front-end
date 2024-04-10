"use client";

import React from "react";
import MarketplacePage from "@/app/[locale]/(dashboard)/(dashboard-layout)/dashboard/explore/@marketplace/page";
import { IntlProvider } from "next-intl";
import enMessages from "../../../../messages/en.json";
import esMessages from "../../../../messages/es.json";

interface MarketplaceWrapperProps {
  marketplaceData: {
    liveCollectives: any[];
    acceptedProjects: any[];
    selectCollective: (id: number) => void;
  };
  locale: string;
}

export const MarketplaceWrapper = ({
  marketplaceData,
  locale,
}: MarketplaceWrapperProps) => {
  const messages = locale === "en" ? enMessages : esMessages;
  return (
      <IntlProvider locale={locale} messages={messages}>
        <MarketplacePage marketplaceData={marketplaceData} />
      </IntlProvider>
  );
};

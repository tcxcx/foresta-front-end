// Inside @marketplace/page.tsx
import React from 'react';
import { ContainerTableView } from "@/components/dashboard/ContainerTableView";
import { useTranslations } from "next-intl";

interface ResizableProps {
  marketTitle: string;
  buttonText: string;
  titleText: string;
  descriptionText: string;
  decreaseText: string;
  increaseText: string;
  confirmText: string;
  cancelText: string;
  creditsText: string;
}


export default function MarketplacePage(props: ResizableProps) {
  const t = useTranslations("Marketplace");

  return (
  <>
    <span className="flex items-center p-2">
          <span className="pr-6 uppercase font-violet text-primary p-0 pb-0 text-xl">
          {t("marketplaceTitle")}
                    </span>
          <span className="h-px flex-1 bg-black dark:bg-white"></span>
        </span>
        <ContainerTableView {...props} />
  </>
  );
}

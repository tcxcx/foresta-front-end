import React from "react";
import { useTranslations } from "next-intl";
import { WavyBackground } from "../ui/wavy-background";
import GlobeComponent from "../ui/globe-component";
import ResizableToggle from './ResizableToggle';

export function WavyBackgroundDemo() {
  const t = useTranslations("IndexPage");

  return (
    <WavyBackground className="max-w-4xl mx-auto pb-40">
      <p className="text-2xl md:text-4xl lg:text-7xl text-black dark:text-white font-bold inter-var text-center">
        {t("title")}
      </p>

      <p className="text-base md:text-lg mt-4 text-black font-normal dark:text-white inter-var text-center">
        {t("description")}
      </p>
      <div className="pin-container">
        <GlobeComponent />
      </div>
      {/* Centering the ResizableToggle component */}
      <div className="flex justify-center items-center w-full">
        <ResizableToggle />
      </div>
    </WavyBackground>
  );
}

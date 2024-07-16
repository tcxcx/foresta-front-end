import React from "react";
import { useTranslations } from "next-intl";
import { WavyBackground } from "../ui/wavy-background";
import GlobeComponent from "../ui/globe-component";
import ResizableToggle from "./ResizableToggle";

export function WavyBackgroundDemo() {
  const t = useTranslations("IndexPage");

  return (
    <WavyBackground className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center">
          <p className="text-5xl py-4 md:text-4xl lg:text-6xl text-black dark:text-white font-bold inter-var text-center">
            {t("title")}
          </p>

          <p className="text-sm sm:text-base md:text-lg text-black font-normal dark:text-white inter-var text-center">
            {t("description")}
          </p>
      </div>
      <div className="hidden md:block relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
        <GlobeComponent />
      </div>
      <div className="flex justify-center items-center w-full mt-4">
        <ResizableToggle carbonButton={t("carbonButtonRoute")} />
      </div>
    </WavyBackground>
  );
}

import { useTranslations } from "next-intl";
import React from "react";
import { WavyBackground } from "../ui/wavy-background";
import GlobeComponent from "../ui/globe-component";
export function WavyBackgroundDemo() {
  const t = useTranslations("IndexPage");

  return (
    <WavyBackground className="max-w-4xl mx-auto pb-40">
      <p className="text-2xl md:text-4xl lg:text-7xl text-black font-bold inter-var text-center">
        {t("title")}
      </p>
      <p className="text-base md:text-lg mt-4 text-black font-normal inter-var text-center">
        {t("description")}
      </p>
      <GlobeComponent/>
    </WavyBackground>
  );
}

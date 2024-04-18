import React from "react";
import Image from "next/image";

interface BentoItem {
  label: string;
  value: string;
  icon?: string;
}

interface BentoSectionProps {
  title: string;
  items: BentoItem[];
}

const sdgImagePaths: { [key: string]: string } = {
  NoPoverty: "/images/SDG_Icons/E-WEB-Goal-01.png",
  ZeroHunger: "/images/SDG_Icons/E-WEB-Goal-02.png",
  GoodHealthAndWellBeing: "/images/SDG_Icons/E-WEB-Goal-03.png",
  QualityEducation: "/images/SDG_Icons/E-WEB-Goal-04.png",
  GenderEquality: "/images/SDG_Icons/E-WEB-Goal-05.png",
  CleanWaterAndSanitation: "/images/SDG_Icons/E-WEB-Goal-06.png",
  AffordableAndCleanEnergy: "/images/SDG_Icons/E-WEB-Goal-07.png",
  DecentWorkAndEconomicGrowth: "/images/SDG_Icons/E-WEB-Goal-08.png",
  IndustryInnovationAndInfrastructure: "/images/SDG_Icons/E-WEB-Goal-09.png",
  ReducedInequalities: "/images/SDG_Icons/E-WEB-Goal-10.png",
  SustainableCitiesAndCommunities: "/images/SDG_Icons/E-WEB-Goal-11.png",
  ResponsibleConsumptionAndProduction: "/images/SDG_Icons/E-WEB-Goal-12.png",
  ClimateAction: "/images/SDG_Icons/E-WEB-Goal-13.png",
  LifeBelowWater: "/images/SDG_Icons/E-WEB-Goal-14.png",
  LifeOnLand: "/images/SDG_Icons/E-WEB-Goal-15.png",
  PeaceJusticeAndStrongInstitutions: "/images/SDG_Icons/E-WEB-Goal-16.png",
  PartnershipsForTheGoals: "/images/SDG_Icons/E-WEB-Goal-17.png",
};

const normalizeLabel = (label: string) => {
  return label
    .replace(/([A-Z])/g, " $1")
    .trim()
    .replace(/S D G /, "");
};

export const BentoSection: React.FC<BentoSectionProps> = ({ title, items }) => {
  return (
    <div className="space-y-4 px-4 py-6 rounded-md shadow-md bg-gray-50 dark:bg-gray-800">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="flex flex-wrap justify-start mb-4">
        {items.map((item, index) =>
          item.icon ? (
            <div key={index} className="p-2">
              <Image
                src={sdgImagePaths[item.icon] || "/images/fallback-image.png"}
                alt={normalizeLabel(item.label)}
                width={50}
                height={50}
              />
            </div>
          ) : null
        )}
      </div>
      <div className="space-y-4">
        <ul className="list-disc pl-5 space-y-2">
          {items.map(({ label, value }, index) => (
            <li key={index}>
              <h4 className="text-sm font-semibold">{normalizeLabel(label)}</h4>
              <p className="text-sm">{value}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

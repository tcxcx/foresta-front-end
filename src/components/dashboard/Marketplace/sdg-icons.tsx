import React from "react";
import Image from "next/image";

interface SDGIconsProps {
  sdgs: number[];
}

export const SDGIcons: React.FC<SDGIconsProps> = ({ sdgs }) => {
  return (
    <div className="flex space-x-2">
      {sdgs.map((sdg) => (
        <div key={sdg} className="relative w-8 h-8">
          <Image
            src={`/sdg-icons/sdg-${sdg}.svg`}
            alt={`SDG ${sdg}`}
            layout="fill"
            objectFit="contain"
          />
        </div>
      ))}
    </div>
  );
};
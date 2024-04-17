import React from "react";

interface BentoItem {
  label: string;
  value: string;
}

interface BentoSectionProps {
  title: string;
  items: BentoItem[];
}

export const BentoSection: React.FC<BentoSectionProps> = ({ title, items }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <div className="grid grid-cols-2 gap-4">
        {items.map((item, index) => (
          <div key={index}>
            <p className="text-sm font-semibold">{item.label}</p>
            <p className="text-sm">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
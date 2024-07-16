import React from 'react';
import { LordIcon } from '@/lib/lordicon/lord-icon';
import HummingBirdLight from '@/lib/foresta-icons/wired-outline-1135-hummingbird.json';
import HummingBirdDark from '@/lib/foresta-dark/wired-gradient-1135-hummingbird.json';
import { useTheme } from "next-themes";

type SpinnerProps = {
  text?: string;
  icon?: string;
  showHummingbird?: boolean;
};

const Spinner: React.FC<SpinnerProps> = ({ text, icon, showHummingbird = false }) => {
  const { theme } = useTheme();
  const hummingbirdIcon = theme === "dark" ? HummingBirdDark : HummingBirdLight;
  const hummingbirdDataUri = `data:application/json;base64,${Buffer.from(JSON.stringify(hummingbirdIcon)).toString("base64")}`;

  return (
    <div className="relative top-2 left-0 right-0 bottom-0 flex justify-center items-center">
      {text && (
        <div className="absolute flex justify-center items-center font-clash uppercase text-xs">
          <span className="text-center">{text}</span>
        </div>
      )}
      <div className="relative h-24 w-24">
        {/* {(icon || showHummingbird) && (
          <div className="absolute inset-0 flex items-center justify-center z-40">
            <LordIcon
              src={icon ? `data:application/json;base64,${Buffer.from(JSON.stringify(icon)).toString("base64")}` : hummingbirdDataUri}
              trigger="loop-on-hover"
              colors={{ primary: '#303f9f' }}
              size={80}
            />
          </div>
        )} */}
        <div className="absolute inset-0 animate-spin rounded-full border-t-4 border-b-4 border-primary"></div>
      </div>
    </div>
  );
};

export default Spinner;
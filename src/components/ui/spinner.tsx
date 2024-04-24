import React from 'react';
import clsx from 'clsx';
import Image from 'next/image';
type SpinnerProps = {
  text?: string;
  icon?: string; // Base64 encoded image data
};

const Spinner: React.FC<SpinnerProps> = ({ text, icon }) => {
  return (
    <div className="relative top-2 left-0 right-0 bottom-0 flex justify-center items-center">
      {text && (
        <div className="absolute flex justify-center items-center font-clash uppercase text-xs">
          <span className="text-center">{text}</span>
        </div>
      )}
      <div
        className={clsx(
          'h-24 w-24',
          icon && 'flex items-center justify-center',
          !icon && 'animate-spin rounded-full border-t-4 border-b-4 border-primary'
        )}
      >
        {icon && <Image src={`data:image/png;base64,${icon}`} alt="Spinner Icon" width={100} height={100} className="max-h-full max-w-full" />}
      </div>
    </div>
  );
};

export default Spinner;
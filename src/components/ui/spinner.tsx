import React from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { LordIcon } from '@/lib/lordicon/lord-icon';

type SpinnerProps = {
  text?: string;
  icon?: string;
};

const Spinner: React.FC<SpinnerProps> = ({ text, icon }) => {
  const isImageData = icon?.startsWith('data:image/');
  const isJsonData = icon?.startsWith('data:application/json;base64,');

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
          (isImageData || !icon) && 'flex items-center justify-center',
          (!isImageData && !icon) && 'animate-spin rounded-full border-t-4 border-b-4 border-primary'
        )}
      >
        {isImageData && icon && <Image src={icon} alt="Spinner Icon" width={100} height={100} className="max-h-full max-w-full" />}
        {isJsonData && <LordIcon src={icon} trigger="loop-on-hover" colors={{ primary: '#303f9f' }} size={100} />}
      </div>
    </div>
  );
};

export default Spinner;
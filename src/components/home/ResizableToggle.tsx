'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import ButtonOffset from './ButtonOffset';
import { useLocale } from "next-intl";

interface ResizableToggleProps {
  carbonButton: string;
}

const ResizableToggle: React.FC<ResizableToggleProps> = ({ carbonButton }) => {
  const router = useRouter();
  const locale = useLocale();

  const navigateToDashboard = () => {
    const path = `/${locale}/dashboard/carbon-trading`;
    router.push(path);
  };

  return (
    <>
    <ButtonOffset onClick={navigateToDashboard} buttonText={carbonButton} />
    </>
  );
};

export default ResizableToggle;

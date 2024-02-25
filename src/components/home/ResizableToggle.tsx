'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import ButtonOffset from './ButtonOffset';
import { useLocale } from "next-intl";

const ResizableToggle: React.FC = () => {
  const router = useRouter();
  const locale = useLocale();

  const navigateToDashboard = () => {
    const path = `/${locale}/dashboard`;
    router.push(path);
  };

  return (
    <>
      <ButtonOffset onClick={navigateToDashboard} />
    </>
  );
};

export default ResizableToggle;

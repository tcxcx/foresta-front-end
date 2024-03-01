'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from "@/hooks/context/account";
import { useLocale } from "next-intl";
import { Button } from '../ui/button'; // Ensure the import path matches your project structure

export default function AuthButton() {
  const { account } = useAuth();
  const router = useRouter();
  const locale = useLocale();

  const handleButtonClick = () => {
    // Define the route based on the authentication status
    const route = account ? `/${locale}/dashboard` : `/${locale}/log-in`;
    // Navigate to the appropriate route
    router.push(route);
  };

  return (
    <Button
      onClick={handleButtonClick}
      variant={account ? "default" : "secondary"} 
    >
      {account ? "Go to Dashboard" : "Login"}
    </Button>
  );
}

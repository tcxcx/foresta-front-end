"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/context/account";
import { useLocale } from "next-intl";
import { Button } from "../ui/button";
import ConnectedAccount from "@/components/Web3/ConnectedAccount";

export default function AuthButton() {
  const { account } = useAuth();
  const router = useRouter();
  const locale = useLocale();

  const handleButtonClick = () => {
    const route = account ? `/${locale}/dashboard/explore` : `/${locale}/log-in`;
    router.push(route);
  };

  return (
    <div className="flex items-center">
      {account ? (
        <>
          <ConnectedAccount />
          <Button
            onClick={handleButtonClick}
            variant="default"
            className="uppercase text-pretty font-clash "
          >
            Dashboard
          </Button>
        </>
      ) : (
        <Button onClick={handleButtonClick} variant="secondary" className="uppercase text-pretty font-clash">
          Login
        </Button>
      )}
    </div>
  );
}

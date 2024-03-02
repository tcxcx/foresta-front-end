"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useAuth, useLogout } from "@/hooks/context/account";
import { useLocale } from "next-intl";
import { Button } from "../ui/button"; // Ensure the import path matches your project structure
import Identicon from "@polkadot/react-identicon"; // Ensure this import path is correct
import truncateMiddle from "truncate-middle"; // Ensure this import path is correct
import { CopyIcon, ExitIcon } from "@radix-ui/react-icons";
import ConnectedAccount from "../Web3/ConnectedAccount";

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
    <div className="flex items-center gap-4">
      {account ? (
        <>
          <ConnectedAccount />
          <Button
            onClick={handleButtonClick}
            variant="default"
            className="uppercase text-pretty font-clash "
          >
            Go to Dashboard
          </Button>
        </>
      ) : (
        <Button onClick={handleButtonClick} variant="secondary">
          Login
        </Button>
      )}
    </div>
  );
}

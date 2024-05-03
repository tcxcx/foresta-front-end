"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/context/account";
import { GridPattern } from "@/components/ui/GridPattern";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface ApillonLoginProps {
  onGoBack: () => void;
}

let oAuthWindow: Window | null;

const getAuthToken = async () => {
  const response = await fetch("http://localhost:3000/session-token", {
    method: "GET",
  });
  const { data } = await response.json();
  return data.sessionToken;
};

async function openOAuthPopup() {
  const sessionToken = await getAuthToken();
  oAuthWindow = window.open(
    `https://oauth.apillon.io/?embedded=1&token=${sessionToken}`,
    "Apillon OAuth Form",
    `height=${900} width=${450} resizable=no`
  );
}

async function verifyUserLogin(
  oAuthToken: string,
  login: (
    account: { meta: { name: string }; address: string },
    oAuthToken: string
  ) => void,
  router: ReturnType<typeof useRouter>,
  locale: string
) {
  const response = await fetch(`http://localhost:3000/verify-login`, {
    method: "POST",
    body: JSON.stringify({ token: oAuthToken }),
    headers: new Headers({ "Content-Type": "application/json" }),
  });
  const { data } = await response.json();
  const { email } = data;

  // Set user session using the useAuth hook
  login({ meta: { name: email }, address: email }, oAuthToken);

  // Redirect to the Profile component
  router.push(`/${locale}/profile`);
}

export default function ApillonLogin({ onGoBack }: ApillonLoginProps) {
  const router = useRouter();
  const locale = useLocale();
  const { login } = useAuth();

  const gridBlocks = [
    [2, 5],
    [3, 1],
    [4, 3],
  ];


  const handleApillonLogin = () => {
    openOAuthPopup();
  };

  React.useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      if (!event.origin?.includes("apillon.io")) return;
      if (!event.data.verified) {
        throw new Error("Invalid verification");
      }
      // Close OAuth popup window
      oAuthWindow?.close();

      await verifyUserLogin(event.data.authToken, login, router, locale);
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [login, router, locale]);


  return (
    <div className="w-full bg-zinc-900/10">
      <div className="border-stone-800/40 overflow-hidden relative bg-gradient-to-r from-green-300/20 via-cyan-200/20 to-indigo-600/20 dark:bg-gradient-to-r dark:from-stone-800/5 dark:via-stone-800/5 dark:to-stone-800/20 hover:border-primary/40 dark:hover:border-stone-800/90 border p-4 rounded-xl w-full min-h-[384px] sm:h-full flex flex-col flex-1 transition-colors duration-300 ease-in-out delay-50">
        <GridPattern
          size={75}
          offsetX={0}
          offsetY={0}
          className="absolute -top-1/2 right-0 h-[200%] w-1/3 skew-y-12 stroke-white/10 stroke-[2] [mask-image:linear-gradient(-85deg,black,transparent)]"
        >
          {gridBlocks.map(([row, column], index) => (
            <GridPattern.Block
              key={index}
              row={row}
              column={column}
              className="fill-white/2.5 transition duration-500 hover:fill-primary"
            />
          ))}
        </GridPattern>
        
        <Button
          onClick={onGoBack}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute mt-4 z-10 uppercase"
          )}
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Go Back
        </Button>
        <div className="flex items-center justify-center h-full">
          <Button onClick={handleApillonLogin} variant="secondary">
            Login with Apillon
          </Button>
        </div>
      </div>
    </div>
  );
}
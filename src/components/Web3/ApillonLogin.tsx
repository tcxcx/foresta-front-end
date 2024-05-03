"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useAuth } from "@/hooks/context/account";
import { GridPattern } from "@/components/ui/GridPattern";
import { cn } from "@/lib/utils";
import { buttonVariants, Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Profile } from "./Profile";

interface ApillonLoginProps {
  onGoBack: () => void;
}

declare global {
  interface Window {
    oAuthWindow?: Window | null;
  }
}
export default function ApillonLogin({ onGoBack }: ApillonLoginProps) {
  const router = useRouter();
  const locale = useLocale();
  const [isLoading, setIsLoading] = useState(true);
  const { login, account, jwtToken, logout } = useAuth();

  const gridBlocks = [
    [2, 5],
    [3, 1],
    [4, 3],
  ];

  useEffect(() => {
    async function fetchSessionToken() {
        setIsLoading(true);
      
        try {
          const response = await fetch(
            "/api/apillon-server?action=session-token",
            {
              method: "GET",
            }
          );
          if (!response.ok) throw new Error("Failed to fetch session token");
          const data = await response.json();
          const sessionToken = data.data.sessionToken;
          console.log('Received Session Token:', sessionToken);
          openOAuthPopup(sessionToken);
        } catch (error) {
          console.error("Error fetching session token:", error);
        } finally {
          setIsLoading(false);
        }
      }

    fetchSessionToken();

    function handleMessage(event: MessageEvent<any>) {
      if (!event.origin.includes("apillon.io")) return;
      if (!event.data.verified) {
        console.error("Invalid verification");
        return;
      }
      window.oAuthWindow?.close();

      verifyUserLogin(event.data.authToken)
        .then((userInfo) => {
          login(
            {
              meta: { name: userInfo.email, source: "Apillon" },
              address: userInfo.email,
            },
            event.data.authToken
          );
        })
        .catch((error) => console.error("Login verification failed:", error));
    }

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [login]);

  async function verifyUserLogin(oAuthToken: string) {
    const response = await fetch(`/api/apillon-server?action=verify-login`, {
      method: "POST",
      body: JSON.stringify({ token: oAuthToken }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error("Verification failed");
    return { email: data.email };
  }

  async function openOAuthPopup(sessionToken: string) {
    const url = `https://oauth.apillon.io/?embedded=1&token=${sessionToken}`;
    console.log('Opening OAuth Popup with URL:', url);
    window.oAuthWindow = window.open(
      url,
      "Apillon OAuth Form",
      "height=900, width=450, resizable=no"
    );
  }

  return (
    <div className="w-full bg-zinc-900/10">
      <div className="border-stone-800/40 overflow-hidden relative bg-gradient-to-r from-green-300/20 via-cyan-200/20 to-indigo-600/20 dark:bg-gradient-to-r dark:from-stone-800/5 dark:via-stone-800/5 dark:to-stone-800/20 hover:border-primary/40 dark:hover:border-stone-800/90 border p-4 rounded-xl w-full min-h-[384px] sm:h-full flex flex-col flex-1 transition-colors duration-300 ease-in-out delay-50">
        <GridPattern
          size={75}
          offsetX={0}
          offsetY={0}
          className="absolute -top-1/4 right-1 h-[200%] w-2/3 skew-y-12 stroke-white/10 stroke-[2] [mask-image:linear-gradient(-85deg,black,transparent)]"
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
        <div className="mb-4">
                <button
                  onClick={onGoBack}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "absolute z-10 uppercase bg-transparent dark:text-white text-black"
                  )}
                >
                  <ArrowLeft className="h-3 w-3 mr-2" />
                  Back
                </button>
              </div>
        {account && jwtToken ? (
          <Profile account={account} jwtToken={jwtToken} onSignOut={logout} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="grid grid-cols-1 gap-4 z-10">
             
              <div className="text-center space-y-2 my-4">
                <p className="text-black dark:text-white text-lg font-clash uppercase">
                  Connecting to provider...
                </p>
                <p className="text-gray-900 dark:text-gray-500">
                  Please login with your email and/or DID credentials
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

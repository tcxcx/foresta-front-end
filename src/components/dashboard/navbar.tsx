"use client";
import React, { useEffect } from "react";
import ConnectedAccount from "../Web3/ConnectedAccount";
import Link from "next/link";
import { useAuth } from "@/hooks/context/account";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const { account } = useAuth();
    const router = useRouter();
  
    useEffect(() => {
      if (!account) {
        router.push('/');
      }
    }, [account, router]);
  
    if (!account) {
      return <div> unauthorized...</div>;
    }
  

  return (
    <>
      <header className="relative p-0 z-1 bottom-1 border-b border-t border-gray-100 dark:border-secondary bg-white dark:bg-background">
        <nav className="flex items-center px-2 justify-between">
          <div className="text-center">
            <Link href="/" passHref>
              <div className="font-clash text-2xl uppercase hover:text-green-500 cursor-pointer dark:text-white">
                🟩Foresta
              </div>
            </Link>
          </div>
          <div className="flex-1 flex items-center justify-end">
            <ConnectedAccount />
          </div>
          {/* replace this with another functionality eventually for now leave it so that the ConnectedAccount does not overlap out */}
          <div className="text-center invisible">
              <div className="font-clash text-2xl uppercase hover:text-green-500 cursor-pointer dark:text-white">
                🟩Foresta
              </div>
          </div>
        </nav>
      </header>
    </>
  );
}

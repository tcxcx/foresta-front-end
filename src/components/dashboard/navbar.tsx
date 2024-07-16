"use client";
import React, { useEffect } from "react";
import ConnectedAccount from "../Web3/ConnectedAccount";
import { Link } from 'next-view-transitions'
import { useAuth } from "@/hooks/context/account";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const { jwtToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!jwtToken) {
      router.push("/");
    }
  }, [jwtToken, router]);

  if (!jwtToken) {
    return <div className="hidden"> unauthorized...</div>;
  }

  return (
    <>
      <header className="relative p-0 z-10 bottom-1 border-b border-t border-gray-100 dark:border-secondary bg-white dark:bg-background">
        <nav className="flex items-center px-2 justify-between">
          <div className="text-center">
            <Link href="/" passHref>
              <div className="flex items-center my-4">
                <Image
                  src="/images/logo-icon-2.png"
                  alt="Foresta Logo"
                  width={30}
                  height={30}
                  objectFit="contain"
                />
                <div className="font-clash text-2xl uppercase hover:text-green-500 cursor-pointer dark:text-white">
                  Foresta
                </div>
              </div>
            </Link>
          </div>
          <div className="flex-1 flex items-center justify-end">
            <ConnectedAccount />
          </div>
          {/* replace this with another functionality eventually for now leave it so that the ConnectedAccount does not overlap out */}
          <div className="text-center invisible">
            <div className="flex items-center m-4">
              <Image
                src="/images/logo-icon-2.png"
                alt="Foresta Logo"
                width={30}
                height={30}
                objectFit="contain"
              />
              <div className="font-clash text-2xl uppercase hover:text-green-500 cursor-pointer dark:text-white">
                Foresta
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

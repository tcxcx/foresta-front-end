import { Application } from "@splinetool/runtime";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Foresta | Substrate-based Authentication",
  description: "Connect your wallet to login to the platform",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        {/* Left panel with images, quote and overlay - hidden on small screens */}
        <div className="hidden lg:block relative w-full lg:w-1/2">
          <Image
            src="https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            layout="fill"
            objectFit="cover"
            alt="Authentication"
            priority={true}
            className="block dark:hidden"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 z-10 bg-gradient-to-br from-green-300/80 via-transparent to-purple-600/40 dark:from-green-300/30 dark:via-blue-500/20 dark:to-purple-600/20"></div>

          <Image
            src="https://images.unsplash.com/photo-1518889735218-3e3a03fd3128?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            layout="fill"
            objectFit="cover"
            priority={true}
            alt="Authentication"
            className="hidden dark:block"
          />
          <div className="absolute inset-0 bg-black/50 z-10 flex flex-col p-10">
            <div className="flex items-center mb-4">
              <Image
                src="/images/logo-icon.png"
                alt="Foresta Logo"
                width={50}
                height={50}
                objectFit="contain"
              />
              <h1 className="z-20 text-4xl text-white font-bold uppercase font-clash">
                Foresta
              </h1>
            </div>
            <blockquote className="mt-auto text-white">
              <p className="text-2xl">
                &quot;This is the assembly of life that took a billion years to
                evolve. It holds the world steady.&quot;
              </p>
              <footer className="text-base">- Edward O. Wilson</footer>
            </blockquote>
          </div>
        </div>

        {/* Right panel with wallet - always visible */}
        <div className="flex-1 w-full h-full py-0 px-10 dark:bg-background bg-white overflow-auto">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "absolute mt-4 z-10 uppercase"
            )}
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Go Home
          </Link>
          {children}
        </div>
      </div>
    </>
  );
}

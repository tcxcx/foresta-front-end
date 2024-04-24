"use client";

import { Button } from "@/components/ui/button";
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@/components/ui/popover";
import {
  SheetTrigger,
  SheetTitle,
  SheetDescription,
  SheetHeader,
  SheetClose,
  SheetFooter,
  SheetContent,
  Sheet,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import CarbonRetirementToast from "@/components/dashboard/CarbonTrading/carbonRetirementToast";

export default function Retirements() {
  return (
    <>
      <div className="relative">
        <Image
          alt="Banner Retirements Image"
          className="w-full h-[150px] sm:h-[200px] md:h-[200px] lg:h-[200px] object-cover"
          height={2000}
          width={2000}
          src="/images/forest-energy-banner.jpg"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-clash mb-4">
              Your <span className="text-primary">Impact</span> on the <span className="text-teal-300">Environment</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl font-violet">
              Explore your history of minted carbon credit NFTs and their
              positive impact on the planet.
            </p>
          </div>
        </div>
      </div>
      <section className="bg-gray-50 dark:bg-background py-12 flex h-full">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight mt-4">
              Your Minted Carbon Credit NFTs
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Explore your history of minted carbon credit NFTs and their impact
              on the environment.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Repeat this div for each NFT item */}
            <CarbonRetirementToast />
          </div>
        </div>
      </section>
    </>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

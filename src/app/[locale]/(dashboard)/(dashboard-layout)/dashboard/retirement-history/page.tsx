"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@/components/ui/popover";

import Image from "next/image";
import Link from "next/link";
import CarbonRetirementCard from "@/components/dashboard/CarbonTrading/carbonRetirementCard";
import { useFetchUserRetirements } from "@/hooks/web3/carbonCreditHooks/useFetchUserRetirements";
import { PlaceholderComponent } from "@/components/dashboard/ProjectManagement/empty-placeholder";
import { PlaceholderType } from "@/components/dashboard/ProjectManagement/placeholder-types";
import { useAuth } from "@/hooks/context/account";


export default function Retirements() {
  const { account } = useAuth();
  const accountId = account?.address || "";

  const { retirements, loading, error } = useFetchUserRetirements(accountId);
  useEffect(() => {
    if (retirements) {
      console.log("Retirements data:", retirements);
    }
  }, [retirements]);
  
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
              Your <span className="text-primary">Impact</span> on the{" "}
              <span className="text-teal-300">Environment</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl font-violet">
            Discover how your carbon retirement actions contribute to global sustainability efforts.
            </p>
          </div>
        </div>
      </div>
      <section className="bg-gray-50 dark:bg-background py-12 flex h-full">
        <div className="container max-w-6xl mx-auto px-4">
          {loading ? (
            <p>Loading retirements...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : retirements.length > 0 ? (
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-tight mt-4">
                Your Carbon Retirement Portfolio
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                Each retirement represents a step towards a healthier planet. Below are the NFTs representing your carbon offset contributions.

                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {retirements.map((retirement, index) => (
                  <CarbonRetirementCard key={index} retirement={retirement} />
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-2xl font-semibold tracking-tight">
              Start Your Journey Towards Environmental Sustainability
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
              You currently have no retirements to display. Consider starting your journey by purchasing and retiring carbon credits to contribute to conservation efforts.
              </p>
              <PlaceholderComponent type={PlaceholderType.Retirements} />
            </div>
          )}
        </div>
      </section>
    </>
  );
}

// ..

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

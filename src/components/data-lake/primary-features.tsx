"use client";

import clsx from "clsx";
import {
  ClipboardDocumentCheckIcon,
  UserIcon,
  CubeTransparentIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  PackageCheck,
  Bird,
  Atom,
  Boxes,
  Airplay,
  ShieldCheck,
  Satellite,
  CircuitBoardIcon,
  Laptop,
} from "lucide-react";

import {
  SectionWrapper,
  SectionBadge,
  SectionHeading,
  SectionTitle,
  SectionTitleFade,
  SectionDescription,
} from "@/components/ui/section";
import { Link } from "next-view-transitions";
import { navItems } from "@/app/[locale]/(dashboard)/(dashboard-layout)/dashboard/data-lake/layout";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";

interface FeatureCardProps {
  children: React.ReactNode;
  className?: string;
}

interface FeatureCardBodyProps {
  children: React.ReactNode;
}
interface FeatureClassProps {
  className?: string;
}
function FeatureCard({ children, className }: FeatureCardProps) {
  return (
    <SpotlightCard className={clsx("p-0", className)}>{children}</SpotlightCard>
  );
}
interface PrimaryFeaturesProps {
  isActive: boolean;
}

function FeatureCardThumbnail({ children }: FeatureCardBodyProps) {
  return (
    <div className="flex items-center justify-center gap-4 py-6">
      {children}
    </div>
  );
}

function FeatureCardBody({ children }: FeatureCardBodyProps) {
  return <div className="mt-4">{children}</div>;
}

function FeatureCardTitle({ children }: FeatureCardBodyProps) {
  return (
    <div className="text-lg text-gray-900 dark:text-white">{children}</div>
  );
}

function FeatureCardDescription({ children }: FeatureCardBodyProps) {
  return (
    <p className="mt-4 text-sm font-light leading-relaxed text-gray-900/75 dark:text-white/75">
      {children}
    </p>
  );
}

function DocumentsFeature({ className }: FeatureClassProps) {
  const dots = new Array(9);

  return (
    <>
      <FeatureCard className={className}>
        <CardHeader className="flex flex-row items-center gap-4 bg-gray-100 dark:bg-gray-700">
          <DatabaseIcon className="w-8 h-8 text-gray-900 dark:text-white" />
          <div className="grid gap-1">
            <CardTitle className="text-gray-900 dark:text-white">
              Secure Datasets
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Explore our encrypted and blockchain-based datasets
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="grid gap-2 px-8 py-3">
          <FeatureCardThumbnail>
            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-gray-900/10 dark:border-white/10 bg-grey-900/5 dark:bg-white/5 shadow">
              <CloudIcon className="relative h-8 w-8 fill-white/10 stroke-[1] text-gray-900 dark:text-white" />
            </div>

            <div className="w-[6.5rem] overflow-hidden">
              <div className="flex w-max animate-marquee justify-end [animation-direction:reverse] [animation-duration:6s]">
                {[...dots, ...dots].map((dot, index) => (
                  <div key={index} className="px-1">
                    <div className="h-1 w-1 shrink-0 rounded-full bg-green-400/80 dark:bg-white/40"></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-gray-900/10 dark:border-white/10 bg-grey-900/5 dark:bg-white/5 shadow">
              <Atom className="relative h-8 w-8 fill-cyan-400/10 stroke-[1] text-cyan-400" />
            </div>
          </FeatureCardThumbnail>

          <FeatureCardBody>
            <FeatureCardTitle>
              AI-Powered Analytics for Conservation
            </FeatureCardTitle>
            <FeatureCardDescription>
              Harness the power of AI/ML with tools like automated dMRV to
              enhance data-driven decisions and conservation efforts, impacting
              communities and ecosystems worldwide.
            </FeatureCardDescription>
            <div className="grid gap-2 py-3">
              <CardTitle className="text-gray-900 dark:text-white pt-4">
                Latest dataset uploads
              </CardTitle>
            </div>

            <FeatureCardDescription>
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <FileIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  <span>climate_data_2023.csv</span>
                </div>
                <div className="flex items-center gap-1">
                  <UserIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  <span>John Doe</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <FileIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  <span>weather_patterns.json</span>
                </div>
                <div className="flex items-center gap-1">
                  <UserIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  <span>Jane Smith</span>
                </div>
              </div>
            </FeatureCardDescription>
          </FeatureCardBody>
        </CardContent>
        <CardFooter className="flex justify-center gap-4 p-4">
          <Link href={navItems[0]?.children?.[0]?.href ?? "#"} passHref>
            <Button className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md shadow-md">
              Upload Dataset
            </Button>
          </Link>
        </CardFooter>
      </FeatureCard>
    </>
  );
}

function ResponsesFeature({ className }: FeatureClassProps) {
  const dots = new Array(3);

  return (
    <>
      <FeatureCard className={className}>
        <CardHeader className="flex flex-row items-center gap-4 bg-gray-100 dark:bg-gray-700">
          <DatabaseIcon className="w-8 h-8 text-gray-900 dark:text-white" />
          <div className="grid gap-1">
            <CardTitle className="text-gray-900 dark:text-white">
              Compute Environment Integration
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Integrate a secure, sandboxed compute environment
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="grid gap-2 px-8 py-3">
          <FeatureCardThumbnail>
            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-gray-900/10 dark:border-white/10 bg-grey-900/5 dark:bg-white/5 shadow">
            <Boxes className="relative h-8 w-8 fill-white/10 stroke-[1] text-gray-900 dark:text-white" />
            </div>
            <div className="w-9 overflow-hidden">
              <div className="flex w-max animate-marquee justify-end [animation-direction:reverse] [animation-duration:2s]">
                {[...dots, ...dots].map((dot, index) => (
                  <div key={index} className="px-1">
                    <div className="h-1 w-1 shrink-0 rounded-full bg-green-400/80 dark:bg-white/40"></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-gray-900/10 dark:border-white/10 bg-grey-900/5 dark:bg-white/5 shadow">
              <ShieldCheck className="relative h-8 w-8 fill-cyan-400/10 stroke-[1] text-cyan-400" />
            </div>

            <div className="w-9 overflow-hidden">
              <div className="flex w-max animate-marquee justify-end [animation-direction:reverse] [animation-duration:2s]">
                {[...dots, ...dots].map((dot, index) => (
                  <div key={index} className="px-1">
                    <div className="h-1 w-1 shrink-0 rounded-full bg-green-400/80 dark:bg-white/40"></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-gray-900/10 dark:border-white/10 bg-grey-900/5 dark:bg-white/5 shadow">
              <PackageCheck className="relative h-8 w-8 fill-teal-400/10 stroke-[1] text-teal-400" />
            </div>
          </FeatureCardThumbnail>

          <FeatureCardBody>
            <FeatureCardTitle> Decentralized Compute Network</FeatureCardTitle>
            <FeatureCardDescription>
              Integrate a secure, sandboxed compute environment Connect to the
              decentralized compute network
            </FeatureCardDescription>
            <div className="grid gap-2 py-3">
              <CardTitle className="text-gray-900 dark:text-white pt-4">
                Latest dataset uploads
              </CardTitle>
            </div>

            <FeatureCardDescription>
              <div className="text-sm font-semibold text-gray-900 dark:text-white">
                Compute Network Connection
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Airplay className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  <span>Login</span>
                </div>
                <div className="flex items-center gap-1">
                  <Bird className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  <span>Setup</span>
                </div>
              </div>
            </FeatureCardDescription>
          </FeatureCardBody>
        </CardContent>
        <CardFooter className="flex justify-center gap-4 p-4">
          <Link href={navItems[2]?.children?.[1]?.href ?? "#"} passHref>
            <Button className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md shadow-md">
              Connect Network
            </Button>
          </Link>
        </CardFooter>
      </FeatureCard>
    </>
  );
}

function ReferencesFeature({ className }: FeatureClassProps) {
  const dots = new Array(3);

  return (
    <FeatureCard className={className}>
      <CardHeader className="flex flex-row items-center gap-4 bg-gray-100 dark:bg-gray-700">
        <DatabaseIcon className="w-8 h-8 text-gray-900 dark:text-white" />
        <div className="grid gap-1">
          <CardTitle className="text-gray-900 dark:text-white">
            Secure Algorithms
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Leverage our encrypted and blockchain-based algorithms
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="grid gap-2 px-8 py-3">
        <FeatureCardThumbnail>
          <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-gray-900/10 dark:border-white/10 bg-grey-900/5 dark:bg-white/5 shadow">
            <Satellite className="relative h-8 w-8 fill-white/10 stroke-[1] text-gray-900 dark:text-yellow-400" />
          </div>

          <div className="w-9 overflow-hidden">
            <div className="flex w-max animate-marquee justify-end [animation-direction:reverse] [animation-duration:2s]">
              {[...dots, ...dots].map((dot, index) => (
                <div key={index} className="px-1">
                  <div className="h-1 w-1 shrink-0 rounded-full bg-green-400/80 dark:bg-white/40"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-gray-900/10 dark:border-white/10 bg-grey-900/5 dark:bg-white/5 shadow">
            <CircuitBoardIcon className="relative h-8 w-8 fill-green-400/10 stroke-[1] text-green-400" />
          </div>

          <div className="w-9 overflow-hidden">
            <div className="flex w-max animate-marquee justify-end [animation-direction:reverse] [animation-duration:2s]">
              {[...dots, ...dots].map((dot, index) => (
                <div key={index} className="px-1">
                  <div className="h-1 w-1 shrink-0 rounded-full bg-green-400/80 dark:bg-white/40"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-gray-900/10 dark:border-white/10 bg-grey-900/5 dark:bg-white/5 shadow">
            <ClipboardDocumentCheckIcon className="relative h-8 w-8 fill-violet-400/10 stroke-[1] text-violet-400" />
          </div>
        </FeatureCardThumbnail>

        <FeatureCardBody>
          <FeatureCardTitle>Real-time dMRV</FeatureCardTitle>
          <FeatureCardDescription>
            Stay updated with live tracking of your shipment with real-time
            updates and notifications, for your drone-delivered parcels from
            departure to arrival.
          </FeatureCardDescription>
          <div className="grid gap-2 py-3">
            <FeatureCardTitle>Latest dataset uploads</FeatureCardTitle>
          </div>
          <FeatureCardDescription>
            <div className="text-sm font-semibold text-gray-900 dark:text-white">
              Climate Model Optimization
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <GroupIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span>12 Members</span>
              </div>
              <div className="flex items-center gap-1">
                <CalendarIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span>6 Months</span>
              </div>
            </div>{" "}
          </FeatureCardDescription>
        </FeatureCardBody>
      </CardContent>
      <CardFooter className="flex justify-center gap-4 p-4">
        <Link href={navItems[0]?.children?.[0]?.href ?? "#"} passHref>
          <Button className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md shadow-md">
            Upload AI/ML Algorithm
          </Button>
        </Link>
      </CardFooter>
    </FeatureCard>
  );
}

function NetworkFeature({ className }: FeatureClassProps) {
  const dots = new Array(3);

  return (
    <FeatureCard className={className}>
      <CardHeader className="flex flex-row items-center gap-4 bg-gray-100 dark:bg-gray-700">
        <NetworkIcon className="w-8 h-8 text-gray-900 dark:text-white" />
        <div className="grid gap-1">
          <CardTitle className="text-gray-900 dark:text-white">
            Network with Professionals
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Connect with experts to assess and enhance your projects
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="grid gap-2 px-8 py-3">
        <FeatureCardThumbnail>
          <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-gray-900/10 dark:border-white/10 bg-grey-900/5 dark:bg-white/5 shadow">
            <UserIcon className="relative h-8 w-8 fill-white/10 stroke-[1] text-gray-900 dark:text-pink-600 " />
          </div>

          <div className="w-9 overflow-hidden">
            <div className="flex w-max animate-marquee justify-end [animation-direction:reverse] [animation-duration:2s]">
              {[...dots, ...dots].map((dot, index) => (
                <div key={index} className="px-1">
                  <div className="h-1 w-1 shrink-0 rounded-full bg-green-400/80 dark:bg-white/40"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-gray-900/10 dark:border-white/10 bg-grey-900/5 dark:bg-white/5 shadow">
            <Laptop className="relative h-8 w-8 fill-green-400/10 stroke-[1] text-blue-400" />
          </div>

          <div className="w-9 overflow-hidden">
            <div className="flex w-max animate-marquee justify-end [animation-direction:reverse] [animation-duration:2s]">
              {[...dots, ...dots].map((dot, index) => (
                <div key={index} className="px-1">
                  <div className="h-1 w-1 shrink-0 rounded-full bg-green-400/80 dark:bg-white/40"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-gray-900/10 dark:border-white/10 bg-grey-900/5 dark:bg-white/5 shadow">
            <ClipboardDocumentCheckIcon className="relative h-8 w-8 fill-violet-400/10 stroke-[1] text-violet-400" />
          </div>
        </FeatureCardThumbnail>

        <FeatureCardBody>
          <FeatureCardTitle>
            Engage with Climate Scientists and Forestry Experts
          </FeatureCardTitle>
          <FeatureCardDescription>
            Whether you are seeking advice on carbon credits or need a detailed
            assessment of your nature reserve, our network of professionals can
            provide the insights you need.
          </FeatureCardDescription>
          <div className="grid gap-2 py-3">
            <FeatureCardTitle>Latest dataset uploads</FeatureCardTitle>
          </div>
          <FeatureCardDescription>
            <div className="text-sm font-semibold text-gray-900 dark:text-white">
              Climate Model Optimization
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <GroupIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span>12 Members</span>
              </div>
              <div className="flex items-center gap-1">
                <CalendarIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span>6 Months</span>
              </div>
            </div>{" "}
          </FeatureCardDescription>
        </FeatureCardBody>
      </CardContent>

      <CardFooter className="flex justify-center gap-4 p-4">
        <Link href={navItems[3]?.href ?? "#"} passHref>
          <Button className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md shadow-md">
            Connect Now
          </Button>
        </Link>
      </CardFooter>
    </FeatureCard>
  );
}

export function PrimaryFeatures({ isActive }: PrimaryFeaturesProps) {
  return (
    <div id="overview" className="scroll-mt-8 py-8 lg:py-16">
      <ScrollReveal once={true} trigger="middle" className="[--duration:500ms]">
        {(isActive) => (
          <SectionWrapper>
            <SectionHeading>
              <SectionBadge>
                Unleashing the Potential of Climate Science
              </SectionBadge>

              <SectionTitle>
                Unlock the Power of{" "}
                <SectionTitleFade>
                  <br />
                  <div className="text-primary">
                    Decentralized Collaboration
                  </div>
                </SectionTitleFade>
              </SectionTitle>

              <SectionDescription>
                <br />
                Harness cutting-edge algorithms and vast datasets to drive
                innovation and tackle the world&apos;s most pressing climate
                challenges through collaborative efforts with communities,
                scientists, and stakeholders all while leveraging blockchain
                technology and Schroedinger NFTs to ensure secure data sharing,
                financial transactions, and revenue sharing,
              </SectionDescription>
            </SectionHeading>

            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:mt-16 lg:grid-cols-2 lg:gap-20">
              <DocumentsFeature
                className={clsx(
                  " transition-all delay-150 duration-[--duration]",
                  !isActive ? "translate-y-8 opacity-0" : ""
                )}
              />
              <ResponsesFeature
                className={clsx(
                  " transition-all delay-300 duration-[--duration]",
                  !isActive ? "translate-y-8 opacity-0" : ""
                )}
              />
              <ReferencesFeature
                className={clsx(
                  " transition-all delay-700 duration-[--duration]",
                  !isActive ? "translate-y-8 opacity-0" : ""
                )}
              />
              <NetworkFeature
                className={clsx(
                  " transition-all delay-1000 duration-[--duration]",
                  !isActive ? "translate-y-8 opacity-0" : ""
                )}
              />
            </div>
          </SectionWrapper>
        )}
      </ScrollReveal>
    </div>
  );
}

function CloudIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  );
}

function CodeIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function DatabaseIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  );
}

function ServerIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
      <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
      <line x1="6" x2="6.01" y1="6" y2="6" />
      <line x1="6" x2="6.01" y1="18" y2="18" />
    </svg>
  );
}

function NetworkIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <rect x="16" y="16" width="6" height="6" rx="1" />
      <rect x="2" y="16" width="6" height="6" rx="1" />
      <rect x="9" y="2" width="6" height="6" rx="1" />
      <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" />
      <path d="M12 12V8" />
    </svg>
  );
}
function FileIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

function GroupIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M3 7V5c0-1.1.9-2 2-2h2" />
      <path d="M17 3h2c1.1 0 2 .9 2 2v2" />
      <path d="M21 17v2c0 1.1-.9 2-2 2h-2" />
      <path d="M7 21H5c-1.1 0-2-.9-2-2v-2" />
      <rect width="7" height="5" x="7" y="7" rx="1" />
      <rect width="7" height="5" x="10" y="12" rx="1" />
    </svg>
  );
}
function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

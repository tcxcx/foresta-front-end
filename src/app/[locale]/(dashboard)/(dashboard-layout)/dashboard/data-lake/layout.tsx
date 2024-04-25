// foresta-front-end/src/app/[locale]/(dashboard)/(dashboard-layout)/dashboard/data-lake/layout.tsx
"use client";
import { useLocale } from "next-intl";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Database,
  FileText,
  Users,
  Wallet,
  Server,
  Terminal,
  Cpu,
  BrainCircuit,
  Sprout,
  MountainSnow,
  Rocket,
  Glasses,
  HandCoins,
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const navItems = [
  {
    title: "Data Management",
    children: [
      {
        title: "Datasets & Algorithms",
        href: "/datasets-algorithms",
        icon: <Database size={32} />,
      },
      {
        title: "NFT Access Management",
        href: "/nft-access",
        icon: <BrainCircuit size={20} />,
      },
    ],
  },
  {
    title: "Projects",
    children: [
      {
        title: "Project Requests",
        href: "/project-request",
        icon: <Sprout size={32} />,
      },
      {
        title: "Projects",
        href: "/project",
        icon: <MountainSnow size={20} />,
      },
      {
        title: "Bounty & Collaboration",
        href: "/bounty-collaboration",
        icon: <Rocket size={32} />,
      },

    ],
  },
  {
    title: "Execution & Compute",
    children: [
      {
        title: "Algorithm Execution",
        href: "/algorithm-execution",
        icon: <Terminal size={32} />,
      },
      {
        title: "Decentralized Compute",
        href: "/decentralized-compute",
        icon: <Cpu size={32} />,
      },
    ],
  },
  {
    title: "Scientist Profiles",
    href: "/scientist-profile",
    icon: <Glasses size={16} />,
  },
  {
    title: "Payments & Transactions",
    href: "/payments-transactions",
    icon: <HandCoins size={16} />,
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const locale = useLocale();

  return (
    <div className="flex flex-col w-full min-h-screen bg-muted dark:bg-background">
      <header className="relative z-1 border-b border-gray-100 dark:border-secondary dark:bg-background">
        <div className="flex items-center my-0.5 justify-center h-full p-4">
          <div className="hidden font-bold sm:flex flex-row items-center gap-5 text-sm lg:gap-6 text-gray-600 dark:text-gray-400">
            {navItems.map((item, index) => (
              <NavigationMenu key={index} className="list-none">
                <NavigationMenuItem>
                  {item.children ? (
                    <>
                      <NavigationMenuTrigger className="hover:text-primary dark:hover:text-white bg-muted">
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="bg-white dark:bg-gray-700 shadow-xl rounded-lg p-4">
                        {item.children.map((child, childIndex) => (
                          <Link
                            key={childIndex}
                            href={`/${locale}/dashboard/data-lake${child.href}`}
                          >
                            <NavigationMenuLink className="block px-2 py-2 hover:bg-gray-200 dark:hover:bg-gray-600">
                              <div className="flex items-center gap-2">
                                {child.icon}
                                {child.title}
                              </div>
                            </NavigationMenuLink>
                          </Link>
                        ))}
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link href={`/${locale}/dashboard/data-lake${item.href}`}>
                      <NavigationMenuLink className="hover:text-gray-900 dark:hover:text-white">
                        <div className="flex items-center gap-2">
                          {item.icon}
                          {item.title}
                        </div>
                      </NavigationMenuLink>
                    </Link>
                  )}
                </NavigationMenuItem>
              </NavigationMenu>
            ))}
          </div>
        </div>
      </header>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] bg-gray-100/40 flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10 dark:bg-gray-800/40 bg-[url('/images/topography.svg')] bg-no-repeat bg-cover">
        {children}
      </main>
    </div>
  );
}

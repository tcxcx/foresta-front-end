"use client";

import React from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useLocale } from "next-intl";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  CandlestickChart,
  FolderCheck,
  Sprout,
  TentTree,
  User,
} from "lucide-react";

export default function SideMenu() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const locale = useLocale();

  return (
    <div className="flex h-screen w-16 flex-col justify-between border-e bg-white dark:bg-background border border-gray-100 dark:border-secondary">
      <div>
        <div className="inline-flex size-16 items-center justify-center">
          <span className="grid size-10 place-content-center rounded-lg bg-gray-100 dark:bg-secondary text-xs text-gray-600">
            L
          </span>
        </div>

        <div className="border-t border-secondary">
          <Link href={`/${locale}/dashboard/explore`} passHref>
            <div className="flex items-center justify-center h-full py-4 dark:hover:bg-secondary/50 hover:bg-secondary">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <TentTree />
                    <TooltipContent>
                      {" "}
                      <span className="font-clash">Explore</span>{" "}
                    </TooltipContent>
                  </TooltipTrigger>
                </Tooltip>
              </TooltipProvider>
            </div>
          </Link>

          <ul className="space-y-1 border-t border-secondary ">
            <li className="dark:hover:bg-secondary/50 hover:bg-secondary">
              <Link
                href={`/${locale}/dashboard/carbon-pool`}
                passHref
                className="flex items-center justify-center h-full"
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="px-2">
                        <div className="py-4">
                          <Sprout />

                          <TooltipContent>
                            {" "}
                            <span className="font-clash">Carbon Pools</span>
                          </TooltipContent>
                        </div>
                      </div>
                    </TooltipTrigger>
                  </Tooltip>
                </TooltipProvider>
              </Link>
            </li>

            <li className="dark:hover:bg-secondary/50 hover:bg-secondary">
              <Link
                href={`/${locale}/dashboard/carbon-trading`}
                passHref
                className="flex items-center justify-center h-full"
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="px-2">
                        <div className="py-4">
                          <CandlestickChart />
                          <TooltipContent>
                            {" "}
                            <span className="font-clash">Carbon Trading</span>
                          </TooltipContent>
                        </div>
                      </div>
                    </TooltipTrigger>
                  </Tooltip>
                </TooltipProvider>
              </Link>
            </li>
            <li className="dark:hover:bg-secondary/50 hover:bg-secondary">
              <Link
                href={`/${locale}/dashboard/project-management`}
                passHref
                className="flex items-center justify-center h-full"
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="px-2">
                        <div className="py-4">
                          <FolderCheck />
                          <TooltipContent>
                            <span className="font-clash">
                              Project Management
                            </span>
                          </TooltipContent>
                        </div>
                      </div>
                    </TooltipTrigger>
                  </Tooltip>
                </TooltipProvider>
              </Link>
            </li>
            <li className="dark:hover:bg-secondary/50 hover:bg-secondary">
              <Link
                href={`/${locale}/dashboard/account`}
                passHref
                className="flex items-center justify-center h-full"
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="px-2">
                        <div className="py-4">
                          <User />
                          <TooltipContent>
                            <span className="font-clash">My Account</span>
                          </TooltipContent>
                        </div>
                      </div>
                    </TooltipTrigger>
                  </Tooltip>
                </TooltipProvider>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 dark:border-secondary bg-white dark:bg-background p-2 flex justify-center hover:bg-secondary hover:text-grey-900 dark:hover:bg-secondary dark:hover:text-white">
        <button
          onClick={toggleTheme}
          className="relative flex justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500  dark:text-gray-500 "
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <SunIcon className="h-6 w-6" />
          ) : (
            <MoonIcon className="h-6 w-6" />
          )}
        </button>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { useTheme } from "next-themes";
import { Link } from 'next-view-transitions'
import { useLocale } from "next-intl";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LordIcon } from "@/lib/lordicon/lord-icon";
import GlobeLight from "@/lib/foresta-icons/wired-outline-959-internet.json";
import ProjectLight from "@/lib/foresta-icons/wired-outline-972-financial-project.json";
import TradeLight from "@/lib/foresta-icons/wired-outline-949-bonds.json";
import UserCircleLight from "@/lib/foresta-icons/wired-outline-44-avatar-user-in-circle.json";
import GlobeDark from "@/lib/foresta-dark/wired-gradient-959-internet.json";
import ProjectDark from "@/lib/foresta-dark/wired-gradient-972-financial-project.json";
import TradeDark from "@/lib/foresta-dark/wired-gradient-949-bonds.json";
import UserCircleDark from "@/lib/foresta-dark/wired-gradient-44-avatar-user-in-circle.json";
import SunAnimationLight from "@/lib/foresta-icons/wired-outline-804-sun.json";
import MoonAnimationLight from "@/lib/foresta-icons/wired-outline-1821-night-sky-moon-stars.json";
import SunAnimationDark from "@/lib/foresta-dark/wired-gradient-804-sun.json";
import MoonAnimationDark from "@/lib/foresta-dark/wired-gradient-1821-night-sky-moon-stars.json";

export default function SideMenu() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const Globe = theme === "dark" ? GlobeDark : GlobeLight;
  const Project = theme === "dark" ? ProjectDark : ProjectLight;
  const Trade = theme === "dark" ? TradeDark : TradeLight;
  const UserCircle = theme === "dark" ? UserCircleDark : UserCircleLight;
  const Sun = theme === "dark" ?  SunAnimationDark: SunAnimationLight;
  const Moon = theme === "dark" ? MoonAnimationDark : MoonAnimationLight;

  const locale = useLocale();
  const globeIconDataUri = `data:application/json;base64,${Buffer.from(
    JSON.stringify(Globe)
  ).toString("base64")}`;
  const tradeIconDataUri = `data:application/json;base64,${Buffer.from(
    JSON.stringify(Trade)
  ).toString("base64")}`;
  const projectIconDataUri = `data:application/json;base64,${Buffer.from(
    JSON.stringify(Project)
  ).toString("base64")}`;
  const userIconDataUri = `data:application/json;base64,${Buffer.from(
    JSON.stringify(UserCircle)
  ).toString("base64")}`;
  const sunIconDataUri = `data:application/json;base64,${Buffer.from(
    JSON.stringify(Sun)
  ).toString("base64")}`;
  const moonIconDataUri = `data:application/json;base64,${Buffer.from(
    JSON.stringify(Moon)
  ).toString("base64")}`;

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
                    <LordIcon
                      src={globeIconDataUri}
                      trigger="hover"
                      colors={{ primary: "#303f9f" }}
                      size={36}
                    />
                    <TooltipContent>
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
                href={`/${locale}/dashboard/carbon-trading`}
                passHref
                className="flex items-center justify-center h-full"
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="px-2">
                        <div className="py-4">
                          <LordIcon
                            src={tradeIconDataUri}
                            trigger="hover"
                            colors={{ primary: "#16A249" }}
                            size={36}
                          />{" "}
                          <TooltipContent>
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
                          <LordIcon
                            src={projectIconDataUri}
                            trigger="hover"
                            colors={{ primary: "#16A249" }}
                            size={36}
                          />{" "}
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
                          <LordIcon
                            src={userIconDataUri}
                            trigger="hover"
                            colors={{ primary: "#16A249" }}
                            size={36}
                          />
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
            <LordIcon
              src={sunIconDataUri}
              trigger="hover"
              colors={{ primary: "#FCC419" }}
              size={36}
            />
          ) : (
            <LordIcon
              src={moonIconDataUri}
              trigger="morph"
              colors={{ primary: "#FFF" }}
              size={36}
            />
          )}
        </button>
      </div>
    </div>
  );
}

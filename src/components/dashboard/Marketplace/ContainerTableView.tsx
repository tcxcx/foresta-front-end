'use client';

import React from "react";
import Image from "next/image";
import { CarbonDrawer } from "./CarbonDrawer";
import { useTranslations } from "next-intl";
import ProjectIcons from "./ProjectCard";
import {
  CollectiveInfo,
  ProjectDetail,
} from "@/hooks/context/marketplaceStore";
import { Feather } from "lucide-react";
import { decodeHexString } from "@/lib/hexDecode";
import { Link } from 'next-view-transitions'
import { buttonVariantsL } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

interface ContainerTableViewProps {
  buttonText: string;
  titleText: string;
  descriptionText: string;
  decreaseText: string;
  increaseText: string;
  confirmText: string;
  cancelText: string;
  creditsText: string;
  liveCollectives: CollectiveInfo[];
  selectCollective: (id: number) => void;
  acceptedProjects: ProjectDetail[];
}

export const ContainerTableView = ({
  acceptedProjects,
  selectCollective,
  ...props
}: ContainerTableViewProps) => {
  const t = useTranslations("Marketplace");
  console.log("acceptedProjects:", acceptedProjects);
  const router = useRouter();
  const locale = useLocale();

  return (
    <div>
      {acceptedProjects && acceptedProjects.length > 0 ? (
        acceptedProjects.map((project, index) => (
          <div
            key={project.collectiveId}
            onClick={() => {
              selectCollective(project.collectiveId);
            }}
            className="block max-w-md mx-auto rounded-lg p-4 shadow-sm shadow-indigo-100 hover:bg-gray-100 dark:hover:bg-zinc-950 md:max-w-xl lg:max-w-6xl"
          >
            <div className="h-56 w-full rounded-md relative group ">
              <Image
                alt=""
                src="https://images.unsplash.com/photo-1591081658714-f576fb7ea3ed?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                layout="fill"
                className="h-56 w-full rounded-md object-cover rounded-tr-3xl"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-green-300/30 via-blue-500/30 to-purple-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-900 ease-in-out backdrop-filter backdrop-blur-md">
                <div className="flex flex-col justify-center items-center h-full text-secondary dark:text-white p-4 text-center">
                  <h4 className="text-xl font-semibold uppercase tracking-wide">
                    Carbon Credit Status
                  </h4>
                  <h5 className="text-base font-semibold uppercase tracking-wide">
                    Live Market Data
                  </h5>
                  <p className="mt-0 text-xs text-secondary dark:text-white">
                    Each credit is a metric ton of CO<sub>2</sub> emissions
                    offset by this project&apos;s environmental initiatives.
                  </p>
                  <div className="mt-4">
                    <div className="text-lg font-medium">
                      <span className="block text-sm uppercase sm:inline">
                        Total Issued:{" "}
                      </span>
                      <span className="font-clash">1,000,000</span>
                    </div>
                    <div className="text-lg font-medium">
                      <span className="block sm:inline text-sm uppercase ">
                        Available for Purchase:{" "}
                      </span>
                      <span className="font-clash">500,000</span>
                    </div>
                    <div className="text-lg font-medium">
                      <span className="block sm:inline text-sm uppercase ">
                        Already Retired:{" "}
                      </span>
                      <span className="font-clash">499,999</span>
                    </div>
                  </div>
                </div>
              </div>

              <span className="absolute inset-x-0 z-1 bottom-0 h-2  bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
            </div>

            <div className="mt-2">
              <div className="flex flex-col xl:flex-row xl:items-center justify-between">
                {/* Group Name of Project Reserve and Origin together for smaller screens */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                  <dl>
                    <div>
                      <dt className="sr-only">Name of Project Reserve</dt>
                      <dd className="text-sm text-gray-500 md:text-base">
                        {decodeHexString(project.name)}
                      </dd>
                    </div>
                    <div>
                      <dt className="sr-only">Origin</dt>
                      <dd className="font-medium text-sm md:text-base">
                        {decodeHexString(project.location)}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="xl:ml-6 xl:mt-0 mt-4 w-full xl:w-auto flex space-x-4">
                  <Link
                    href={`/${locale}/dashboard/project-listed/${
                      project.collectiveId
                    }?projectData=${encodeURIComponent(
                      JSON.stringify(project)
                    )}`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      router.push(
                        `/${locale}/dashboard/project-listed/${
                          project.collectiveId
                        }?projectData=${encodeURIComponent(
                          JSON.stringify(project)
                        )}`
                      );
                    }}
                    className={buttonVariantsL({ variant: "link" })}
                  >
                    View Details
                  </Link>
                  <div onClick={(e) => e.stopPropagation()}>
                    <CarbonDrawer {...props} />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 sm:space-x-4">
                <ProjectIcons />
              </div>
            </div>
          </div>
        ))
      ) : (
        <>
          <div className="block max-w-md mx-auto p-4 relative shadow-sm shadow-indigo-100 hover:bg-gray-100 dark:hover:bg-zinc-950 md:max-w-xl lg:max-w-6xl rounded-md border border-dashed">
            <div className="flex flex-col items-center pt-16 md:pt-4 text-center">
              <div className="p-2">
                <Feather className="h-12" />
              </div>
              <h3 className="text-lg font-semibold">Foresta Collectives</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                have no live projects currently in the marketplace
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
